import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { NOTE_KEYS } from '../constants'
import { fetchNoteSearch } from '../queries'

export function useGetSearchNote() {
  const [value, setValue] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

  const { data, isLoading, isError, isPaused, isFetching } = useQuery({
    queryKey: NOTE_KEYS.search({ searchText }),
    queryFn: fetchNoteSearch,
  })

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const { value } = evt.currentTarget
    setValue(value)
    if (value === '') setSearchText(value)
  }

  const onSearchSubmit = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault()
    setSearchText(value)
  }

  const reset = () => setValue('')

  return { notes: data, value, isLoading, isError, isPaused, onSearchSubmit, handleTextChange, isFetching, reset }
}
