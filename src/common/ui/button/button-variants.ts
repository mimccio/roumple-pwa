import { cva } from 'class-variance-authority'

import { colorVariants, focusVisibleClasses } from '../utils'

export const buttonVariants = cva(
  [
    'group',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'box-border',
    'appearance-none',
    'whitespace-nowrap',
    'min-w-max',
    'font-medium',
    'subpixel-antialiased',
    'overflow-hidden',
    'transition-colors',
    'duration-300',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    // focus outline
    ...focusVisibleClasses,
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border-2 bg-transparent',
        ghost: 'bg-transparent',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 gap-x-2 text-sm',
        md: 'h-10 px-4 gap-x-2 text-sm',
        lg: 'h-11 px-6 gap-x-3 text-md',
        icon: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        danger: '',
        warning: '',
        info: '',
        success: '',
        gem: '',
        precious: '',
        day: '',
        week: '',
        month: '',
      },
      responsive: {
        true: '',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      radius: 'md',
      color: 'default',
      responsive: false,
      fullWidth: false,
    },
    compoundVariants: [
      // solid / color
      {
        variant: 'solid',
        color: 'default',
        class: colorVariants.solid.default,
      },
      {
        variant: 'solid',
        color: 'primary',
        class: colorVariants.solid.primary,
      },
      {
        variant: 'solid',
        color: 'secondary',
        class: colorVariants.solid.secondary,
      },
      {
        variant: 'solid',
        color: 'success',
        class: colorVariants.solid.success,
      },
      {
        variant: 'solid',
        color: 'warning',
        class: colorVariants.solid.warning,
      },
      {
        variant: 'solid',
        color: 'danger',
        class: colorVariants.solid.danger,
      },
      {
        variant: 'solid',
        color: 'info',
        class: colorVariants.solid.info,
      },
      {
        variant: 'solid',
        color: 'gem',
        class: colorVariants.solid.gem,
      },
      {
        variant: 'solid',
        color: 'precious',
        class: colorVariants.solid.precious,
      },
      {
        variant: 'solid',
        color: 'day',
        class: colorVariants.solid.day,
      },
      {
        variant: 'solid',
        color: 'week',
        class: colorVariants.solid.week,
      },
      {
        variant: 'solid',
        color: 'month',
        class: colorVariants.solid.month,
      },
      // outline / color
      {
        variant: 'outline',
        color: 'default',
        class: colorVariants.outline.default,
      },
      {
        variant: 'outline',
        color: 'primary',
        class: colorVariants.outline.primary,
      },
      {
        variant: 'outline',
        color: 'secondary',
        class: colorVariants.outline.secondary,
      },
      {
        variant: 'outline',
        color: 'success',
        class: colorVariants.outline.success,
      },
      {
        variant: 'outline',
        color: 'warning',
        class: colorVariants.outline.warning,
      },
      {
        variant: 'outline',
        color: 'danger',
        class: colorVariants.outline.danger,
      },
      {
        variant: 'outline',
        color: 'info',
        class: colorVariants.outline.info,
      },
      {
        variant: 'outline',
        color: 'gem',
        class: colorVariants.outline.gem,
      },
      {
        variant: 'outline',
        color: 'precious',
        class: colorVariants.outline.precious,
      },
      {
        variant: 'outline',
        color: 'day',
        class: colorVariants.outline.day,
      },
      {
        variant: 'outline',
        color: 'week',
        class: colorVariants.outline.week,
      },
      {
        variant: 'outline',
        color: 'month',
        class: colorVariants.outline.month,
      },
      // ghost / color
      {
        variant: 'ghost',
        color: 'default',
        class: colorVariants.ghost.default,
      },
      {
        variant: 'ghost',
        color: 'primary',
        class: colorVariants.ghost.primary,
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class: colorVariants.ghost.secondary,
      },
      {
        variant: 'ghost',
        color: 'success',
        class: colorVariants.ghost.success,
      },
      {
        variant: 'ghost',
        color: 'warning',
        class: colorVariants.ghost.warning,
      },
      {
        variant: 'ghost',
        color: 'danger',
        class: colorVariants.ghost.danger,
      },
      {
        variant: 'ghost',
        color: 'info',
        class: colorVariants.ghost.info,
      },
      {
        variant: 'ghost',
        color: 'gem',
        class: colorVariants.ghost.gem,
      },
      {
        variant: 'ghost',
        color: 'precious',
        class: colorVariants.ghost.precious,
      },
      {
        variant: 'ghost',
        color: 'day',
        class: colorVariants.ghost.day,
      },
      {
        variant: 'ghost',
        color: 'week',
        class: colorVariants.ghost.week,
      },
      {
        variant: 'ghost',
        color: 'month',
        class: colorVariants.ghost.month,
      },
      // link / color
      {
        variant: 'link',
        color: 'default',
        class: colorVariants.link.default,
      },
      {
        variant: 'link',
        color: 'primary',
        class: colorVariants.link.primary,
      },
      {
        variant: 'link',
        color: 'secondary',
        class: colorVariants.link.secondary,
      },
      {
        variant: 'link',
        color: 'success',
        class: colorVariants.link.success,
      },
      {
        variant: 'link',
        color: 'warning',
        class: colorVariants.link.warning,
      },
      {
        variant: 'link',
        color: 'danger',
        class: colorVariants.link.danger,
      },
      {
        variant: 'link',
        color: 'info',
        class: colorVariants.link.info,
      },
      {
        variant: 'link',
        color: 'gem',
        class: colorVariants.link.gem,
      },
      {
        variant: 'link',
        color: 'precious',
        class: colorVariants.link.precious,
      },
      {
        variant: 'link',
        color: 'day',
        class: colorVariants.link.day,
      },
      {
        variant: 'link',
        color: 'week',
        class: colorVariants.link.week,
      },
      {
        variant: 'link',
        color: 'month',
        class: colorVariants.link.month,
      },
      // responsive / size
      {
        responsive: true,
        size: 'lg',
        class: 'h-10 px-4 gap-x-2 text-sm sm:h-11 sm:px-6 sm:gap-x-3 sm:text-md',
      },
      {
        responsive: true,
        size: 'md',
        class: 'h-9 px-3 gap-x-2 text-sm sm:h-10 sm:px-4',
      },
      {
        responsive: true,
        size: 'sm',
        class: 'h-8 px-2 gap-x-1 sm:gap-x-2 text-xs sm:h-9 sm:px-3 sm:text-sm',
      },
      {
        responsive: true,
        size: 'icon',
        class: 'h-9 w-9 [&>svg]:h-4 [&>svg]:w-4 sm:h-10 sm:w-10 sm:[&>svg]:h-5 sm:[&>svg]:w-5',
      },
    ],
  }
)
