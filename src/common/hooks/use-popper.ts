import { useEffect, useRef, useState } from 'react'

export function usePopper() {
  const popperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = (value?: boolean | unknown) => {
    if (typeof value === 'boolean') {
      setIsOpen(value)
    } else {
      setIsOpen((prevState) => !prevState)
    }
  }
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  useEffect(() => {
    const listener = (event: Event) => {
      if (
        !popperRef.current ||
        popperRef.current.contains(event.target as HTMLElement) ||
        buttonRef?.current?.contains(event.target as HTMLElement)
      )
        return
      setIsOpen(false)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [])

  return { toggle, isOpen, popperRef, buttonRef, close, open }
}
