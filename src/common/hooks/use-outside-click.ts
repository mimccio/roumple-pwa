import { useEffect, useRef } from 'react'

export function useOutsideClick(handler?: () => void) {
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) return
      if (handler) {
        handler()
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])

  return ref
}
