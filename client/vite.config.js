import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// In Vercel or local, base is '/'. In GitHub Actions / Pages, base is repo path.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/AI-POWERED-SMART-SCHOOL-CONNECT/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
