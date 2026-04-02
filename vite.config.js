import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No GitHub Actions, `GITHUB_REPOSITORY` vem como "usuario/repo" — o slug do repo
// deve ser igual ao path do GitHub Pages: usuario.github.io/<slug>/
function baseParaProducao() {
  const slug = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (slug) return `/${slug}/`
  // Build local (sem CI): mantenha igual ao nome do repositório no GitHub
  return '/dochub-/'
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? baseParaProducao() : '/',
}))
