import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/assignment-3-bank-of-react/',
  plugins: [react()],
})
