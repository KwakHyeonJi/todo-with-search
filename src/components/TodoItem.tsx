import { useCallback, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'

import { useTodoDispatch } from '../context/todoContext'

import Spinner from './Spinner'

interface TodoItemProps {
  id: string
  title: string
}

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isInProgress, setIsInProgress] = useState(false)
  const { remove } = useTodoDispatch()

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsInProgress(true)
      await remove(id)
    } catch (error) {
      setIsInProgress(false)
      console.error(error)
      alert('Something went wrong.')
    }
  }, [id])

  return (
    <TodoItemLayout>
      <span>{title}</span>
      <TodoItemOptionBox>
        {!isInProgress ? (
          <TodoItemRemoveButton onClick={handleRemoveTodo}>
            <FaTrash />
          </TodoItemRemoveButton>
        ) : (
          <Spinner />
        )}
      </TodoItemOptionBox>
    </TodoItemLayout>
  )
}

const TodoItemLayout = styled.li`
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;

  &:hover {
    background-color: #eaeaea;
  }
`

const TodoItemOptionBox = styled.div`
  float: right;
`

const TodoItemRemoveButton = styled.button`
  background-color: transparent;
  color: orangered;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`

export default TodoItem
