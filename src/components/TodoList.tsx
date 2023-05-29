import styled from 'styled-components'

import { useTodoState } from '../context/todoContext'

import TodoItem from './TodoItem'

const TodoList = () => {
  const { data } = useTodoState()

  return data.length ? (
    <ul>
      {data.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <TodoListEmptyText>...</TodoListEmptyText>
  )
}

const TodoListEmptyText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 0.75rem;
  color: #ececec;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
`

export default TodoList
