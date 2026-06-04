import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        rules:   resolve(__dirname, 'rules.html'),
        mega:    resolve(__dirname, 'mega.html'),
        phrasal: resolve(__dirname, 'phrasal.html'),
        top500:  resolve(__dirname, 'top500.html'),
      },
    },
  },
});
