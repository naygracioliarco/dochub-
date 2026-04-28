import { CheckCircle2 } from 'lucide-react'

const checklist = [
  'Abra uma issue descrevendo o objetivo da mudanca.',
  'Mantenha os documentos com contexto, escopo e exemplos praticos.',
  'Adicione links para repositorios e padroes relacionados.',
  'Solicite revisao de pelo menos uma pessoa mantenedora.',
]

export default function ContributionGuide() {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-slate-950 dark:text-slate-100">
        Guia de Contribuição
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        Siga este fluxo para manter a qualidade e consistencia da documentacao
        no hub.
      </p>

      <ul className="mt-6 space-y-3">
        {checklist.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-lg bg-slate-100 p-3 dark:bg-slate-800"
          >
            <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
            <span className="text-sm text-slate-800 dark:text-slate-200">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
