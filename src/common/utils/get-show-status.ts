import type { UseQueryResult } from '@tanstack/react-query'

export function getShowStatus(query: UseQueryResult, filteredList?: unknown[]) {
  const show = {
    loading: false,
    error: false,
    empty: false,
    offline: false,
    data: false,
    emptyFilteredList: false,
  }

  if (query.isError) {
    show.error = true
  } else if (!query.data && query.isPaused) {
    show.offline = true
  } else if (query.isLoading) {
    show.loading = true
  } else if (!query.data) {
    show.empty = true
  } else if (query.data && Array.isArray(query.data) && !query.data.length) {
    show.empty = true
  } else if (query.data && Array.isArray(query.data) && query.data.length && !filteredList?.length) {
    show.emptyFilteredList = true
  } else {
    show.data = true
  }
  return show
}
