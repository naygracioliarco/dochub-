import { useEffect, useMemo, useState } from 'react'
import { Pencil } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import DocCard from '../components/DocCard'
import GovernanceStats from '../components/GovernanceStats'
import AddDocForm from '../components/AddDocForm'
import docsData from '../data/docs.json'
import useCategoryFilter from '../hooks/useCategoryFilter'

export default function Home() {
  const [docs, setDocs] = useState([])
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('recentes')
  const [selectedStatuses, setSelectedStatuses] = useState([
    'ativo',
    'legado',
    'experimental',
  ])
  const [editingDoc, setEditingDoc] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDocs(docsData.map((doc, index) => ({ ...doc, id: index + 1 })))
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const docsForCategoryFilter = useMemo(() => {
    return docs.map((doc) => ({
      category: doc.categoria,
      ...doc,
    }))
  }, [docs])

  const { categories, selectedCategories, filteredItems, toggleCategory } =
    useCategoryFilter(docsForCategoryFilter)

  const toggleStatus = (status) => {
    setSelectedStatuses((current) => {
      if (current.includes(status)) {
        const next = current.filter((item) => item !== status)
        return next.length === 0 ? ['ativo', 'legado', 'experimental'] : next
      }
      return [...current, status]
    })
  }

  const handleAddDoc = (newDoc) => {
    // Insere no topo para facilitar validacao visual imediata.
    setDocs((current) => [{ ...newDoc, id: Date.now() }, ...current])
  }

  const handleUpdateDoc = (updatedDoc) => {
    setDocs((current) =>
      current.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc)),
    )
    setEditingDoc(null)
  }

  const filteredDocs = useMemo(() => {
    const query = searchText.trim().toLowerCase()

    const byStatus = filteredItems.filter((doc) =>
      selectedStatuses.includes(doc.status),
    )

    const byText = byStatus.filter((doc) => {
      if (!query) return true
      const nome = doc.nome.toLowerCase()
      const descricao = doc.descricao.toLowerCase()
      return nome.includes(query) || descricao.includes(query)
    })

    return [...byText].sort((a, b) => {
      const dateA = new Date(a.ultimaAtualizacao).getTime()
      const dateB = new Date(b.ultimaAtualizacao).getTime()
      return sortOrder === 'recentes' ? dateB - dateA : dateA - dateB
    })
  }, [filteredItems, searchText, selectedStatuses, sortOrder])

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Sidebar
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        statuses={['ativo', 'legado', 'experimental']}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
      />

      <section className="flex-1">
        <GovernanceStats docs={docs} />
        <AddDocForm onSubmitDoc={handleAddDoc} />
        {editingDoc && (
          <AddDocForm
            key={editingDoc.id}
            initialData={editingDoc}
            onSubmitDoc={handleUpdateDoc}
            title="Editar card"
            description="Atualize os dados do card e salve para refletir na listagem."
            submitLabel="Salvar alterações"
            submitIcon={<Pencil size={16} />}
            onCancel={() => setEditingDoc(null)}
          />
        )}

        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Central de Documentação
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Filtre por categoria para explorar guias, repositorios, padroes e
            ferramentas de governanca.
          </p>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Buscar por nome ou descricao..."
            className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 placeholder:text-slate-400 focus:ring"
          />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              {filteredDocs.length} documentação(ões) encontrada(s)
            </p>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              Ordenar por:
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-2 py-1"
              >
                <option value="recentes">Mais recentes</option>
                <option value="antigos">Mais antigos</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredDocs.map((doc) => (
            <DocCard key={doc.id} doc={doc} onEditCard={setEditingDoc} />
          ))}
        </div>
      </section>
    </div>
  )
}
