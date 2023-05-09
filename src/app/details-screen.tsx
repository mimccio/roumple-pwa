import { Link, Route, Routes, useMatch, useParams } from 'react-router-dom'

import { cl } from '&/common/utils'
import { NotFound } from '&/screens/not-found'
import { EmptyItem } from '&/screens/empty-item'

export function DetailsScreen() {
  const showDetails = useMatch('/:nav/d/*')

  console.log('hello :', showDetails)

  return (
    <div
      className={cl(
        'absolute bottom-0 left-0 right-0 top-0 w-full bg-white lg:relative lg:w-1/2',
        showDetails ? 'z-10 lg:z-0' : '-z-10 lg:z-0'
      )}
    >
      <Routes>
        <Route
          element={
            <div>
              <Link to="/routines">routines</Link>
            </div>
          }
          path=":nav/d/routine/:routineId/details"
        />
        <Route element={<div>Routine 1564</div>} path=":nav/d/routine/:routineId/activity" />
        <Route element={<div>Routine 1564</div>} path=":nav/d/routine/:routineId/checklist" />

        <Route element={<div>task 84</div>} path=":nav/d/task/:taskId/details" />

        <Route element={<NotFound />} path=":nav/d/*" />
        <Route element={<EmptyItem />} path="*" />
      </Routes>
    </div>
  )
}
