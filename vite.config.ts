import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'BPM App',
      short_name: 'BPMApp',
      description: 'An App that helps you to find the right dance for a given BPM',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'bpmApp192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'bpmApp512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  build: {
    outDir: 'docs',
  },
  base: '/bpmApp/',
})
