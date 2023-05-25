export const ROUTINE = 'ROUTINE'
export const LIST = 'LIST'
export const BOARD = 'ROUTINE'

export const DAILY = 'DAILY'
export const WEEKLY = 'WEEKLY'
export const MONTHLY = 'MONTHLY'

export const SCHEDULE_TYPES = {
  daily: DAILY as 'DAILY',
  weekly: WEEKLY as 'WEEKLY',
  monthly: MONTHLY as 'MONTHLY',
}

const TODAY = 'TODAY'
const WEEK = 'WEEK'
const MONTH = 'MONTH'
const TOMORROW = 'TOMORROW'

export const BOARD_TYPES = {
  today: TODAY as 'TODAY',
  week: WEEK as 'WEEK',
  month: MONTH as 'MONTH',
  tomorrow: TOMORROW as 'TOMORROW',
}

export const TODO = 'TODO'
export const IN_PROGRESS = 'IN_PROGRESS'
export const DONE = 'DONE'

export const ROUTINE_STATUSES = {
  todo: TODO as 'TODO',
  inProgress: IN_PROGRESS as 'IN_PROGRESS',
  done: DONE as 'DONE',
}
