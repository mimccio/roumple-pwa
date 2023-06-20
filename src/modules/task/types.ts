import { Status } from '&/common/types'
import { Category } from '../category/types'

export interface Task {
  id: string
  name: string
  createdAt: Date
  description?: string
  category: Category | null
  priority: number
  status: Status
}
