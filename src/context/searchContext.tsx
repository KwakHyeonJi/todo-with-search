import React, { createContext, useContext, useReducer } from 'react'

import { SearchService } from '../service/SearchService'

import searchReducer, { SearchActionTypes, SearchState } from './searchReducer'

const initialState: SearchState = { results: [], isEnd: false }

const SearchStateContext = createContext<SearchState | null>(null)
const SearchDispatchContext = createContext<{
  add: (keyword: string, page?: number, limit?: number) => Promise<void>
  reset: () => void
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

interface SearchProviderProps {
  children: React.ReactNode
  searchService: SearchService
}

function SearchProvider({ children, searchService }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const add = async (keyword: string, page?: number, limit?: number) => {
    const { data } = await searchService.get(keyword, page, limit)
    dispatch({
      type: SearchActionTypes.ADD_RESULTS,
      payload: {
        results: data.result,
        total: data.total
      }
    })
  }

  const reset = () => {
    dispatch({
      type: SearchActionTypes.RESET_RESULTS
    })
  }

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={{ add, reset }}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

export { SearchProvider, useSearchState, useSearchDispatch }
