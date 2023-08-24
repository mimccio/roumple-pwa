import { TwColor } from '&/common/types'
import { cl, getTwBgColor } from '&/common/utils'

interface Props {
  color?: TwColor
}

export function DotItem({ color }: Props) {
  const bg = color ? getTwBgColor(500, color) : 'bg-gray-400'

  return <div className={cl('mx-0.5 mb-1 h-1.5 w-1.5 rounded-full', bg)}></div>
}
