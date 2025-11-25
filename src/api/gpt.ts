import { env } from '@/utils/env';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type StreamEventType =
  | 'start'
  | 'text-start'
  | 'text-delta'
  | 'text-end'
  | 'reasoning-start'
  | 'reasoning-delta'
  | 'reasoning-end'
  | 'finish';

interface StreamEvent {
  type: StreamEventType;
  delta?: string;
}

const PROXY_URL = import.meta.env.DEV ? '/api/llm' : 'http://llm.codex.so';

function formatMessagesAsPrompt(messages: ChatMessage[]): string {
  return messages
    .map((msg) => {
      if (msg.role === 'system') {
        return `[System]: ${msg.content}`;
      }
      if (msg.role === 'user') {
        return `[User]: ${msg.content}`;
      }
      return `[Assistant]: ${msg.content}`;
    })
    .join('\n\n');
}

export const gptApi = {
  async sendMessage(
    messages: ChatMessage[],
    options?: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
    }
  ): Promise<string> {
    const apiKey = env.apiKey;
    if (!apiKey) {
      throw new Error('VITE_API_KEY is not set in environment variables');
    }

    const prompt = formatMessagesAsPrompt(messages);

    const response = await fetch(`${PROXY_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API ключ отсутствует');
      }
      if (response.status === 403) {
        throw new Error('Недействительный API ключ');
      }
      if (response.status === 429) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          `Превышен лимит: использовано ${error.used || '?'} из ${error.limit || '?'}`
        );
      }
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const data: { text: string } = await response.json();
    return data.text || '';
  },

  async streamMessage(
    messages: ChatMessage[],
    onDelta: (delta: string) => void,
    options?: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
    }
  ): Promise<string> {
    const apiKey = env.apiKey;
    if (!apiKey) {
      throw new Error('VITE_API_KEY is not set in environment variables');
    }

    const prompt = formatMessagesAsPrompt(messages);

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/x-ndjson',
      'x-api-key': apiKey,
    };

    console.log('Request URL:', `${PROXY_URL}/stream`);
    console.log('Request headers:', headers);
    console.log('API key present:', !!apiKey, 'Length:', apiKey?.length);

    const response = await fetch(`${PROXY_URL}/stream`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API ключ отсутствует');
      }
      if (response.status === 403) {
        throw new Error('Недействительный API ключ');
      }
      if (response.status === 406) {
        throw new Error('Неверный Accept заголовок');
      }
      if (response.status === 429) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          `Превышен лимит: использовано ${error.used || '?'} из ${error.limit || '?'}`
        );
      }
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const event: StreamEvent = JSON.parse(line);
          if (event.type === 'text-delta' && event.delta) {
            fullText += event.delta;
            onDelta(event.delta);
          }
        } catch (e) {
          console.warn('Failed to parse stream event:', line, e);
        }
      }
    }

    if (buffer.trim()) {
      try {
        const event: StreamEvent = JSON.parse(buffer);
        if (event.type === 'text-delta' && event.delta) {
          fullText += event.delta;
          onDelta(event.delta);
        }
      } catch (e) {
        console.warn('Failed to parse final stream event:', buffer, e);
      }
    }

    return fullText;
  },
};
