import { useState } from 'react'

export enum StatusTypes {
  SAVING = 'SAVING',
  SEARCHING = 'SEARCHING',
  IDLE = 'IDLE'
}

const useStatus = (initialState = StatusTypes.IDLE) => {
  const [status, setState] = useState(initialState)

  const changeStatus = (status: StatusTypes) => {
    setState(status)
  }

  const isIdle = status === StatusTypes.IDLE

  return { status, changeStatus, isIdle }
}

export default useStatus
