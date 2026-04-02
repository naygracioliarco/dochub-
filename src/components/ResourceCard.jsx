import { ArrowUpRight } from 'lucide-react'

export default function ResourceCard({ item }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
        {item.category}
      </p>
      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      <a
        href={item.link}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        Acessar recurso
        <ArrowUpRight size={16} />
      </a>
    </article>
  )
}
