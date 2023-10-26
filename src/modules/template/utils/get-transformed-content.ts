import { JSONContent } from '@tiptap/react'
import df from 'd-forest'
import { v5 as uuidv5 } from 'uuid'

const getTransformPath = (userId: string, path: string) => {
  const pathArr = path.split('/')
  const listType = pathArr[3]

  let newPath = path

  if (listType === 'routines') {
    newPath = `/${listType}/d/routine/${uuidv5(pathArr[4], userId)}/`
  } else if (listType === 'tasks') {
    newPath = `/${listType}/d/task/${uuidv5(pathArr[4], userId)}/`
  } else if (listType === 'notes') {
    newPath = `/${listType}/${pathArr[4]}/d/note/${uuidv5(pathArr[5], userId)}/`
  }

  return newPath
}

const getTransformedUrl = (userId: string, href: string) => {
  const url = new URL(href)

  const isRoumple =
    url.hostname === 'my.roumple.com' || url.hostname === 'dev.my.roumple.com' || url.hostname === 'localhost'

  if (!isRoumple) return href

  const pathname = getTransformPath(userId, url.pathname)
  const transformedHref = new URL(pathname, url.origin).href

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
