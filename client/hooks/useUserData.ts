import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { UserWithDetails } from '../../models/user'
import { getUserWithDetails } from '../apis/apiClient'

export const useUserData = (): UseQueryResult<UserWithDetails, Error> => {
  return useQuery<UserWithDetails, Error>({
    queryKey: ['user'],
    queryFn: getUserWithDetails,
  })
}
