import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const guides = [
  {
    titulo: 'Como escrever um bom README',
    descricao:
      'Estruture objetivo, instalacao, uso, arquitetura e contribuicao para acelerar onboarding.',
  },
  {
    titulo: 'Padrão de Commits',
    descricao:
      'Use convencoes semanticas para facilitar historico, automacoes e geracao de changelog.',
  },
  {
    titulo: 'Template de Documentação Técnica',
    descricao:
      'Padronize contexto, decisoes tecnicas, impactos e plano de evolucao da solucao.',
  },
]

const markdownTemplate = `# Nome do Projeto

## Objetivo
Descreva o problema e o objetivo principal deste repositorio.

## Stack e Dependencias
- Tecnologia 1
- Tecnologia 2

## Como Executar
\`\`\`bash
npm install
npm run dev
\`\`\`

## Estrutura de Pastas
- src/components: componentes reutilizaveis
- src/pages: visoes principais
- src/data: dados mockados e exemplos

## Padrao de Commits
- feat: nova funcionalidade
- fix: correcao de bug
- docs: alteracoes de documentacao

## Contribuicao
1. Abra uma issue
2. Crie uma branch de feature
3. Envie PR com checklist preenchido
`

export default function BestPractices() {
  const [copied, setCopied] = useState(false)

  // Tenta copiar via API moderna e usa fallback para navegadores antigos.
  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(markdownTemplate)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = markdownTemplate
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section>
      <header className="mb-4 rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">
          Boas Práticas
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
          Guias essenciais para manter consistencia na documentacao da area.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <article
            key={guide.titulo}
            className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
              {guide.titulo}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {guide.descricao}
            </p>
          </article>
        ))}
      </div>

      <article className="mt-4 rounded-xl border border-indigo-300 bg-indigo-100 p-5 dark:border-indigo-600 dark:bg-indigo-500/15">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-indigo-950 dark:text-indigo-100">
              Template padrao (Markdown)
            </h3>
            <p className="mt-1 text-sm text-indigo-900 dark:text-indigo-200">
              Copie e use como ponto de partida para novos repositorios.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyTemplate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Template copiado!' : 'Copiar Template'}
          </button>
        </div>
      </article>
    </section>
  )
}
