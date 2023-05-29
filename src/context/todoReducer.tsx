import { loadingState, error, success } from '../utils/asyncActionUtils'

export interface Todo {
  createdAt: string
  id: string
  title: string
  updatedAt: string
}

export interface TodoState {
  loading: boolean
  data: Todo[] | []
  error: Error | null
}

export const initialTodoState = {
  loading: false,
  data: [],
  error: null
}

export enum TodoActionTypes {
  LOADING = 'LOADING',
  GET_TODOS = 'GET_TODOS',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  ERROR = 'ERROR'
}

type TodoAction =
  | {
      type: TodoActionTypes.LOADING
    }
  | {
      type: TodoActionTypes.GET_TODOS
      payload: Todo[]
    }
  | {
      type: TodoActionTypes.ADD_TODO
      payload: Todo
    }
  | {
      type: TodoActionTypes.REMOVE_TODO
      payload: Todo
    }
  | {
      type: TodoActionTypes.ERROR
      error: Error
    }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionTypes.LOADING:
      return {
        ...state,
        ...loadingState
      }
    case TodoActionTypes.GET_TODOS:
      return { ...state, ...success(action.payload) }

    case TodoActionTypes.ADD_TODO:
      return { ...state, ...success([...state.data, action.payload]) }
    case TodoActionTypes.REMOVE_TODO:
      return {
        ...state,
        ...success(state.data.filter(todo => todo.id !== action.payload.id))
      }
    case TodoActionTypes.ERROR:
      return { ...state, ...error(action.error) }
    default:
      return state
  }
}

export default todoReducer
