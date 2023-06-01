export const getPriorityTWTextColor = (priority: number) => {
  if (priority === 1) return 'text-blue-500 group-hover:text-blue-400'
  if (priority === 2) return 'text-orange-500 group-hover:text-orange-400'
  return 'text-gray-400 group-hover:text-gray-400'
}
