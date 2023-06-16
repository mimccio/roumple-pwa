import { ClipboardIcon } from '@heroicons/react/24/outline'
import { MenuBtn } from './menu-btn'

export function CopyUrlToClipboard() {
  const onCopyUrl = async () => {
    const currentUrl = window.location.href
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(currentUrl)
    } else {
      return document.execCommand('copy', true, currentUrl)
    }
  }

  return (
    <MenuBtn Icon={ClipboardIcon} handleClick={onCopyUrl}>
      Copy url
    </MenuBtn>
  )
}
