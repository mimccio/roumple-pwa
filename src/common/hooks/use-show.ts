interface Params {
  isLoading: boolean
  isPaused?: boolean
  error: unknown
  data: unknown
  filteredList?: unknown[]
}

export function useShow({ isLoading, data, isPaused = false, error, filteredList }: Params) {
  const show = {
    loading: false,
    error: false,
    empty: false,
    offline: false,
    data: false,
    emptyFilteredList: false,
  }

  if (error) {
    show.error = true
  } else if (!data && isPaused) {
    show.offline = true
  } else if (isLoading) {
    show.loading = true
  } else if (!data) {
    show.empty = true
  } else if (data && Array.isArray(data) && !data.length) {
    show.empty = true
  } else if (data && Array.isArray(data) && data.length && !filteredList?.length) {
    show.emptyFilteredList = true
  } else {
    show.data = true
  }
  return show
}
