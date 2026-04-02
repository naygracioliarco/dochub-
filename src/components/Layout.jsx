import { FileText, House, LibraryBig } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

function linkClassName({ isActive }) {
  return `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Hub de Governança de Documentação
            </p>
            <h1 className="text-lg font-semibold text-slate-900">DocHub</h1>
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
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  )
}
