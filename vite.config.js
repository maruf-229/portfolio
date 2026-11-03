import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' makes the build work for both username.github.io and username.github.io/repo-name
export default defineConfig({ plugins: [react()], base: './' })
