import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    //Cambiar segun tu IP PUBLICA
    host: '192.168.0.20',
    proxy: {
      '/api': {
        target: 'https://us-central1-tu-proyecto.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
