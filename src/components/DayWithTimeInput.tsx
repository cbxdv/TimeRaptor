import React from 'react'
import styled from 'styled-components'

import { flexCenter, inputBack } from '../styles/styleUtils'

const DayWithTimeInput: React.FC<DayWithTimeInputProps> = ({
  day,
  error,
  disabled,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  hours,
  setHours,
  minutes,
  setMinutes,
  amPm,
  setAmPm
}) => (
  <InputsContainer>
    <Input
      name='day'
      value={day}
      onChange={event => setDay(event.target.value)}
      error={error}
      disabled={disabled}
    />
    -
    <Input
      name='month'
      value={month}
      onChange={event => setMonth(event.target.value)}
      error={error}
      disabled={disabled}
    />
    -
    <Input
      name='year'
      value={year}
      onChange={event => setYear(event.target.value)}
      wide
      error={error}
      disabled={disabled}
    />
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    <Input
      name='hours'
      value={hours}
      onChange={event => setHours(event.target.value)}
      error={error}
      disabled={disabled}
    />
    :
    <Input
      name='minutes'
      value={minutes}
      onChange={event => setMinutes(event.target.value)}
      error={error}
      disabled={disabled}
    />
    &nbsp; &nbsp;
    <Input
      name='ampm'
      value={amPm}
      onChange={event => setAmPm(event.target.value)}
      error={error}
      disabled={disabled}
    />
  </InputsContainer>
)

type DayWithTimeInputProps = {
  day: string
  error?: boolean
  disabled?: boolean
  setDay: React.Dispatch<React.SetStateAction<string>>
  month: string
  setMonth: React.Dispatch<React.SetStateAction<string>>
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
  hours: string
  setHours: React.Dispatch<React.SetStateAction<string>>
  minutes: string
  setMinutes: React.Dispatch<React.SetStateAction<string>>
  amPm: string
  setAmPm: React.Dispatch<React.SetStateAction<string>>
}

DayWithTimeInput.defaultProps = {
  error: false,
  disabled: false
}

const InputsContainer = styled.div`
  ${inputBack()};
  ${flexCenter()};
`

const Input = styled.input<{
  wide?: boolean
  error?: boolean
  disabled?: boolean
}>`
  ${flexCenter()};
  text-align: center;
  height: 30px;
  width: ${({ wide }) => (wide ? `50px` : `30px`)};
  outline: none;
  border: 2px solid ${({ error }) => (error ? `#E24446` : `transparent`)};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  font-family: Outfit;
  font-size: 15px;
  font-weight: 500;
  margin: 0 5px;
  cursor: ${({ disabled }) => disabled && `not-allowed`};
`

export default DayWithTimeInput
