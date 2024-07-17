import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// @ts-ignore
import { resolve } from 'path';
// https://vitejs.dev/config/

// @ts-ignore
dotenv.config({ path: resolve(__dirname, '.env') });

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  plugins: [react()],
  build: {
    minify: false
  }
})
