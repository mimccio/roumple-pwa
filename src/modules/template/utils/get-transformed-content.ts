import { JSONContent } from '@tiptap/react'
import df from 'd-forest'
import { v5 as uuidv5 } from 'uuid'

const getTransformPath = (userId: string, path: string) => {
  const pathArr = path.split('/')
  console.log('pathArr :', pathArr)
  if (pathArr[1] !== 'templates') return path
  const listType = pathArr[3]
  console.log('listType :', listType)
  let newPath = path
  if (listType === 'routines') {
    newPath = pathArr[4] ? `/routines/d/routine/${uuidv5(pathArr[4], userId)}/` : '/routines'
  } else if (listType === 'tasks') {
    newPath = pathArr[4] ? `/tasks/d/task/${uuidv5(pathArr[4], userId)}/` : '/tasks'
  } else if (listType === 'notes') {
    newPath =
      pathArr[4] && pathArr[5]
        ? `/notes/${pathArr[4]}/d/note/${uuidv5(pathArr[5], userId)}/`
        : pathArr[4]
        ? `/notes/${pathArr[4]}/`
        : '/notes'
  } else if (listType === 'categories') {
    newPath = '/categories'
  }
  console.log('newPath :', newPath)
  return newPath
}

const getOrigin = (hostname: string) => {
  let origin = 'https://my.roumple.com'
  if (hostname === 'dev.admin.roumple.com') origin = 'https://dev.my.roumple.com'
  if (hostname === 'localhost') origin = 'http://localhost'
  return origin
}

const getTransformedUrl = (userId: string, href: string) => {
  const url = new URL(href)
  console.log('url :', url)
  const isRoumple =
    url.hostname === 'admin.roumple.com' || url.hostname === 'dev.admin.roumple.com' || url.hostname === 'localhost'
  console.log('isRoumple :', isRoumple)
  if (!isRoumple) return href

  const pathname = getTransformPath(userId, url.pathname)
  const transformedHref = new URL(pathname, getOrigin(url.hostname)).href
  console.log('transformedHref :', transformedHref)
  return transformedHref
}

export const getTransformedContent = (userId: string, content?: JSONContent) => {
  if (!content) return null
  return df.updateNodes(
    content,
    (node) => node.type === 'link',
    (node) => {
      const href = getTransformedUrl(userId, node.attrs.href)
      return { ...node, attrs: { ...node.attrs, href } }
    }
  )
}
