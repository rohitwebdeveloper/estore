import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: mode === 'development' ? {
        '/api': {
          target: 'https://estore-backend-de6f.onrender.com',
          changeOrigin: true,
        },
      } : undefined,
    },
    base: mode === 'development' ? '/' : '/',
  };
});
