export type SearchState = { results: string[]; isEnd: boolean }

export enum SearchActionTypes {
  ADD_RESULTS = 'ADD_RESULTS',
  RESET_RESULTS = 'RESET_RESULTS'
}

interface AddResultAction {
  type: SearchActionTypes.ADD_RESULTS
  payload: { results: string[]; total: number }
}

interface ResetResultAction {
  type: SearchActionTypes.RESET_RESULTS
}

export type SearchAction = AddResultAction | ResetResultAction

const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActionTypes.ADD_RESULTS:
      const results = [...state.results, ...action.payload.results]
      return {
        ...state,
        results,
        isEnd: results.length === action.payload.total
      }
    case SearchActionTypes.RESET_RESULTS:
      return {
        ...state,
        results: [],
        isEnd: false
      }
    default:
      return state
  }
}

export default searchReducer
