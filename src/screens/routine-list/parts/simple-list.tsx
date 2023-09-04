import { AnimatePresence, motion } from 'framer-motion'
import type { Routine } from '&/modules/routine/types'
import { Item } from './item'

interface Props {
  routineList: Routine[]
}

export function SimpleList({ routineList }: Props) {
  return (
    <ul>
      <AnimatePresence initial={false}>
        {routineList.map((routine) => (
          <motion.li
            key={routine.id}
            initial={{ opacity: 0, scaleY: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, x: 100, scaleY: 0, height: '0px', marginBottom: '0px' }}
            transition={{ duration: 0.3 }}
            className="mb-4 h-14"
          >
            <Item key={routine.id} routine={routine as Routine} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
