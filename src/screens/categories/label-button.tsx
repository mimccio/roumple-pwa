import { usePopper } from '&/common/hooks'
import { TagIcon } from '@heroicons/react/20/solid'
import { ColorSelector } from './color-selector'

interface Props {
  handleColorChange: (color: string) => void
  color: string
}

export function LabelButton({ handleColorChange, color }: Props) {
  const { toggle, isOpen, popperRef, buttonRef, close } = usePopper()

  const onSelectColor = (newColor: string) => {
    handleColorChange(newColor)
    close()
  }

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={toggle} type="button" className="rounded-md border p-2">
        <TagIcon height={20} width={20} className={`text-${color}-500`} />
      </button>
      {isOpen && <ColorSelector popperRef={popperRef} onSelectColor={onSelectColor} selectedColor={color} />}
    </div>
  )
}
