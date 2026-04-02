import { BookOpen, Boxes, FileText, FolderGit2, Wrench } from 'lucide-react'

const categoryConfig = {
  Guia: BookOpen,
  Repositório: FolderGit2,
  Padrão: Boxes,
  Ferramenta: Wrench,
}

export default function Sidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  statuses,
  selectedStatuses,
  onToggleStatus,
}) {
  return (
    <aside className="w-full border-r border-slate-200 bg-white p-4 md:w-72">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Categorias</h2>
      <ul className="space-y-2">
        {categories.map((category) => {
          const Icon = categoryConfig[category] ?? FileText
          const active = selectedCategories.includes(category)

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onToggleCategory(category)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                  active
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{category}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <h2 className="mb-4 mt-6 text-lg font-semibold text-slate-900">Status</h2>
      <ul className="space-y-2">
        {statuses.map((status) => {
          const active = selectedStatuses.includes(status)

          return (
            <li key={status}>
              <button
                type="button"
                onClick={() => onToggleStatus(status)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                  active
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm font-medium capitalize">{status}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
