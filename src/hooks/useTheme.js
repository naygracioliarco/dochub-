import { useEffect, useState } from 'react'

const THEME_KEY = 'dochub-theme'

function detectInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // segue com preferencia do sistema
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme) {
  const isDark = theme === 'dark'
  const html = document.documentElement
  const body = document.body

  html.classList.toggle('dark', isDark)
  body.classList.toggle('dark', isDark)
  html.style.colorScheme = isDark ? 'dark' : 'light'
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return detectInitialTheme()
  })
  const isDarkMode = theme === 'dark'

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        // armazenamento pode falhar em navegacao privada
      }
      return next
    })
  }

  return { isDarkMode, toggleTheme }
}
