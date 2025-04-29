// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   define: {
//     "process.env": {}
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,
      interval: 100,  // 100ms เร็วทันใจ
    }
  }
});
