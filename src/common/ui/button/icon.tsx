import type { ElementType } from 'react'

import { cn } from '@/common/utils'
import { ButtonProps } from '.'

interface Props {
  Icon: ElementType
  size: ButtonProps['size']
  position: 'start' | 'end'
  animate?: boolean
  responsive?: boolean | null
}

export function IconComp({ Icon, size = 'md', position, animate, responsive }: Props) {
  const getSize = () => {
    if (responsive) {
      return {
        lg: 'w-4 h-4 sm:w-5 sm:h-5',
        md: 'w-4 h-4',
        sm: 'w-3 h-3 sm:w-4 sm:h-4',
      }
    }
    return {
      lg: 'w-5 h-5',
      md: 'w-4 h-4',
      sm: 'w-4 h-4',
    }
  }

  return (
    <Icon
      className={cn(
        size === 'lg' && getSize().lg,
        size === 'md' && getSize().md,
        size === 'sm' && getSize().sm,
        size === 'lg' && position === 'start' && '-ml-2',
        size === 'lg' && position === 'end' && '-mr-2',
        animate && 'animate-spin-slow',
      )}
    />
  )
}
