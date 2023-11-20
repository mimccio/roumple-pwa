import { AnimatePresence, motion } from 'framer-motion'

import { MainListLayout } from '&/common/components/layouts'
import type { Task } from '&/modules/task/types'
import { TaskListItem } from '&/modules/task/components'

interface Props {
  list?: Task[]
  showDone: boolean
}

export function TaskListContent({ list = [], showDone }: Props) {
  return (
    <MainListLayout>
      <ul>
        <AnimatePresence initial={false} key={`${showDone}`}>
          {list?.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, scaleY: 0, x: 100 }}
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
    </MainListLayout>
  )
}
