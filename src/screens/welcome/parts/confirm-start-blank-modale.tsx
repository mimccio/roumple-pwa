import { useTranslation } from 'react-i18next'
import { useSetOnboarded } from '&/modules/auth/hooks'
import { ConfirmModale } from '&/common/components/modales/confirm-modale'
import { useNavigate } from 'react-router-dom'

interface IParams {
  isOpen: boolean
  close: () => void
}

export function ConfirmStartBlankModale({ isOpen, close }: IParams) {
  const { t } = useTranslation(['action', 'welcome'])
  const { onSetOnboarded } = useSetOnboarded()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    await onSetOnboarded()
    navigate('/first-step')
    close()
  }

  return (
    <ConfirmModale
      title={t('Start blank', { ns: 'welcome' })}
      description={t('confirmStartBlank', { ns: 'template' })}
      isOpen={isOpen}
      close={close}
      onConfirm={handleConfirm}
    />
  )
}
