import { useCallback, useEffect } from 'react'
import { FaPlusCircle, FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

import { useSearchState } from '../context/searchContext'
import { useTodoDispatch, useTodoState } from '../context/todoContext'
import useDebounce from '../hooks/useDebounce'
import useFocus from '../hooks/useFocus'
import useInput from '../hooks/useInput'

import Dropdown from './Dropdown'
import Spinner from './Spinner'

const DEBOUNCE_DELAY = 500

const TodoInput = () => {
  const { loading: loadingTodo } = useTodoState()
  const { loading: loadingSearch } = useSearchState()
  const { addTodo } = useTodoDispatch()

  const { value, handleChange, reset } = useInput('')
  const debouncedValue = useDebounce(value, DEBOUNCE_DELAY)

  const { ref, setFocus } = useFocus<HTMLInputElement>()

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const trimmed = value.trim()
      if (!trimmed) {
        return alert('Please write something')
      }
      const newItem = { title: trimmed }
      addTodo(newItem).then(() => reset())
    },
    [value]
  )

  useEffect(() => {
    setFocus()
  }, [setFocus])

  return (
    <TodoInputLayout>
      <TodoInputForm onSubmit={handleSubmit}>
        <FaSearch />
        <input
          placeholder="Add new todo..."
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={loadingTodo || loadingSearch}
        />
        {loadingTodo || loadingSearch ? (
          <Spinner />
        ) : (
          <TodoInputSubmitButton>
            <FaPlusCircle />
          </TodoInputSubmitButton>
        )}
      </TodoInputForm>
      <Dropdown keyword={debouncedValue} resetInput={reset} />
    </TodoInputLayout>
  )
}

const TodoInputLayout = styled.div`
  position: relative;
`

const TodoInputForm = styled.form`
  display: flex;
  align-items: center;
  height: 45px;
  margin: 0 0 20px 0;
  padding: 0 20px;
  border: 1px solid #dedede;
  border-radius: 6px;
  background: #fff;

  &:hover {
    border: 3px solid #dedede;
  }

  &:focus-within {
    border: 1px solid #9f9f9f;
  }

  input {
    flex: 1;
    padding: 0 15px;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

const TodoInputSubmitButton = styled.button.attrs({ type: 'submit' })`
  display: flex;
  align-items: center;
  height: 45px;
  background: transparent;
  color: darkcyan;
  font-size: 20px;

  &:hover {
    opacity: 0.5;
  }
`

export default TodoInput
