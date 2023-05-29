import { AxiosClient } from '../axiosClient'

export class TodoService {
  private RESOURCE = '/todos'
  private apiRequest: AxiosClient

  constructor(apiRequest: AxiosClient) {
    this.apiRequest = apiRequest
  }

  async get() {
    try {
      const response = await this.apiRequest.get(`${this.RESOURCE}`)
      return response.data
    } catch (error) {
      throw new Error(`API get error: ${this.RESOURCE}`)
    }
  }

  async create(todo: { title: string }) {
    try {
      const response = await this.apiRequest.post(`${this.RESOURCE}`, todo)
      return response.data
    } catch (error) {
      throw new Error(`API create error: ${this.RESOURCE}`)
    }
  }

  async delete(id: string) {
    try {
      const response = await this.apiRequest.delete(`${this.RESOURCE}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`API delete error: ${this.RESOURCE}`)
    }
  }
}
