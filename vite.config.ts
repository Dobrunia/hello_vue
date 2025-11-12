import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetAttributify, presetIcons, presetWind3 } from 'unocss'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

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
      presets: [
        presetWind3(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
