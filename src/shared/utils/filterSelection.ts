import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import { type SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

/** Returns ids of the options */
export const getSelectedOptionIds = (
	selection: SearchRequestFilter,
	filterId: string
): readonly string[] =>
	selection.find(element => element.id === filterId)?.optionsIds ?? []

/** Returns a new selection where the option is switched on/off */
export const toggleOption = (
	selection: SearchRequestFilter,
	filterId: string,
	optionId: string
): SearchRequestFilter => {
	const hasGroup = selection.some(group => group.id === filterId)

	if (!hasGroup) {
		return [
			...selection,
			{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
		]
	}

	return selection
		.map(group => {
			if (group.id !== filterId) {
				return group
			}

			const optionsIds = group.optionsIds.includes(optionId)
				? group.optionsIds.filter(id => id !== optionId)
				: [...group.optionsIds, optionId]

			return { ...group, optionsIds }
		})
		.filter(group => group.optionsIds.length > 0)
}

/** Brings a selection to its normal form before it is saved */
export const normalizeSelection = (
	selection: SearchRequestFilter,
	filterItems: readonly FilterItem[]
): SearchRequestFilter =>
	filterItems.flatMap(filter => {
		const selectedIds = getSelectedOptionIds(selection, filter.id)

		const optionsIds = filter.options
			.map(option => option.id)
			.filter(id => selectedIds.includes(id))

		return optionsIds.length > 0
			? [{ id: filter.id, type: filter.type, optionsIds }]
			: []
	})
