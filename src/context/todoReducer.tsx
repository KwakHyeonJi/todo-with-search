export interface Todo {
  id: string
  title: string
}

export type TodoState = Todo[]

export enum TodoActionTypes {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO'
}

interface SetTodoAction {
  type: TodoActionTypes.SET_TODOS
  payload: TodoState
}

interface AddTodoAction {
  type: TodoActionTypes.ADD_TODO
  payload: Todo
}

interface RemoveTodoAction {
  type: TodoActionTypes.REMOVE_TODO
  payload: {
    id: string
  }
}

export type TodoAction = SetTodoAction | AddTodoAction | RemoveTodoAction

const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
      return action.payload
    case TodoActionTypes.ADD_TODO:
      return [...state, action.payload]
    case TodoActionTypes.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id)
    default:
      return state
  }
}

export default todoReducer
