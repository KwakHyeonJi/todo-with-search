import styled from 'styled-components'

import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

const Todo = () => {
  return (
    <TodoLayout>
      <TodoSection>
        <TodoHeader />
        <TodoInput />
        <TodoList />
      </TodoSection>
    </TodoLayout>
  )
}

const TodoLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`

const TodoSection = styled.section`
  width: 100%;
  padding: 8rem 10px 4rem;
`

export default Todo
