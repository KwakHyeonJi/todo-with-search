import { AxiosClient } from '../axiosClient'

export class SearchService {
  private RESOURCE = '/search'
  private apiRequest: AxiosClient

  constructor(apiRequest: AxiosClient) {
    this.apiRequest = apiRequest
  }

  async get(q: string, page = 1, limit = 10) {
    try {
      const response = await this.apiRequest.get(`${this.RESOURCE}`, {
        params: {
          q,
          page,
          limit
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`API get error: ${this.RESOURCE}`)
    }
  }
}
