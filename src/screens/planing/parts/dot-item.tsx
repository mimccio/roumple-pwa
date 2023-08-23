import { TwColor } from '&/common/types'
import { cl, getTwBgColor } from '&/common/utils'

interface Props {
  color?: TwColor
}

export function DotItem({ color = 'gray' }: Props) {
  const bg = getTwBgColor(400, color)

  return <div className={cl('mx-0.5 mb-1 h-1.5 w-1.5 rounded-full', bg)}></div>
}
