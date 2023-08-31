export interface TaskNote {
  id: string
  note: { id: string; title?: string }
  task: { id: string; name: string }
}
