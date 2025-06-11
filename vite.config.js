// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // direktori utama
  server: {
    port: 5173,         // port dev server (opsional)
    open: true          // otomatis buka di browser
  },
  build: {
    outDir: 'dist',     // folder output build
    emptyOutDir: true
  }
});
