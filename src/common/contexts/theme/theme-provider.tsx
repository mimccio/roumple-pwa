import { useEffect, useState } from 'react'

import type { Theme } from './theme-provider-context'
import { THEMES } from './constants'
import { ThemeProviderContext } from './theme-provider-context'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  function isOfTypeTheme(value: string) {
    return Object.values(THEMES).includes(value as Theme)
  }

  const value = {
    theme,
    setTheme: (theme: string) => {
      if (!isOfTypeTheme(theme)) {
        throw new Error('theme is not of type Theme')
      }
      localStorage.setItem(storageKey, theme)
      setTheme(theme as Theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
