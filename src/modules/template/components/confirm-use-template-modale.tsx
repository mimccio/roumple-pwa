import { useTranslation } from 'react-i18next'
import { ConfirmModale } from '&/common/components/modales/confirm-modale'

interface IParams {
  isOpen: boolean
  close: () => void
  onUseTemplate: () => void
}

export function ConfirmUseTemplateModale({ isOpen, close, onUseTemplate }: IParams) {
  const { t } = useTranslation(['action', 'template'])

  const handleConfirm = () => {
    onUseTemplate()
    close()
  }

  return (
    <ConfirmModale
      title={t('useTemplate', { ns: 'template' })}
      description={t('confirmUseTemplate', { ns: 'template' })}
      isOpen={isOpen}
      close={close}
      onConfirm={handleConfirm}
    />
  )
}
