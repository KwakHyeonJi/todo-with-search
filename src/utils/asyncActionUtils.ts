export interface AsyncAction<T> {
  type: any
  payload?: T
  error?: Error
}

export const createAsyncDispatcher = <T>(
  dispatch: React.Dispatch<AsyncAction<T>>,
  type: string,
  promiseFn: (...rest: any[]) => Promise<T>
) => {
  const LOADING = 'LOADING'
  const ERROR = 'ERROR'

  const handler = async (...rest: any[]) => {
    dispatch({ type: LOADING })
    try {
      const data = await promiseFn(...rest)
      dispatch({
        type,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        error: error as Error
      })
    }
  }

  return handler
}

export const loadingState = {
  loading: true,
  error: null
}

export const success = <T>(data: T) => ({
  loading: false,
  data,
  error: null
})

export const error = (error: Error) => ({
  loading: false,
  error
})
