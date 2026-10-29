import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'

interface ConfirmApplyModalProps {
	onUseOld: () => void
	onApplyNew: () => void
	onClose: () => void
}

export const ConfirmApplyModal = ({
	onUseOld,
	onApplyNew,
	onClose
}: ConfirmApplyModalProps) => {
	const { t } = useTranslation('filter')

	return (
		<Modal
			title={t('confirm.title')}
			onClose={onClose}
			actions={{
				center: (
					<div className="flex items-center gap-8">
						<Button
							variant="reset"
							onClick={onUseOld}
						>
							{t('confirm.useOld')}
						</Button>
						<Button onClick={onApplyNew}>{t('confirm.applyNew')}</Button>
					</div>
				)
			}}
		/>
	)
}
