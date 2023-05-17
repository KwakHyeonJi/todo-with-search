import styled from 'styled-components'

const TodoHeader = () => {
  return (
    <TodoHeaderLayout>
      <h1>Todos</h1>
    </TodoHeaderLayout>
  )
}

const TodoHeaderLayout = styled.header`
  padding: 20px 0;
  line-height: 1.5em;

  h1 {
    margin: 0 0 2rem 0;
    color: #ececec;
    font-size: 6rem;
    font-weight: 600;
    text-align: center;
    line-height: 1em;
  }
`

export default TodoHeader
