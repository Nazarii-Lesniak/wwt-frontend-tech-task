import { FilterType } from '@/shared/api/types/Filter'
import { type SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { useFilterStore } from './filterStore'

const filter: SearchRequestFilter = [
	{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['breakfast'] }
]

describe('useFilterStore', () => {
	beforeEach(() => {
		useFilterStore.setState({ appliedFilter: [] })
	})

	it('starts with an empty filter', () => {
		expect(useFilterStore.getState().appliedFilter).toEqual([])
	})

	it('saves the applied filter', () => {
		useFilterStore.getState().applyFilter(filter)

		expect(useFilterStore.getState().appliedFilter).toEqual(filter)
	})
})
