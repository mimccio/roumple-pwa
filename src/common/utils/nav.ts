export const getUrl = (href: string) => {
  const url = new URL(href)
  return { href, isRoumple: url.hostname === 'localhost', url }
}
