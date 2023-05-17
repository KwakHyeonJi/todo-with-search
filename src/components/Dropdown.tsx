import { useEffect } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import styled from 'styled-components'

import { useSearchDispatch, useSearchState } from '../context/searchContext'
import { useTodoDispatch } from '../context/todoContext'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { StatusTypes } from '../hooks/useStatus'

import ColoredKeyword from './ColoredKeyword'
import Spinner from './Spinner'

interface DropdownProps {
  keyword: string
  isSearching: boolean
  resetInput: () => void
  changeStatus: (state: StatusTypes) => void
}

const RECEIVING_LIMIT = 10

const Dropdown = ({
  keyword,
  isSearching,
  resetInput,
  changeStatus
}: DropdownProps) => {
  const { results, isEnd } = useSearchState()
  const { add: addResults, reset } = useSearchDispatch()
  const { add: addTodo } = useTodoDispatch()

  const handleAddTodo = async (title: string) => {
    try {
      changeStatus(StatusTypes.SAVING)
      await addTodo({ title })
      resetInput()
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      changeStatus(StatusTypes.IDLE)
    }
  }

  const addMore = async () => {
    if (isEnd) return
    changeStatus(StatusTypes.SEARCHING)
    await addResults(keyword, Math.floor(results.length / RECEIVING_LIMIT) + 1)
    changeStatus(StatusTypes.IDLE)
  }

  const infiniteScrollRef = useInfiniteScroll<HTMLUListElement>(
    addMore,
    results.length
  )

  useEffect(() => {
    const fetch = async () => {
      changeStatus(StatusTypes.SEARCHING)
      await addResults(keyword)
      changeStatus(StatusTypes.IDLE)
    }

    reset()
    keyword && fetch()
  }, [keyword])

  return results.length ? (
    <DropdownLayout ref={infiniteScrollRef}>
      {results.map(result => (
        <DropdownItem key={result} onClick={() => handleAddTodo(result)}>
          {keyword.length ? (
            <ColoredKeyword text={result} keyword={keyword} />
          ) : (
            result
          )}
        </DropdownItem>
      ))}
      <DropdownOption>
        {isSearching ? <Spinner /> : !isEnd && <FaEllipsisH />}
      </DropdownOption>
    </DropdownLayout>
  ) : (
    <></>
  )
}

const DropdownLayout = styled.ul`
  overflow-y: scroll;
  position: absolute;
  top: 55px;
  width: 100%;
  height: 200px;
  padding: 9px 0 9px 5px;
  border: 1px solid #dedede;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
  z-index: 1;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.48);
    background-clip: padding-box;
  }
`

const DropdownItem = styled.li`
  overflow: hidden;
  padding: 6px 0 6px 12px;
  border-radius: 3px;
  background: #fff;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #f2f2f2;
  }

  &:active {
    background: #d5f4f1;
  }
`

const DropdownOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
`

export default Dropdown
