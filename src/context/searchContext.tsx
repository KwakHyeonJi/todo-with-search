import { createContext, useContext, useReducer } from 'react'

import { SearchService } from '../service/SearchService'
import { createAsyncDispatcher } from '../utils/asyncActionUtils'

import searchReducer, {
  SearchState,
  SearchActionTypes,
  initialSearchState
} from './searchReducer'

interface SearchProviderProps {
  children: React.ReactNode
  searchService: SearchService
}

function SearchProvider({ children, searchService }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState)

  const addResult = createAsyncDispatcher(
    dispatch,
    SearchActionTypes.ADD_RESULT,
    (keyword: string, page?: number, limit?: number) =>
      searchService.get(keyword, page, limit)
  )

  const resetResults = () => {
    dispatch({
      type: SearchActionTypes.RESET_RESULTS
    })
  }

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={{ addResult, resetResults }}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

const SearchStateContext = createContext<SearchState | null>(null)
const SearchDispatchContext = createContext<{
  addResult: (keyword: string, page?: number, limit?: number) => Promise<void>
  resetResults: () => void
} | null>(null)

const useSearchState = () => {
  const context = useContext(SearchStateContext)
  if (!context)
    throw new Error('useSearchState must be used within a SearchProvider')
  return context
}

const useSearchDispatch = () => {
  const context = useContext(SearchDispatchContext)
  if (!context)
    throw new Error('useSearchDispatch must be used within a SearchProvider')
  return context
}
export { SearchProvider, useSearchState, useSearchDispatch }
