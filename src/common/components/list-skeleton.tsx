interface Props {
  count?: number
}

export function ListSkeleton({ count = 4 }: Props) {
  const array = [...Array(count).keys()]
  return (
    <>
      {array.map((i) => (
        <li key={i} className="h-14 w-full animate-pulse rounded-lg bg-gray-50" />
      ))}
    </>
  )
}
