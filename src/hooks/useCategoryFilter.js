import { useMemo, useState } from 'react'

const categories = ['Guia', 'Repositório', 'Padrão', 'Ferramenta']

export default function useCategoryFilter(items) {
  const [selectedCategories, setSelectedCategories] = useState(categories)

  const filteredItems = useMemo(() => {
    return items.filter((item) => selectedCategories.includes(item.category))
  }, [items, selectedCategories])

  const toggleCategory = (category) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        const next = current.filter((item) => item !== category)
        return next.length === 0 ? categories : next
      }
      return [...current, category]
    })
  }

  return {
    categories,
    selectedCategories,
    filteredItems,
    toggleCategory,
  }
}
