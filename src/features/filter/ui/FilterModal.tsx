import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterItemsQuery } from '@/shared/api/filter/useFilterItemsQuery'
import { type SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'
import { useFilterStore } from '@/shared/store/filterStore'
import {
	getSelectedOptionIds,
	normalizeSelection,
	toggleOption
} from '@/shared/utils/filterSelection'

import { ConfirmApplyModal } from './ConfirmApplyModal'
import { FilterSection } from './FilterSection'

interface FilterModalContentProps {
	onClose: () => void
}

const FilterModalContent = ({ onClose }: FilterModalContentProps) => {
	const { t } = useTranslation('filter')
	const {
		data: filterItems,
		isPending,
		isError,
		refetch
	} = useFilterItemsQuery()

	const appliedFilter = useFilterStore(state => state.appliedFilter)
	const applyFilter = useFilterStore(state => state.applyFilter)

	const [stagedFilter, setStagedFilter] =
		useState<SearchRequestFilter>(appliedFilter)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const handleToggle = (filterId: string, optionId: string) =>
		setStagedFilter(current => toggleOption(current, filterId, optionId))

	const handleClearAll = () => setStagedFilter([])

	const handleApplyNew = () => {
		applyFilter(normalizeSelection(stagedFilter, filterItems ?? []))
		onClose()
	}

	let content

	if (isPending) {
		content = <p className="py-8 text-base text-center">{t('loading')}</p>
	} else if (isError) {
		content = (
			<div className="flex flex-col items-center gap-4 py-8">
				<p className="text-base">{t('loadError')}</p>
				<Button
					variant="link"
					onClick={() => refetch()}
				>
					{t('retry')}
				</Button>
			</div>
		)
	} else {
		content = filterItems.map(filter => (
			<FilterSection
				key={filter.id}
				filter={filter}
				selectedIds={getSelectedOptionIds(stagedFilter, filter.id)}
				onToggle={handleToggle}
			/>
		))
	}

	return (
		<>
			<Modal
				title={t('title')}
				onClose={onClose}
				actions={{
					center: (
						<Button
							disabled={!filterItems}
							onClick={() => setIsConfirmOpen(true)}
						>
							{t('apply')}
						</Button>
					),
					right: (
						<Button
							variant="link"
							onClick={handleClearAll}
						>
							{t('clearAll')}
						</Button>
					)
				}}
			>
				{content}
			</Modal>
			{isConfirmOpen && (
				<ConfirmApplyModal
					onUseOld={onClose}
					onApplyNew={handleApplyNew}
					onClose={() => setIsConfirmOpen(false)}
				/>
			)}
		</>
	)
}

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) =>
	isOpen ? <FilterModalContent onClose={onClose} /> : null
