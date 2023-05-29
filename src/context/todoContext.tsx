import { createContext, useContext, useReducer } from 'react'

import { TodoService } from '../service/TodoService'
import { createAsyncDispatcher } from '../utils/asyncActionUtils'

import todoReducer, {
  Todo,
  TodoState,
  TodoActionTypes,
  initialTodoState
} from './todoReducer'

interface TodoProviderProps {
  children: React.ReactNode
  todoService: TodoService
}

const TodoProvider = ({ children, todoService }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  if (state.error) {
    throw state.error
  }

  const getTodos = createAsyncDispatcher(
    dispatch,
    TodoActionTypes.GET_TODOS,
    () => todoService.get()
  )

  const addTodo = createAsyncDispatcher(
    dispatch,
    TodoActionTypes.ADD_TODO,
    (todo: Todo) => todoService.create(todo)
  )

  const removeTodo = createAsyncDispatcher(
    dispatch,
    TodoActionTypes.REMOVE_TODO,
    (id: string) => todoService.delete(id)
  )

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={{ getTodos, addTodo, removeTodo }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

const TodoStateContext = createContext<TodoState | null>(null)
const TodoDispatchContext = createContext<{
  getTodos: () => Promise<void>
  addTodo: ({ title }: { title: string }) => Promise<void>
  removeTodo: (id: string) => Promise<void>
} | null>(null)

const useTodoState = () => {
  const context = useContext(TodoStateContext)
  if (!context)
    throw new Error('useTodoState must be used within a TodoProvider')
  return context
}

const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext)
  if (!context)
    throw new Error('useTodoDispatch must be used within a TodoProvider')
  return context
}

export { TodoProvider, useTodoState, useTodoDispatch }
