import { error, loadingState, success } from '../utils/asyncActionUtils'

export interface SearchState {
  loading: boolean
  data: {
    results: string[]
    isEnd: boolean
  }
  error: Error | null
}

export const initialSearchState = {
  loading: false,
  data: {
    results: [],
    isEnd: false
  },
  error: null
}

export enum SearchActionTypes {
  LOADING = 'LOADING',
  ADD_RESULT = 'ADD_RESULT',
  RESET_RESULTS = 'RESET_RESULTS',
  ERROR = 'ERROR'
}

export type SearchAction =
  | {
      type: SearchActionTypes.LOADING
    }
  | {
      type: SearchActionTypes.ADD_RESULT
      payload: { result: string[]; total: number }
    }
  | {
      type: SearchActionTypes.RESET_RESULTS
    }
  | {
      type: SearchActionTypes.ERROR
      payload: { error: Error }
    }

const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case SearchActionTypes.LOADING:
      return {
        ...state,
        ...loadingState
      }
    case SearchActionTypes.ADD_RESULT:
      const results = [...state.data.results, ...action.payload.result]
      return {
        ...state,
        ...success({ results, isEnd: results.length === action.payload.total })
      }
    case SearchActionTypes.RESET_RESULTS:
      return initialSearchState
    case SearchActionTypes.ERROR:
      return { ...state, ...error(action.payload.error) }
    default:
      return state
  }
}

export default searchReducer
