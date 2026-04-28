import {
  CalendarClock,
  CircleUserRound,
  Clock3,
  Edit3,
  ExternalLink,
  History,
  Users,
} from 'lucide-react'

const statusMap = {
  ativo: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-100',
  legado: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
  experimental:
    'bg-violet-100 text-violet-800 dark:bg-violet-500/25 dark:text-violet-100',
}

export default function DocCard({ doc, onEditCard }) {
  const hasCoauthors = doc.coautores.length > 0
  const docLink = doc.link ?? doc.linkGitLab
  const isGitLab = doc.tipoLink === 'gitlab'
  const commitsUrl = `${docLink}/-/commits`
  const editUrl = `${docLink}/-/ide/project`
  const now = new Date()
  const lastUpdate = new Date(doc.ultimaAtualizacao)
  const daysSinceUpdate = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24))
  const needsReviewAlert = doc.status === 'ativo' && daysSinceUpdate > 30

  return (
    <article className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
          {doc.nome}
        </h3>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusMap[doc.status] ?? 'bg-slate-100 text-slate-600'}`}
        >
          {doc.status}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {doc.descricao}
      </p>

      <div className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
        <p className="inline-flex items-center gap-2">
          <CircleUserRound size={16} className="text-slate-600 dark:text-slate-400" />
          <span className="font-medium">Responsavel:</span> {doc.responsavel}
        </p>
        <p className="inline-flex items-center gap-2">
          <CalendarClock size={16} className="text-slate-600 dark:text-slate-400" />
          <span className="font-medium">Ultima Atualizacao:</span>{' '}
          {new Date(doc.ultimaAtualizacao).toLocaleDateString('pt-BR')}
        </p>
        {needsReviewAlert && (
          <p className="inline-flex items-center gap-2 rounded-md bg-amber-100 px-2 py-1 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100">
            <Clock3 size={16} />
            Revisao recomendada: sem atualizacao ha mais de 30 dias
          </p>
        )}
        <p
          className={`inline-flex items-center gap-2 rounded-md px-2 py-1 ${
            hasCoauthors
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Users size={16} />
          {hasCoauthors
            ? `Coautoria: ${doc.coautores.join(', ')}`
            : 'Sem coautoria registrada'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onEditCard?.(doc)}
          className="inline-flex items-center gap-2 rounded-md border border-indigo-400 px-2 py-1 text-sm font-medium text-indigo-800 hover:bg-indigo-100 dark:border-indigo-500 dark:text-indigo-100 dark:hover:bg-indigo-500/20"
        >
          <Edit3 size={15} />
          Editar card
        </button>
        <a
          href={docLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {isGitLab ? 'Abrir no GitLab' : 'Abrir recurso'}
          <ExternalLink size={16} />
        </a>
        {isGitLab && (
          <>
            <a
              href={commitsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-2 py-1 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <History size={15} />
              Historico
            </a>
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-2 py-1 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Edit3 size={15} />
              Editar no GitLab
            </a>
          </>
        )}
      </div>
    </article>
  )
}
