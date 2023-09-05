import { motion, AnimatePresence } from 'framer-motion'
import type { Routine, UpdateStatusParams } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { TaskListItem } from '&/modules/task/components'
import { RoutineActionListItem } from './routine-action-list-item'

interface Props {
  list: (Routine | Task)[]
  handleUpdateRoutineStatus: ({ routine, action, status }: UpdateStatusParams) => void
  showDone?: boolean
}

export function ItemList({ list, handleUpdateRoutineStatus, showDone }: Props) {
  return (
    <ul className="">
      <AnimatePresence initial={false} key={`${showDone}`}>
        {list.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, scaleY: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, x: 100, scaleY: 0, height: '0px', marginBottom: '0px' }}
            transition={{ duration: 0.3 }}
            className="mb-4 h-14"
          >
            {Object.prototype.hasOwnProperty.call(item, 'status') ? (
              <TaskListItem key={item.id} task={item as Task} />
            ) : (
              <RoutineActionListItem
                key={item.id}
                routine={item as Routine}
                handleUpdateStatus={handleUpdateRoutineStatus}
              />
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
