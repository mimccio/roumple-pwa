export const getUrl = (href: string) => {
  const url = new URL(href)
  const isRoumple =
    url.hostname === 'my.roumple.com' || url.hostname === 'dev.my.roumple.com' || url.hostname === 'localhost'

  return { href, isRoumple, url }
}
