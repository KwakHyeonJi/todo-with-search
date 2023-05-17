import { FaSpinner } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components'

const Spinner = () => {
  return <SpinnerLayout />
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerLayout = styled(FaSpinner)`
  display: flex;
  align-self: center;
  font-size: 20px;
  animation: ${spin} 2s linear infinite;
`

export default Spinner
