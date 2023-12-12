import type { ElementType } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'

import { cn } from '@/common/utils'
import { buttonVariants } from './button-variants'
import { IconComp } from './icon'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  startIcon?: ElementType
  endIcon?: ElementType
  isLoading?: boolean
  spinnerPosition?: 'start' | 'end'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      color,
      asChild = false,
      startIcon,
      endIcon,
      children,
      isLoading = false,
      spinnerPosition = 'start',
      responsive,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isNotStartLoading = (isLoading && spinnerPosition !== 'start') || !isLoading
    const isNotEndLoading = (isLoading && spinnerPosition !== 'end') || !isLoading

    return (
      <Comp
        disabled={isLoading}
        className={cn(buttonVariants({ variant, size, radius, color, responsive, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {startIcon && isNotStartLoading && (
          <IconComp Icon={startIcon} size={size} position="start" responsive={responsive} />
        )}
        {isLoading && spinnerPosition === 'start' && size !== 'icon' && (
          <IconComp Icon={Loader2} size={size} position="start" animate responsive={responsive} />
        )}
        {children}
        {endIcon && isNotEndLoading && <IconComp Icon={endIcon} size={size} position="end" responsive={responsive} />}
        {isLoading && spinnerPosition === 'end' && size !== 'icon' && (
          <IconComp Icon={Loader2} size={size} position="end" animate responsive={responsive} />
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
