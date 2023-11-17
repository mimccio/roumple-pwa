import { DetailsError, DetailsLoading, DetailsNotFound, DetailsOffline } from '.'

interface Props {
  isLoading: boolean
  isPaused: boolean
  isError?: boolean
  data?: object
}

export function EmptyDetails({ isLoading, isPaused, data, isError }: Props) {
  if (data) return null
  if (isLoading) return <DetailsLoading />
  if (isPaused) return <DetailsOffline />
  if (isError) return <DetailsError />
  return <DetailsNotFound />
}
