import { ScheduleType, TwColor } from '&/common/types'
import { JSONContent } from '@tiptap/react'

type TemplateCategory = {
  id: string
  templateId: string
  name: string
  color: TwColor
}

interface TemplateRoutineChecklistItem {
  id: string
  name: string
  templateRoutineId: string
}

export interface TemplateRoutine {
  id: string
  templateId: string
  createdAt?: Date
  name: string
  description?: JSONContent
  priority: number
  period: number
  dailyRecurrence: number[]
  weeklyRecurrence: number[]
  monthlyRecurrence: number[]
  scheduleType: ScheduleType
  templateCategory: TemplateCategory | null
  templateChecklist?: TemplateRoutineChecklistItem[]
  occurrence: number
}

type TaskScheduleType = ScheduleType | null

interface TemplateTaskChecklistItem {
  id: string
  name: string
  templateTaskId: string
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
  scheduleType: TaskScheduleType
  date: Date | null
  templateChecklist: TemplateTaskChecklistItem[]
}

interface TemplateNoteFolder {
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
  folder?: TemplateNoteFolder | null
  // routineNotes?: TemplateRoutineNote[]
  // taskNotes?: TemplateTaskNote[]
}

export type Template = {
  id: string
  name: string
  description?: string
  createdAt: Date
  categories: TemplateCategory[]
  routines: TemplateRoutine[]
  tasks: TemplateTask[]
  notes: TemplateNote[]
  folders: TemplateNoteFolder[]
}

export type TemplateListItem = Pick<Template, 'id' | 'name' | 'description'>
