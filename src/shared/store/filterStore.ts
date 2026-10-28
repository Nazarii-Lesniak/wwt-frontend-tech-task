import { create } from 'zustand'

import { type SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	appliedFilter: SearchRequestFilter
	applyFilter: (filter: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>()(set => ({
	appliedFilter: [],
	applyFilter: filter => set({ appliedFilter: filter })
}))
