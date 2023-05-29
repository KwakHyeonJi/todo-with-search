import { useCallback } from 'react'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'

import { useTodoDispatch, useTodoState } from '../context/todoContext'

import Spinner from './Spinner'

interface TodoItemProps {
  id: string
  title: string
}

const TodoItem = ({ id, title }: TodoItemProps) => {
  const { loading } = useTodoState()
  const { removeTodo } = useTodoDispatch()

  const handleClickRemove = useCallback(() => removeTodo(id), [id])

  return (
    <TodoItemLayout>
      <span>{title}</span>
      <TodoItemOptionBox>
        {loading ? (
          <Spinner />
        ) : (
          <TodoItemRemoveButton onClick={handleClickRemove}>
            <FaTrash />
          </TodoItemRemoveButton>
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
