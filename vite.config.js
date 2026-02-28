import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/LAB-5-MERCADO/',  // ⚠️ Must exactly match your repo name
})