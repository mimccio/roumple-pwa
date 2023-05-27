import { cl } from '&/common/utils'

interface Props {
  color: string
  selected?: boolean
  onSelectColor: (color: string) => void
}

export function ColorItem({ color, selected = false, onSelectColor }: Props) {
  return (
    <button
      onClick={() => onSelectColor(color)}
      className={cl(
        'h-4 w-4 rounded-full border-4',
        `bg-${color}-500`,
        selected ? 'border-white' : 'border-transparent transition-colors hover:border-gray-300'
      )}
    />
  )
}
