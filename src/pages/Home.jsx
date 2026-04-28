import { useMemo, useState } from 'react'
import { Pencil } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import DocCard from '../components/DocCard'
import GovernanceStats from '../components/GovernanceStats'
import AddDocForm from '../components/AddDocForm'
import PersistenceBanner from '../components/PersistenceBanner'
import useSharedDocs from '../hooks/useSharedDocs'
import useCategoryFilter from '../hooks/useCategoryFilter'

export default function Home() {
  const {
    docs,
    loading,
    error,
    persistence,
    addDoc,
    updateDoc,
  } = useSharedDocs()

  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('recentes')
  const [selectedStatuses, setSelectedStatuses] = useState([
    'ativo',
    'legado',
    'experimental',
  ])
  const [editingDoc, setEditingDoc] = useState(null)
  const [saveError, setSaveError] = useState(null)

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

  const handleAddDoc = async (newDoc) => {
    setSaveError(null)
    try {
      await addDoc(newDoc)
    } catch (e) {
      setSaveError(e.message || String(e))
    }
  }

  const handleUpdateDoc = async (updatedDoc) => {
    setSaveError(null)
    try {
      await updateDoc(updatedDoc)
      setEditingDoc(null)
    } catch (e) {
      setSaveError(e.message || String(e))
    }
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

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-300 bg-white p-8 text-center text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        Carregando documentos…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-100 p-6 text-red-900 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200">
        <p className="font-semibold">Erro ao carregar dados</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    )
  }

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
        <PersistenceBanner persistence={persistence} />
        {saveError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-900 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200">
            {saveError}
          </div>
        )}

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

        <div className="mb-4 rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">
            Central de Documentação
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            Filtre por categoria para explorar guias, repositorios, padroes e
            ferramentas de governanca.
          </p>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Buscar por nome ou descricao..."
            className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-300 placeholder:text-slate-500 focus:ring dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {filteredDocs.length} documentação(ões) encontrada(s)
            </p>
            <label className="inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
              Ordenar por:
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
