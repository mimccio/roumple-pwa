import { ScheduleType, TwColor } from '&/common/types'
import { JSONContent } from '@tiptap/react'

export type TemplateCategory = {
  id: string
  templateId: string
  name: string
  color: TwColor
}

export interface TemplateRoutineChecklistItem {
  id: string
  name: string
  template_routine_id: string
}

export interface TemplateRoutine {
  id: string
  templateId: string
  createdAt?: Date
  name: string
  description?: JSONContent
  priority: number
  period: number
  daily_recurrence: number[]
  weekly_recurrence: number[]
  monthly_recurrence: number[]
  schedule_type: ScheduleType
  templateCategory: TemplateCategory | null
  templateChecklist?: TemplateRoutineChecklistItem[]
  occurrence: number
}

type TaskScheduleType = ScheduleType | null

export interface TemplateTaskChecklistItem {
  id: string
  name: string
  template_task_id: string
}

export interface TemplateTask {
  id: string
  templateId: string
  name: string
  createdAt: Date
  description?: JSONContent
  templateCategory: TemplateCategory | null
  priority: number
  period: number
  schedule_type: TaskScheduleType
  date: Date | null
  templateChecklist: TemplateTaskChecklistItem[]
}

export interface TemplateNoteFolder {
  id: string
  templateId: string
  name: string
  createdAt?: Date
}

export interface TemplateNote {
  id: string
  templateId: string
  title?: string
  content?: JSONContent
  createdAt: Date
  templateCategory: TemplateCategory | null
  templateNoteFolder?: TemplateNoteFolder | null
  // routineNotes?: TemplateRoutineNote[]
  // taskNotes?: TemplateTaskNote[]
}

export type EntryType = 'ROUTINE' | 'TASK' | 'NOTE'

export type Template = {
  id: string
  name: string
  description?: string
  createdAt: Date
  categories: TemplateCategory[]
  routines: TemplateRoutine[]
  tasks: TemplateTask[]
  notes: TemplateNote[]
  noteFolders: TemplateNoteFolder[]
  templateRoutineChecklistItems: TemplateRoutineChecklistItem[]
  templateTaskChecklistItems: TemplateTaskChecklistItem[]
  entryId: string | null
  entryType: EntryType | null
  entryNoteFolderId: string | null
}

export type TemplateListItem = Pick<Template, 'id' | 'name' | 'description'>

export interface NewRoutine {
  id: string
  name: string
  description?: JSONContent
  priority: number
  period: number
  daily_recurrence: number[]
  weekly_recurrence: number[]
  monthly_recurrence: number[]
  schedule_type: ScheduleType
  category_id?: string | null
  occurrence: number
}

export interface NewRoutineChecklistItem {
  user_id: string
  id: string
  name: string
  routine_id: string
}

export interface NewTask {
  id: string
  user_id: string
  name: string
  description?: JSONContent
  category_id?: string | null
  priority: number
  period: number
  schedule_type: TaskScheduleType
  // date: Date | null // TODO?:date
}

export interface NewTaskChecklistItem {
  user_id: string
  id: string
  name: string
  task_id: string
}

export interface NewNoteFolder {
  id: string
  name: string
  user_id: string
}

export interface NewNote {
  id: string
  user_id: string
  title?: string
  content?: JSONContent
  category_id?: string | null
  folder_id?: string | null

  // routineNotes?: TemplateRoutineNote[]
  // taskNotes?: TemplateTaskNote[]
}

export type CreationStatusItem = {
  isLoading: boolean
  isDone: boolean
  isError: boolean
}

export type CreationStatus = {
  categories: CreationStatusItem
  routines: CreationStatusItem
  tasks: CreationStatusItem
  routineChecklists: CreationStatusItem
  taskChecklists: CreationStatusItem
  noteFolders: CreationStatusItem
  notes: CreationStatusItem
}
