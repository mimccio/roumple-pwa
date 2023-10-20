import { useTranslation } from 'react-i18next'
import { useSetOnboarded } from '&/modules/auth/hooks'
import { ConfirmModale } from '&/common/components/modales/confirm-modale'

interface IParams {
  isOpen: boolean
  close: () => void
}

export function ConfirmStartBlankModale({ isOpen, close }: IParams) {
  const { t } = useTranslation(['action', 'template'])
  const { onSetOnboarded } = useSetOnboarded()

  const handleConfirm = () => {
    onSetOnboarded()
    close()
  }

  return (
    <ConfirmModale
      title={t('startBlank', { ns: 'template' })}
      description={t('confirmStartBlank', { ns: 'template' })}
      isOpen={isOpen}
      close={close}
      onConfirm={handleConfirm}
    />
  )
}
