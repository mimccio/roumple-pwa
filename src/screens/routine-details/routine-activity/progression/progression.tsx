import { ProgressionIcon } from './progression-icon'

interface Props {
  successNum: number
  prevSuccessNum?: number
  isLast?: boolean
}

export function Progression({ successNum, prevSuccessNum, isLast }: Props) {
  return (
    <div className="mx-auto mt-4 flex items-center justify-center gap-x-4 text-sm font-semibold text-gray-500">
      <div className="relative flex items-center">
        <span>{successNum} %</span>
        <span className="absolute left-12">
          <ProgressionIcon prev={prevSuccessNum} cur={successNum} isLast={isLast} />
        </span>
      </div>
    </div>
  )
}
