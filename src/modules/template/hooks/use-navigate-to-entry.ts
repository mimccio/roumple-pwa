import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import type { CreationStatus, Template } from '../types'
import { getEntryPath, getEntryTypeIsDone } from '../utils'

interface Props {
  template: Template
  status: CreationStatus
}

export function useNavigateToEntry({ status, template }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoading = Object.values(status).reduce((acc, cur) => {
        if (cur.isLoading) return true
        return acc
      }, false)
      if (!isLoading) {
        const navigateToEntry = async () => {
          const { entryId, entryType, entryNoteFolderId } = template
          if (entryId && entryType && getEntryTypeIsDone({ entryType, status })) {
            const url = await getEntryPath({ entryId, entryType, entryNoteFolderId })
            navigate(url)
          } else {
            if (status.tasks.isDone) {
              navigate('/tasks')
            } else if (status.notes.isDone) {
              navigate('/notes')
            } else if (status.routines.isDone) {
              navigate('/routines')
            } else {
              navigate('/tasks')
            }
          }
        }
        navigateToEntry()
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [status, navigate, template])
}
