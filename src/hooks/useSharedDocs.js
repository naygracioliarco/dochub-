import { useCallback, useEffect, useState } from 'react'
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient'

const LOCAL_KEY = 'dochub-docs-local'

/** Converte linha do Postgres (snake_case) para o formato usado nos cards. */
function fromRow(row) {
  return {
    id: row.id,
    nome: row.nome,
    link: row.link,
    tipoLink: row.tipo_link,
    descricao: row.descricao,
    responsavel: row.responsavel,
    status: row.status,
    categoria: row.categoria,
    coautores: Array.isArray(row.coautores) ? row.coautores : [],
    ultimaAtualizacao: row.ultima_atualizacao,
  }
}

/** Monta objeto para insert (sem id). */
function toInsertPayload(doc) {
  return {
    nome: doc.nome,
    link: doc.link,
    tipo_link: doc.tipoLink,
    descricao: doc.descricao,
    responsavel: doc.responsavel,
    status: doc.status,
    categoria: doc.categoria,
    coautores: doc.coautores ?? [],
    ultima_atualizacao: doc.ultimaAtualizacao,
  }
}

async function fetchSeedJson() {
  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(`${base}docs.json`)
  if (!res.ok) throw new Error('Nao foi possivel carregar docs.json')
  return res.json()
}

function persistLocal(docs) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(docs))
  } catch {
    /* ignore quota / modo privado */
  }
}

function loadLocalCache() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : null
  } catch {
    return null
  }
}

/**
 * Carrega e persiste documentos de forma compartilhada (Supabase) ou local (JSON + localStorage).
 * - Com Supabase: todos os usuarios veem os mesmos cards; alteracoes em tempo real.
 * - Sem Supabase: lista vem de public/docs.json; inclusoes ficam so neste navegador (localStorage).
 */
export default function useSharedDocs() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  /** loading | cloud (Supabase) | browser (JSON + localStorage, so navegador) */
  const [persistence, setPersistence] = useState('loading')

  const refreshFromSupabase = useCallback(async (supabase) => {
    const { data, error: err } = await supabase
      .from('documents')
      .select('*')
      .order('id', { ascending: false })
    if (err) throw err
    return (data || []).map(fromRow)
  }, [])

  useEffect(() => {
    let cancelled = false
    let removeChannel = () => {}

    async function init() {
      setError(null)
      setLoading(true)

      try {
        const supabase = getSupabase()
        if (supabase && isSupabaseConfigured()) {
          setPersistence('cloud')
          let list = await refreshFromSupabase(supabase)
          if (cancelled) return

          if (list.length === 0) {
            const seed = await fetchSeedJson()
            const payload = seed.map((d) => toInsertPayload({ ...d, coautores: d.coautores ?? [] }))
            const { error: insErr } = await supabase.from('documents').insert(payload)
            if (insErr) throw insErr
            list = await refreshFromSupabase(supabase)
          }

          if (cancelled) return
          setDocs(list)

          const channel = supabase
            .channel('documents-realtime')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'documents' },
              async () => {
                const next = await refreshFromSupabase(supabase)
                if (!cancelled) setDocs(next)
              },
            )
            .subscribe()

          removeChannel = () => {
            supabase.removeChannel(channel)
          }
        } else {
          setPersistence('browser')
          const cached = loadLocalCache()
          if (cached) {
            setDocs(cached)
          } else {
            const seed = await fetchSeedJson()
            const withIds = seed.map((d, i) => ({
              ...d,
              id: i + 1,
            }))
            setDocs(withIds)
            persistLocal(withIds)
          }
        }
      } catch (e) {
        if (!cancelled) setError(e.message || String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    init()
    return () => {
      cancelled = true
      removeChannel()
    }
  }, [refreshFromSupabase])

  const addDoc = useCallback(async (newDoc) => {
    const supabase = getSupabase()
    if (supabase && isSupabaseConfigured()) {
      const payload = toInsertPayload(newDoc)
      const { data, error: err } = await supabase
        .from('documents')
        .insert(payload)
        .select()
        .single()
      if (err) throw err
      setDocs((prev) => [fromRow(data), ...prev])
      return
    }

    setDocs((prev) => {
      const next = [{ ...newDoc, id: Date.now() }, ...prev]
      persistLocal(next)
      return next
    })
  }, [])

  const updateDoc = useCallback(async (updated) => {
    const supabase = getSupabase()
    if (supabase && isSupabaseConfigured()) {
      const payload = {
        ...toInsertPayload(updated),
      }
      const { data, error: err } = await supabase
        .from('documents')
        .update(payload)
        .eq('id', updated.id)
        .select()
        .single()
      if (err) throw err
      setDocs((prev) => prev.map((d) => (d.id === updated.id ? fromRow(data) : d)))
      return
    }

    setDocs((prev) => {
      const next = prev.map((d) => (d.id === updated.id ? updated : d))
      persistLocal(next)
      return next
    })
  }, [])

  return {
    docs,
    loading,
    error,
    persistence,
    addDoc,
    updateDoc,
  }
}
