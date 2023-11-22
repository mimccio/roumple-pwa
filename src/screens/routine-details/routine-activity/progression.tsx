import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, Bars2Icon } from '@heroicons/react/24/solid'

interface Props {
  prev?: number
  cur: number
  isLast?: boolean
}

export function Progression({ prev, cur, isLast }: Props) {
  if (prev == undefined) return null
  if (Math.abs(cur - prev) < 4) return <Bars2Icon className="w-6 text-blue-500" />
  if (cur > prev) return <ArrowTrendingUpIcon className="w-6 text-green-500" />
  if (!isLast && cur < prev) return <ArrowTrendingDownIcon className="w-6 text-orange-500" />
  return null
}
