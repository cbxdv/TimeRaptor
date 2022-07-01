import React from 'react'
import styled from 'styled-components'

import AddIcon from '../assets/icons/Add.svg'
import MinusIcon from '../assets/icons/Minus.svg'
import { flexCenter, buttonStyles } from '../styles/styleUtils'

const NumberInput: React.FC<NumberInputProps> = ({
  start,
  end,
  step,
  value,
  incrementHandler,
  decrementHandler
}) => {
  const increment = () => {
    if (value < end && value + step <= end) {
      incrementHandler()
    }
  }

  const decrement = () => {
    if (value > start && value - step >= start) {
      decrementHandler()
    }
  }

  return (
    <NumberInputContainer>
      <ButtonContainer role='button' onClick={decrement}>
        <MinusIcon />
      </ButtonContainer>
      <NumberContainer>{value}</NumberContainer>
      <ButtonContainer role='button' onClick={increment}>
        <AddIcon />
      </ButtonContainer>
    </NumberInputContainer>
  )
}

type NumberInputProps = {
  start: number
  end: number
  step: number
  value: number
  incrementHandler: () => void
  decrementHandler: () => void
}

const NumberInputContainer = styled.div`
  ${flexCenter()};
`

const ButtonContainer = styled.div`
  ${flexCenter()};
  ${buttonStyles()};
  background-color: ${({ theme }) => theme.shade2};
  padding: 4px;
  cursor: pointer;
  margin: 0;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  &:active {
    transform: scale(0.9);
  }
`

const NumberContainer = styled.div`
  margin: 0 10px;
`

export default NumberInput
