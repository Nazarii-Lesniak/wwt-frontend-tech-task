import { useTranslation } from 'react-i18next'

import { type FilterItem } from '@/shared/api/types/Filter'
import { Checkbox } from '@/shared/components/Checkbox'
import { InfoTooltip } from '@/shared/components/InfoTooltip'

interface FilterSectionProps {
	filter: FilterItem
	selectedIds: readonly string[]
	onToggle: (filterId: string, optionId: string) => void
}

export const FilterSection = ({
	filter,
	selectedIds,
	onToggle
}: FilterSectionProps) => {
	const { t } = useTranslation('filter')

	return (
		<fieldset className="min-w-0 border-b-2 border-line py-8">
			<legend className="float-left mb-6 flex w-full items-start gap-1 font-medium">
				{filter.name}
				{filter.description && (
					<InfoTooltip
						label={t('infoLabel', { name: filter.name })}
						text={filter.description}
					/>
				)}
			</legend>

			<div className="w-full grid grid-cols-3 gap-x-8 gap-y-6">
				{filter.options.map(option => (
					<Checkbox
						key={option.id}
						label={option.name}
						description={option.description}
						checked={selectedIds.includes(option.id)}
						onChange={() => onToggle(filter.id, option.id)}
					/>
				))}
			</div>
		</fieldset>
	)
}
