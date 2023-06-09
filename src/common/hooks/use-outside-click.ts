import { useEffect } from 'react'
import type { RefObject } from 'react'

interface Params {
  ref: RefObject<HTMLElement>
  handler?: () => void
}

export function useOutsideClick({ handler, ref }: Params) {
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

  return { ref }
}
