export const apiClient = {
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  },
}
