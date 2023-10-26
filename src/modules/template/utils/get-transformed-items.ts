import { v5 as uuidv5 } from 'uuid'

import { getUserId } from '&/modules/utils'
import {
  TemplateCategory,
  TemplateNote,
  TemplateNoteFolder,
  TemplateRoutine,
  TemplateRoutineChecklistItem,
  TemplateRoutineLinkedNote,
  TemplateTask,
  TemplateTaskChecklistItem,
  TemplateTaskLinkedNote,
} from '../types'

export const getTransformedCategories = async (templateCategories?: TemplateCategory[]) => {
  if (!templateCategories) throw new Error('templateCategories is undefined')

  const userId = await getUserId()

  return templateCategories.map((templateCategory) => ({
    id: uuidv5(templateCategory.id, userId),
    name: templateCategory.name,
    color: templateCategory.color,
    user_id: userId,
  }))
}

export const getTransformedRoutines = async (templateRoutines?: TemplateRoutine[]) => {
  if (!templateRoutines) throw new Error('templateRoutines is undefined')

  const userId = await getUserId()

  return templateRoutines.map((templateRoutine) => ({
    id: uuidv5(templateRoutine.id, userId),
    user_id: userId,
    name: templateRoutine.name,
    priority: templateRoutine.priority,
    description: templateRoutine.description,
    schedule_type: templateRoutine.schedule_type,
    daily_recurrence: templateRoutine.daily_recurrence,
    weekly_recurrence: templateRoutine.weekly_recurrence,
    monthly_recurrence: templateRoutine.monthly_recurrence,
    period: templateRoutine.period,
    occurrence: templateRoutine.occurrence,
    category_id: templateRoutine.templateCategory?.id ? uuidv5(templateRoutine.templateCategory.id, userId) : null,
  }))
}

export const getTransformedTasks = async (templateTasks?: TemplateTask[]) => {
  if (!templateTasks) throw new Error('templateTasks is undefined')

  const userId = await getUserId()

  return templateTasks.map((templateTask) => ({
    id: uuidv5(templateTask.id, userId),
    user_id: userId,
    name: templateTask.name,
    description: templateTask.description,
    category_id: templateTask.templateCategory?.id ? uuidv5(templateTask.templateCategory.id, userId) : null,
    priority: templateTask.priority,
    period: templateTask.period,
    schedule_type: templateTask.schedule_type,
    // date: templateTask.date, // TODO?
  }))
}

export const getTransformedRoutineChecklistItems = async (
  templateRoutineChecklistItems?: TemplateRoutineChecklistItem[]
) => {
  if (!templateRoutineChecklistItems) throw new Error('templateRoutineChecklistItems is undefined')
  const userId = await getUserId()

  return templateRoutineChecklistItems.map((checklistItem) => ({
    id: uuidv5(checklistItem.id, userId),
    user_id: userId,
    name: checklistItem.name,
    routine_id: uuidv5(checklistItem.template_routine_id, userId),
  }))
}

export const getTransformedTaskChecklistItems = async (templateTaskChecklistItems?: TemplateTaskChecklistItem[]) => {
  if (!templateTaskChecklistItems) throw new Error('templateTaskChecklistItems is undefined')

  const userId = await getUserId()

  return templateTaskChecklistItems.map((checklistItem) => ({
    id: uuidv5(checklistItem.id, userId),
    user_id: userId,
    name: checklistItem.name,
    task_id: uuidv5(checklistItem.template_task_id, userId),
  }))
}

export const getTransformedNotes = async (templateNotes?: TemplateNote[]) => {
  if (!templateNotes) throw new Error('templateNotes is undefined')

  const userId = await getUserId()

  return templateNotes.map((templateNote) => ({
    id: uuidv5(templateNote.id, userId),
    user_id: userId,
    title: templateNote.title,
    content: templateNote.content,
    category_id: templateNote.templateCategory?.id ? uuidv5(templateNote.templateCategory.id, userId) : null,
    folder_id: templateNote.templateNoteFolder?.id ? uuidv5(templateNote.templateNoteFolder.id, userId) : null,
  }))
}

export const getTransformedNoteFolders = async (noteFolders?: TemplateNoteFolder[]) => {
  if (!noteFolders) throw new Error('Template noteFolders is undefined')
  const userId = await getUserId()
  return noteFolders.map((noteFolder) => ({
    id: uuidv5(noteFolder.id, userId),
    user_id: userId,
    name: noteFolder.name,
  }))
}

export const getTransformedRoutineLinkedNotes = async (templateRoutineLinkedNotes?: TemplateRoutineLinkedNote[]) => {
  if (!templateRoutineLinkedNotes) throw new Error('templateRoutineLinkedNotes is undefined')

  const userId = await getUserId()

  return templateRoutineLinkedNotes.map((routineLinkedNote) => ({
    id: uuidv5(routineLinkedNote.id, userId),
    user_id: userId,
    routine_id: uuidv5(routineLinkedNote.templateRoutineId, userId),
    note_id: uuidv5(routineLinkedNote.templateNoteId, userId),
  }))
}

export const getTransformedTaskLinkedNotes = async (templateTaskLinkedNotes?: TemplateTaskLinkedNote[]) => {
  if (!templateTaskLinkedNotes) throw new Error('templateTaskLinkedNotes is undefined')

  const userId = await getUserId()

  return templateTaskLinkedNotes.map((taskLinkedNote) => ({
    id: uuidv5(taskLinkedNote.id, userId),
    user_id: userId,
    task_id: uuidv5(taskLinkedNote.templateTaskId, userId),
    note_id: uuidv5(taskLinkedNote.templateNoteId, userId),
  }))
}
