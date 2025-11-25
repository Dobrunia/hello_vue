import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { presetAttributify, presetIcons, presetWind3 } from 'unocss';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS({
      shortcuts: {
        'card-bd': 'bg-gray/20',
        'nav-link': 'h-[40px] px-4 flex items-center rounded-md base-hover',
        'base-border': 'rounded-md border-2 border-gray/50',
        'base-hover': 'hover:opacity-50 cursor-pointer',
      },
      presets: [presetWind3(), presetAttributify(), presetIcons()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/llm': {
        target: 'http://llm.codex.so',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/llm/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            console.log('Request headers:', req.headers);
            // Явно передаем x-api-key заголовок
            const apiKey = req.headers['x-api-key'];
            if (apiKey) {
              const keyValue = Array.isArray(apiKey) ? apiKey[0] : apiKey;
              proxyReq.setHeader('x-api-key', keyValue);
              console.log('Set x-api-key header:', keyValue.substring(0, 10) + '...');
            } else {
              console.warn('x-api-key header not found in request!');
            }
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
