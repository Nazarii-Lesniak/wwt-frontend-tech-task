import { type FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

/**
 * Replace with real API call when backend is ready.
 */

export const getFilterItems = async (): Promise<FilterItem[]> =>
	filterData.filterItems as FilterItem[]
