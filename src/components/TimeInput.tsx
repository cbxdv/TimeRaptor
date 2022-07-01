import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import WithModal from '../wrappers/WithModal'
import { getTimeString12 } from '../utils/timeUtils'
import { ITimeObject } from '../@types/DayAndTimeInterfaces'
import ClockIcon from '../assets/icons/Time.svg'
import { flexCenter, inputBack } from '../styles/styleUtils'

const TimeInput: React.FC<TimeInputProps> = ({ title = '', value, valueSetHandler, error }) => {
  const [showPickerPanel, setShowPickerPanel] = useState<boolean>(false)

  const timeString = getTimeString12(value)

  return (
    <>
      {showPickerPanel && (
        <TimePickerPanel
          time={value}
          mainSubmitHandler={valueSetHandler}
          closeHandler={() => setShowPickerPanel(false)}
        />
      )}
      <TimePickerTopBox error={error}>
        {timeString || title}
        <ClockIcon onClick={() => setShowPickerPanel(true)} />
      </TimePickerTopBox>
    </>
  )
}

type TimeInputProps = {
  title: string
  value: ITimeObject
  valueSetHandler: (selectedTime: ITimeObject) => void
  error: boolean
}

const TimePickerPanel: React.FC<TimePickerPanelProps> = ({
  time,
  closeHandler,
  mainSubmitHandler
}) => {
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [pm, setPm] = useState<boolean>(false)

  const hoursRef = useRef<HTMLDivElement>(null)
  const minutesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHours(time.hours)
    setMinutes(time.minutes)
    setPm(time.pm)

    setTimeout(() => {
      setTimeout(() => {
        hoursRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)

      setTimeout(() => {
        minutesRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 500)
    })
  }, [])

  const submitHandler = (close = () => {}) => {
    mainSubmitHandler({ hours, minutes, pm })
    close()
  }

  const generateHoursOptions = () => {
    const hoursArr = []
    for (let index = 1; index <= 12; index += 1) {
      hoursArr.push(
        <PickerOption
          selected={hours === index}
          onClick={() => setHours(index)}
          key={`hour${index}`}
          ref={hours === index ? hoursRef : null}
        >
          {index.toString().padStart(2, '0')}
        </PickerOption>
      )
    }
    return hoursArr
  }

  const generateMinutesOptions = () => {
    const mintuesArr = []
    for (let index = 0; index < 60; index += 1) {
      mintuesArr.push(
        <PickerOption
          selected={minutes === index}
          onClick={() => setMinutes(index)}
          key={`minute${index}`}
          ref={minutes === index ? minutesRef : null}
        >
          {index.toString().padStart(2, '0')}
        </PickerOption>
      )
    }
    return mintuesArr
  }

  return (
    <WithModal
      modalTitle='Pick Time'
      closeHandler={closeHandler}
      mainButtonProps={{ onClick: submitHandler }}
      bodyPadding='30px'
      scrollLockDisabled
    >
      <TimePickerPanelContainer>
        <PickerHeader>
          <div className='head-sec'>Hour</div>
          <div className='head-sec'>Minute</div>
          <div className='head-sec'>AM/PM</div>
        </PickerHeader>
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          <PickerSecsContainer>
            <div className='sec-container'>{generateHoursOptions()}</div>
          </PickerSecsContainer>
          <PickerSecsContainer>
            <div className='sec-container'>{generateMinutesOptions()}</div>
          </PickerSecsContainer>
          <PickerSecsContainer>
            <div>
              <PickerOption selected={!pm} onClick={() => setPm(false)} key='ampm0'>
                a.m.
              </PickerOption>
              <PickerOption selected={pm} onClick={() => setPm(true)} key='ampm1'>
                p.m.
              </PickerOption>
            </div>
          </PickerSecsContainer>
        </div>
      </TimePickerPanelContainer>
    </WithModal>
  )
}

type TimePickerPanelProps = {
  time: ITimeObject
  closeHandler: () => void
  mainSubmitHandler: (selectedTime: ITimeObject) => void
}

const TimePickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  margin-bottom: 20px;
`

const PickerHeader = styled.div`
  background-color: ${({ theme }) => theme.accent};
  height: 40px;
  border-radius: 8px;
  font-family: Outfit;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  color: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};

  .head-sec {
    ${flexCenter()}
    width: 90px;
    height: 43px;
  }
`

const PickerSecsContainer = styled.div`
  height: 200px;
  width: 100%;
  ${flexCenter({ flexDirection: 'column' })}
  padding: 5px 0;

  .sec-container {
    overflow: scroll;
    height: 100%;
  }
`
const PickerOption = styled.div<{ selected: boolean }>`
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ selected }) => (selected ? `#60D394` : `transparent`)};
  border-radius: 8px;
  ${flexCenter()}
  width: 60px;
  padding: 10px 30px;
  margin: 5px 0;
  height: max-content;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.shade2};
    color: ${({ theme }) => theme.text};
  }
`

const TimePickerTopBox = styled.div<{ error: boolean }>`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })};
  border: 2px solid ${({ error }) => (error ? `#E24446` : `transparent`)};
`

export default TimeInput
