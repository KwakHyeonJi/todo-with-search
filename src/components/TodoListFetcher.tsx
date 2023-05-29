import { useEffect } from 'react'

import { useTodoDispatch, useTodoState } from '../context/todoContext'

interface TodoListFetcherProps {
  children: JSX.Element
}

const TodoListFetcher = ({ children }: TodoListFetcherProps) => {
  const { error } = useTodoState()
  const { getTodos } = useTodoDispatch()

  useEffect(() => {
    getTodos()
  }, [])

  if (error) {
    throw error
  }

  return children
}

export default TodoListFetcher
