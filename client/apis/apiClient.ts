import request from 'superagent'
import { UserWithDetails } from '../../models/user'

const rootUrl = '/api/v1'

export async function getUserWithDetails(): Promise<UserWithDetails> {
  const res = await request.get(`${rootUrl}/users/`)
  return res.body
}
