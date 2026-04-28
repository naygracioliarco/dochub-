import { FileText, House, LibraryBig, Moon, Sun } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

function linkClassName({ isActive }) {
  return `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-500/25 dark:text-indigo-200'
      : 'text-slate-700 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'
  }`
}

export default function Layout() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Hub de Governança de Documentação
            </p>
            <h1 className="text-lg font-semibold text-slate-950 dark:text-slate-100">
              DocHub
            </h1>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={linkClassName}>
              <House size={16} />
              Home
            </NavLink>
            <NavLink to="/boas-praticas" className={linkClassName}>
              <LibraryBig size={16} />
              Boas Práticas
            </NavLink>
            <NavLink to="/guia-contribuicao" className={linkClassName}>
              <FileText size={16} />
              Guia de Contribuição
            </NavLink>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDarkMode
                  ? 'Ativar modo claro'
                  : 'Ativar modo escuro com melhor conforto visual'
              }
              aria-pressed={isDarkMode}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              {isDarkMode ? 'Claro' : 'Escuro'}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  )
}
