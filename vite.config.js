import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Em produção, o `base` DEVE ser igual ao nome do repositório no GitHub (slug na URL).
// Seu site está em: https://naygracioliarco.github.io/dochub-/
const repoName = 'dochub-'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/',
}))
