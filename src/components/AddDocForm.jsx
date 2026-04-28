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
  disabled = false,
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Normaliza coautores de um campo texto para array.
    const coautores = form.coautores
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    const payload = {
      ...form,
      coautores,
      ultimaAtualizacao: new Date().toISOString().slice(0, 10),
      ...(initialData?.id != null ? { id: initialData.id } : {}),
    }

    await onSubmitDoc(payload)

    if (!initialData) {
      setForm(initialForm)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      aria-busy={disabled}
    >
      <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{description}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome da documentacao"
          required
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link do recurso (https://...)"
          type="url"
          required
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <select
          name="tipoLink"
          value={form.tipoLink}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
      </div>

      <textarea
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descricao"
        required
        rows={3}
        disabled={disabled}
        className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 ring-indigo-300 focus:ring disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
      />

      <button
        type="submit"
        disabled={disabled}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        {submitIcon ?? <Plus size={16} />}
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled}
          className="ml-2 mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>
      )}
    </form>
  )
}
