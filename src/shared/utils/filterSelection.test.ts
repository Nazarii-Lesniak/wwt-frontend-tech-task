import { type FilterItem, FilterType } from '@/shared/api/types/Filter'
import { type SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import {
	getSelectedOptionIds,
	normalizeSelection,
	toggleOption
} from './filterSelection'

const filterItems: FilterItem[] = [
	{
		id: 'MEAL',
		name: 'Meal',
		type: FilterType.OPTION,
		options: [
			{ id: 'breakfast', name: 'Breakfast' },
			{ id: 'dinner', name: 'Dinner' }
		]
	},
	{
		id: 'BED',
		name: 'Bed',
		type: FilterType.OPTION,
		options: [
			{ id: 'twin', name: 'Twin' },
			{ id: 'double', name: 'Double' }
		]
	}
]

const mealSelection: SearchRequestFilter = [
	{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['breakfast'] }
]

describe('getSelectedOptionIds', () => {
	it('returns the selected ids of a group', () => {
		expect(getSelectedOptionIds(mealSelection, 'MEAL')).toEqual(['breakfast'])
	})

	it('returns an empty array for a group without selection', () => {
		expect(getSelectedOptionIds(mealSelection, 'BED')).toEqual([])
	})
})

describe('toggleOption', () => {
	it('creates a group when the first option is selected', () => {
		expect(toggleOption([], 'MEAL', 'dinner')).toEqual([
			{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['dinner'] }
		])
	})

	it('adds an option to an existing group', () => {
		expect(toggleOption(mealSelection, 'MEAL', 'dinner')).toEqual([
			{
				id: 'MEAL',
				type: FilterType.OPTION,
				optionsIds: ['breakfast', 'dinner']
			}
		])
	})

	it('removes a selected option', () => {
		const selection = toggleOption(mealSelection, 'MEAL', 'dinner')

		expect(toggleOption(selection, 'MEAL', 'breakfast')).toEqual([
			{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['dinner'] }
		])
	})

	it('removes the whole group when its last option is unchecked', () => {
		expect(toggleOption(mealSelection, 'MEAL', 'breakfast')).toEqual([])
	})

	it('does not touch other groups', () => {
		const selection = toggleOption(mealSelection, 'BED', 'twin')

		expect(getSelectedOptionIds(selection, 'MEAL')).toEqual(['breakfast'])
		expect(getSelectedOptionIds(selection, 'BED')).toEqual(['twin'])
	})

	it('does not mutate the original selection', () => {
		const snapshot = structuredClone(mealSelection)

		toggleOption(mealSelection, 'MEAL', 'dinner')
		toggleOption(mealSelection, 'MEAL', 'breakfast')

		expect(mealSelection).toEqual(snapshot)
	})
})

describe('normalizeSelection', () => {
	it('orders groups and options like the API data', () => {
		const messy: SearchRequestFilter = [
			{ id: 'BED', type: FilterType.OPTION, optionsIds: ['double', 'twin'] },
			{
				id: 'MEAL',
				type: FilterType.OPTION,
				optionsIds: ['dinner', 'breakfast']
			}
		]

		expect(normalizeSelection(messy, filterItems)).toEqual([
			{
				id: 'MEAL',
				type: FilterType.OPTION,
				optionsIds: ['breakfast', 'dinner']
			},
			{ id: 'BED', type: FilterType.OPTION, optionsIds: ['twin', 'double'] }
		])
	})

	it('drops unknown filters, unknown options and empty groups', () => {
		const stale: SearchRequestFilter = [
			{ id: 'REMOVED', type: FilterType.OPTION, optionsIds: ['x'] },
			{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['gone', 'dinner'] },
			{ id: 'BED', type: FilterType.OPTION, optionsIds: ['gone'] }
		]

		expect(normalizeSelection(stale, filterItems)).toEqual([
			{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['dinner'] }
		])
	})

	it('returns an empty selection for an empty draft', () => {
		expect(normalizeSelection([], filterItems)).toEqual([])
	})
})
