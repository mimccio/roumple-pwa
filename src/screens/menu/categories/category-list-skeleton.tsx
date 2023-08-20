interface Props {
  count?: number
}

export function ListSkeleton({ count = 4 }: Props) {
  const array = [...Array(count).keys()]
  return (
    <>
      {array.map((i) => (
        <div key={i} className="h-9 w-full animate-pulse rounded-lg bg-gray-50" />
      ))}
    </>
  )
}
