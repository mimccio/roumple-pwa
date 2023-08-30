import { AnimatePresence, motion } from 'framer-motion'
import type { Task } from '&/modules/task/types'
import { TaskListItem } from '&/modules/task/components'

interface Props {
  list?: Task[]
}

export function TaskListContent({ list = [] }: Props) {
  return (
    <ul>
      <AnimatePresence>
        {list?.map((task) => (
          <motion.li
            key={task.id}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, x: 100, scaleY: 0, height: '0px', marginBottom: '0px' }}
            transition={{ duration: 0.3 }}
            className="mb-4 h-14"
          >
            <TaskListItem task={task} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
