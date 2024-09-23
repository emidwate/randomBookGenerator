import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bookshelf: resolve(__dirname, 'src/bookshelf.html'),
        chart: resolve(__dirname, 'src/chart.html')
      },
    },
  },
})