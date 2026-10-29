import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterModal } from '@/features/filter'
import { Button } from '@/shared/components/Button'
import { useFilterStore } from '@/shared/store/filterStore'

export const App = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const headingId = useId()
	const { t } = useTranslation('home')
	const appliedFilter = useFilterStore(state => state.appliedFilter)

	return (
		<section className="w-full min-h-dvh flex flex-col gap-4 items-center justify-center">
			<h1 className="text-6xl text-muted mb-12">{t('title')}</h1>

			<div>
				<Button
					aria-haspopup="dialog"
					onClick={() => setIsModalOpen(true)}
				>
					{t('openFilter')}
				</Button>
			</div>

			<section
				aria-labelledby={headingId}
				className="flex flex-col gap-3"
			>
				<h2
					id={headingId}
					className="text-2xl font-semibold text-main"
				>
					{t('appliedFilterTitle')}
				</h2>
				<p className="text-xl text-muted">{t('appliedFilterHint')}</p>
				<pre className="overflow-x-auto rounded-2xl bg-slate-100 p-6 text-sm">
					<code>{JSON.stringify(appliedFilter, null, 2)}</code>
				</pre>
			</section>

			<FilterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</section>
	)
}
