import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true,
    allowedHosts: ['escolauf4-production.up.railway.app'],
  },
});