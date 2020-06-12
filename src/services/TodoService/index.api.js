import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../utils/APIUtils'

import { apiMethods } from '../../constants/APIConstants'
import { TODO_BASE_URL } from '../../constants/EnvironmentConstants'
import endpoints from '../endpoints'

class TodoAPIService {
  api

  constructor() {
    this.api = create({ baseURL: TODO_BASE_URL })
  }

  async getTodos() {
    return networkCallWithApisauce(
      this.api,
      endpoints.todos,
      {},
      apiMethods.get
    )
  }
}

export default TodoAPIService
