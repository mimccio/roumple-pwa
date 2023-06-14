import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { NOTE_KEYS } from '../constants'
import { fetchNoteSearch } from '../queries'

export function useSearchNote() {
  const [searchText, setSearchText] = useState<string>('')

  const { data, isLoading, error, isPaused } = useQuery(NOTE_KEYS.search({ searchText }), fetchNoteSearch)

  const onSearchSubmit = (text: string) => {
    setSearchText(text)
  }

  return { notes: data, isLoading, error, isPaused, onSearchSubmit }
}
