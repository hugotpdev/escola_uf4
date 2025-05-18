import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 4173,
    strictPort: true,
    allowedHosts: ['escolauf4-production.up.railway.app']
  }
});
