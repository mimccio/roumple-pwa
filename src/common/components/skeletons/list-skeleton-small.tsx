interface Props {
  count?: number
}

export function ListSkeletonSmall({ count = 4 }: Props) {
  const array = [...Array(count).keys()]
  return (
    <>
      {array.map((i) => (
        <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-gray-50" />
      ))}
    </>
  )
}
