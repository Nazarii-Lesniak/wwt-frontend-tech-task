import { queryOptions, useQuery } from '@tanstack/react-query'

import { getFilterItems } from './getFilterItems'

export const filterItemsQueryOptions = queryOptions({
	queryKey: ['filter-items'],
	queryFn: getFilterItems,
	staleTime: Infinity
})

export const useFilterItemsQuery = () => useQuery(filterItemsQueryOptions)
