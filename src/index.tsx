import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AxiosClient } from './axiosClient'
import { SearchProvider } from './context/searchContext'
import { TodoProvider } from './context/todoContext'
import { ApiErrorBoundary } from './error/ApiErrorBoundary'
import { SearchService } from './service/SearchService'
import { TodoService } from './service/TodoService'

const axiosClient = new AxiosClient(
  process.env.REACT_APP_API_URL || '',
  process.env.REACT_APP_TOKEN || ''
)
const todoService = new TodoService(axiosClient)
const searchService = new SearchService(axiosClient)

ReactDOM.render(
  <StrictMode>
    <ApiErrorBoundary>
      <TodoProvider todoService={todoService}>
        <SearchProvider searchService={searchService}>
          <App />
        </SearchProvider>
      </TodoProvider>
    </ApiErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
)
