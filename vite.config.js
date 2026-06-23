import { resolve } from 'path';
import { defineConfig } from 'vite';
import { sentencesPlugin } from './vite-plugin-sentences.js';

export default defineConfig({
  plugins: [sentencesPlugin()],
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        rules:   resolve(__dirname, 'rules.html'),
        mega:    resolve(__dirname, 'mega.html'),
        top500:    resolve(__dirname, 'top500.html'),
        irregular:  resolve(__dirname, 'irregular.html'),
        sentences:     resolve(__dirname, 'sentences.html'),
        conversations: resolve(__dirname, 'conversations.html'),
      },
    },
  },
});
