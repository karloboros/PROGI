import * as dotenv from 'dotenv';
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `${process.env.VITE_SERVER_URL}/api`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: `${process.env.VITE_SERVER_URL}/`,
        changeOrigin: true,
        secure: false,
      },
      '/pdf': {
        target: `${process.env.VITE_SERVER_URL}/`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
