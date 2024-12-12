import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { IncomeExpenseData } from '../../models/user'
import { fetchIncomeExpenseData } from '../apis/apiClient.'

export const useIncomeExpenseData = (): UseQueryResult<
  IncomeExpenseData[],
  Error
> => {
  return useQuery<IncomeExpenseData[], Error>({
    queryKey: ['incomeExpenseData'],
    queryFn: fetchIncomeExpenseData,
  })
}
