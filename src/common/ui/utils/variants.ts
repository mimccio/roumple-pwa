const solid = {
  default: 'bg-default text-default-foreground hover:bg-default-soft',
  primary: 'bg-primary text-primary-foreground hover:bg-primary-soft/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-soft/90',
  success: 'bg-success text-success-foreground hover:bg-success-soft/90',
  warning: 'bg-warning text-warning-foreground hover:bg-warning-soft/90',
  danger: 'bg-danger text-danger-foreground hover:bg-danger-soft/90',
  info: 'bg-info text-info-foreground hover:bg-info-soft/90',
  gem: 'bg-gem text-gem-foreground hover:bg-gem-soft/90',
  precious: 'bg-precious text-precious-foreground hover:bg-precious-soft/90',
  day: 'bg-day text-day-foreground hover:bg-day-soft/90',
  week: 'bg-week text-week-foreground hover:bg-week-soft/90',
  month: 'bg-month text-month-foreground hover:bg-month-soft/90',
}

const outline = {
  default: 'border-default text-default hover:bg-default hover:text-default-foreground',
  primary: 'border-primary text-primary hover:text-primary-foreground hover:bg-primary',
  secondary: 'border-secondary text-secondary hover:text-secondary-foreground hover:bg-secondary',
  success: 'border-success text-success hover:text-success-foreground hover:bg-success',
  warning: 'border-warning text-warning hover:text-warning-foreground hover:bg-warning',
  danger: 'border-danger text-danger hover:text-danger-foreground hover:bg-danger',
  info: 'border-info text-info hover:text-info-foreground hover:bg-info',
  gem: 'border-gem text-gem hover:text-gem-foreground hover:bg-gem',
  precious: 'border-precious text-precious hover:text-precious-foreground hover:bg-precious',
  day: 'border-day text-day hover:text-day-foreground hover:bg-day',
  week: 'border-week text-week hover:text-week-foreground hover:bg-week',
  month: 'border-month text-month hover:text-month-foreground hover:bg-month',
}

const ghost = {
  default: 'bg-transparent text-default hover:bg-default-soft/20 hover:text-default-sharp',
  primary: 'bg-transparent text-primary hover:bg-primary-soft/20 hover:text-primary-sharp',
  secondary: 'bg-transparent text-secondary hover:bg-secondary-soft/20 hover:text-secondary-sharp',
  success: 'bg-transparent text-success hover:bg-success-soft/20 hover:text-success-sharp',
  warning: 'bg-transparent text-warning hover:bg-warning-soft/20 hover:text-warning-sharp',
  danger: 'bg-transparent text-danger hover:bg-danger-soft/20 hover:text-danger-sharp',
  info: 'bg-transparent text-info hover:bg-info-soft/20 hover:text-info-sharp',
  gem: 'bg-transparent text-gem hover:bg-gem-soft/20 hover:text-gem-sharp',
  precious: 'bg-transparent text-precious hover:bg-precious-soft/20 hover:text-precious-sharp',
  day: 'bg-transparent text-day hover:bg-day-soft/20 hover:text-day-sharp',
  week: 'bg-transparent text-week hover:bg-week-soft/20 hover:text-week-sharp',
  month: 'bg-transparent text-month hover:bg-month-soft/20 hover:text-month-sharp',
}

// const flat = {
//   default: "bg-default/40 text-default-foreground",
//   primary: "bg-primary/20 text-primary",
//   secondary: "bg-secondary/20 text-secondary",
//   success: "bg-success/20 text-success-600 dark:text-success",
//   warning: "bg-warning/20 text-warning-600 dark:text-warning",
//   danger: "bg-danger/20 text-danger dark:text-danger-500",
//   foreground: "bg-foreground/10 text-foreground",
// };

const link = {
  default: 'text-default',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  gem: 'text-gem',
  precious: 'text-precious',
  day: 'text-day',
  week: 'text-week',
  month: 'text-month',
}

export const colorVariants = {
  solid,
  outline,
  ghost,
  // flat,
  link,
}
