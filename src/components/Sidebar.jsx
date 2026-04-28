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
    <aside className="w-full border-r border-slate-300 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:w-72">
      <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-slate-100">
        Categorias
      </h2>
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
                    ? 'border-indigo-400 bg-indigo-100 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-100'
                    : 'border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{category}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <h2 className="mb-4 mt-6 text-lg font-semibold text-slate-950 dark:text-slate-100">
        Status
      </h2>
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
                    ? 'border-indigo-400 bg-indigo-100 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-100'
                    : 'border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
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
