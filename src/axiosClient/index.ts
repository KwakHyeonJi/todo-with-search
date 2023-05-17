import axios, { AxiosRequestConfig } from 'axios'

export class AxiosClient {
  private instance

  constructor(baseURL: string, token: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    this.instance.interceptors.response.use(({ data }) => data)
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config)
  }

  post(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config)
  }
}
