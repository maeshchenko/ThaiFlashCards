import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ThaiFlashCards/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
