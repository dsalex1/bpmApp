// vite.config.ts
import { defineConfig } from "file:///home/dsale/workspace/bpmApp/node_modules/vite/dist/node/index.js";
import vue from "file:///home/dsale/workspace/bpmApp/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///home/dsale/workspace/bpmApp/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [vue(), VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "BPM App",
      short_name: "BPMApp",
      description: "An App that helps you to find the right dance for a given BPM",
      theme_color: "#ffffff",
      icons: [
        {
          src: "bpmApp192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "bpmApp512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  })],
  build: {
    outDir: "docs"
  },
  base: "/bpmApp/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kc2FsZS93b3Jrc3BhY2UvYnBtQXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kc2FsZS93b3Jrc3BhY2UvYnBtQXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RzYWxlL3dvcmtzcGFjZS9icG1BcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgVml0ZVBXQSh7XG4gICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6ICdCUE0gQXBwJyxcbiAgICAgIHNob3J0X25hbWU6ICdCUE1BcHAnLFxuICAgICAgZGVzY3JpcHRpb246ICdBbiBBcHAgdGhhdCBoZWxwcyB5b3UgdG8gZmluZCB0aGUgcmlnaHQgZGFuY2UgZm9yIGEgZ2l2ZW4gQlBNJyxcbiAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBpY29uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnYnBtQXBwMTkyLnBuZycsXG4gICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnYnBtQXBwNTEyLnBuZycsXG4gICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZG9jcycsXG4gIH0sXG4gIGJhc2U6ICcvYnBtQXBwLycsXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLG9CQUFvQjtBQUNuUyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsUUFBUTtBQUFBLElBQ3ZCLGNBQWM7QUFBQSxJQUNkLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsQ0FBQztBQUFBLEVBQ0YsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFDUixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
