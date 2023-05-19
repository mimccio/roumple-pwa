import { useRoutineDetails } from '&/modules/routine/hooks'
import { Routine } from '&/modules/routine/types'
import { Priority } from './priority'
import { Schedule } from './schedule'

interface Props {
  routine: Routine
}

export function RoutineDetails({ routine }: Props) {
  const { register, errors, submit } = useRoutineDetails(routine)

  console.log('routine :', routine)

  return (
    <div className="w-full p-4">
      <form onBlur={submit} onSubmit={submit}>
        <div>
          <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-400">
            Name
          </label>
          <input
            id="name"
            className="w-full rounded-md border border-indigo-300 px-4 py-3"
            type="text"
            autoFocus={routine.name === 'New Routine'}
            defaultValue={routine.name}
            {...register('name', {
              required: { value: true, message: 'required' },
              maxLength: { value: 50, message: 'max 50' },
              minLength: { value: 3, message: 'min 3' },
            })}
          />
          <div className="w-ful flex h-8 items-end justify-end text-red-400">
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 text-sm font-bold text-gray-400">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full rounded-md border border-indigo-300 px-4 py-3"
            defaultValue={routine.description}
            {...register('description', {
              maxLength: { value: 500, message: 'max 500' },
            })}
          />
          <div className="w-ful flex h-8 items-end justify-end text-red-400">
            {errors.description && <p>{errors.description.message}</p>}
          </div>
        </div>
      </form>
      <Priority priority={routine.priority} />
      <Schedule
        period={routine.period}
        daily_recurrence={routine.daily_recurrence}
        weekly_recurrence={routine.weekly_recurrence}
        type={routine.type}
        id={routine.id}
      />
    </div>
  )
}
