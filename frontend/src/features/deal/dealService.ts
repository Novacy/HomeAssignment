import request from '../../axios'
import { DealListPayload } from './dealPayload'
import { addAuthorization } from '../../utils/utils'

const API_URL = '/api/deals'

const listDeals = async (payload: DealListPayload, token: string) => {
  const config = addAuthorization(token)
  const { data } = await request.get(`${API_URL}`, config)
  return data.data
}

const dealService = { listDeals }

export default dealService
