import type { ReactNode } from 'react'
import { MainListFallbackLayout } from './main-list-fallback-layout'
import { Illustration } from '../../illustrations'

interface Props {
  text: string | ReactNode
  image: string
  onClick?: () => void
}

export function MainListFallback({ image, text, onClick }: Props) {
  return <MainListFallbackLayout>{<Illustration image={image} text={text} onClick={onClick} />}</MainListFallbackLayout>
}
