import { useState } from 'react'
import { Plus } from 'lucide-react'

const initialForm = {
  nome: '',
  link: '',
  tipoLink: 'gitlab',
  descricao: '',
  responsavel: '',
  status: 'ativo',
  categoria: 'Guia',
  coautores: '',
}

export default function AddDocForm({
  onSubmitDoc,
  initialData,
  title = 'Adicionar novo card',
  description = 'Cadastre uma documentacao para aparecer na listagem do hub.',
  submitLabel = 'Adicionar card',
  submitIcon,
  onCancel,
}) {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    ...initialData,
    coautores: Array.isArray(initialData?.coautores)
      ? initialData.coautores.join(', ')
      : (initialData?.coautores ?? ''),
  }))

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Normaliza coautores de um campo texto para array.
    const coautores = form.coautores
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    onSubmitDoc({
      ...form,
      coautores,
      ultimaAtualizacao: new Date().toISOString().slice(0, 10),
    })

    if (!initialData) {
      setForm(initialForm)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-xl border border-slate-200 bg-white p-4"
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome da documentacao"
          required
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link do recurso (https://...)"
          type="url"
          required
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        />
        <select
          name="tipoLink"
          value={form.tipoLink}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        >
          <option value="gitlab">GitLab</option>
          <option value="externo">Link externo (planilha, wiki, etc.)</option>
        </select>
        <input
          name="responsavel"
          value={form.responsavel}
          onChange={handleChange}
          placeholder="Responsavel"
          required
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        />
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        >
          <option value="Guia">Guia</option>
          <option value="Repositório">Repositório</option>
          <option value="Padrão">Padrão</option>
          <option value="Ferramenta">Ferramenta</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        >
          <option value="ativo">ativo</option>
          <option value="legado">legado</option>
          <option value="experimental">experimental</option>
        </select>
        <input
          name="coautores"
          value={form.coautores}
          onChange={handleChange}
          placeholder="Coautores (separados por virgula)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
        />
      </div>

      <textarea
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descricao"
        required
        rows={3}
        className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
      />

      <button
        type="submit"
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        {submitIcon ?? <Plus size={16} />}
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>
      )}
    </form>
  )
}
