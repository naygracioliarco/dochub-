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
  ativo: 'bg-emerald-100 text-emerald-700',
  legado: 'bg-slate-200 text-slate-700',
  experimental: 'bg-violet-100 text-violet-700',
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
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{doc.nome}</h3>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusMap[doc.status] ?? 'bg-slate-100 text-slate-600'}`}
        >
          {doc.status}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">{doc.descricao}</p>

      <div className="mt-4 grid gap-2 text-sm text-slate-700">
        <p className="inline-flex items-center gap-2">
          <CircleUserRound size={16} className="text-slate-500" />
          <span className="font-medium">Responsavel:</span> {doc.responsavel}
        </p>
        <p className="inline-flex items-center gap-2">
          <CalendarClock size={16} className="text-slate-500" />
          <span className="font-medium">Ultima Atualizacao:</span>{' '}
          {new Date(doc.ultimaAtualizacao).toLocaleDateString('pt-BR')}
        </p>
        {needsReviewAlert && (
          <p className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-2 py-1 text-amber-700">
            <Clock3 size={16} />
            Revisao recomendada: sem atualizacao ha mais de 30 dias
          </p>
        )}
        <p
          className={`inline-flex items-center gap-2 rounded-md px-2 py-1 ${
            hasCoauthors ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'
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
          className="inline-flex items-center gap-2 rounded-md border border-indigo-300 px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          <Edit3 size={15} />
          Editar card
        </button>
        <a
          href={docLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
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
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <History size={15} />
              Historico
            </a>
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
