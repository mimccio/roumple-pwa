import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type Handler = () => void

interface Params {
  ref: RefObject<HTMLElement>
  handler: () => void
}

export function useOutsideClick({ handler, ref }: Params) {
  // const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) return
      handler()
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
