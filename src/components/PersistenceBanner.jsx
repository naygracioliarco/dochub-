import { Cloud, HardDrive } from 'lucide-react'

/**
 * Explica se os cards sao compartilhados entre todos (Supabase) ou apenas no navegador atual.
 */
export default function PersistenceBanner({ persistence }) {
  if (persistence === 'loading') return null

  if (persistence === 'cloud') {
    return (
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-100 p-4 text-sm text-emerald-950 dark:border-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-100">
        <Cloud className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300" size={18} />
        <p>
          <span className="font-semibold">Dados em nuvem:</span> novos cards e edições ficam
          visíveis para todo o time em tempo real.
        </p>
      </div>
    )
  }

  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-100 p-4 text-sm text-amber-950 dark:border-amber-600 dark:bg-amber-500/15 dark:text-amber-100">
      <HardDrive className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" size={18} />
      <div>
        <p className="font-semibold">Modo apenas neste navegador</p>
        <p className="mt-1">
          Sem Supabase configurado no build, alterações são salvas só no seu aparelho (localStorage).
          Para o mesmo conteúdo para todos, configure{' '}
          <code className="rounded bg-amber-200 px-1 dark:bg-amber-500/25">
            VITE_SUPABASE_URL
          </code>{' '}
          e{' '}
          <code className="rounded bg-amber-200 px-1 dark:bg-amber-500/25">
            VITE_SUPABASE_ANON_KEY
          </code>{' '}
          no <code className="rounded bg-amber-200 px-1 dark:bg-amber-500/25">.env</code> e
          nos Secrets do GitHub Actions, rode o SQL em{' '}
          <code className="rounded bg-amber-200 px-1 dark:bg-amber-500/25">
            supabase/schema.sql
          </code>
          .
        </p>
      </div>
    </div>
  )
}
