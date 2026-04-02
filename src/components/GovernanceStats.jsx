import { FileCheck2, Sparkles } from 'lucide-react'

export default function GovernanceStats({ docs }) {
  const now = new Date()

  const totalAtivos = docs.filter((doc) => doc.status === 'ativo').length

  const melhoriasMesAtual = docs.filter((doc) => {
    if (doc.coautores.length === 0) return false

    const updatedAt = new Date(doc.ultimaAtualizacao)
    return (
      updatedAt.getMonth() === now.getMonth() &&
      updatedAt.getFullYear() === now.getFullYear()
    )
  }).length

  return (
    <section className="mb-4 grid gap-3 sm:grid-cols-2">
      <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
          <FileCheck2 size={16} />
          Documentos ativos
        </p>
        <p className="mt-1 text-2xl font-semibold text-emerald-900">{totalAtivos}</p>
      </article>

      <article className="rounded-xl border border-violet-200 bg-violet-50 p-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-violet-700">
          <Sparkles size={16} />
          Melhorias no mes
        </p>
        <p className="mt-1 text-2xl font-semibold text-violet-900">
          {melhoriasMesAtual}
        </p>
      </article>
    </section>
  )
}
