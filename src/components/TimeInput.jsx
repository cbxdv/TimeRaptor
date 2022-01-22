import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import ClockIcon from '../assets/icons/Time.svg'
import WithModal from '../hooks/WithModal.jsx'
import { getTimeString } from '../utils/timeUtils.js'
import TextButton from './TextButton.jsx'
import { flexCenter, inputBack } from '../styles/styleUtils.js'

const TimeInput = ({ title = '', value, valueSetHandler, error }) => {
  const [showPickerPanel, setShowPickerPanel] = useState(false)

  const timeString = getTimeString(value)

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const TimePickerPanel = ({ time, closeHandler, mainSubmitHandler }) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [pm, setPm] = useState(0)

  useEffect(() => {
    setHours(time.hours)
    setMinutes(time.minutes)
    setPm(time.pm)
  }, [])

  const submitHandler = () => {
    mainSubmitHandler({ hours, minutes, pm })
    closeHandler()
  }

  const generateHoursOptions = () => {
    let hoursArr = []
    for (let index = 1; index <= 12; index++) {
      hoursArr.push(
        <PickerOption
          selected={hours === index}
          alt={index % 2}
          onClick={() => setHours(index)}
          key={`hour${index}`}
        >
          {index}
        </PickerOption>
      )
    }
    return hoursArr
  }
  const generateMinutesOptions = () => {
    let mintuesArr = []
    for (let index = 0; index < 60; index += 5) {
      mintuesArr.push(
        <PickerOption
          selected={minutes === index}
          alt={index % 2}
          onClick={() => setMinutes(index)}
          key={`minute${index}`}
        >
          {index}
        </PickerOption>
      )
    }
    return mintuesArr
  }

  return (
    <WithModal modalTitle='Pick Time' closeHandler={closeHandler}>
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
              <PickerOption selected={!pm} onClick={() => setPm(false)} key={`ampm0`}>
                a.m.
              </PickerOption>
              <PickerOption
                selected={pm}
                alt={1}
                onClick={() => setPm(true)}
                key={`ampm1`}
              >
                p.m.
              </PickerOption>
            </div>
          </PickerSecsContainer>
        </div>
      </TimePickerPanelContainer>
      <ButtonsContainer>
        <TextButton label='Discard' variant='danger' onClick={closeHandler} />
        <TextButton label='Submit' variant='success' onClick={() => submitHandler()} />
      </ButtonsContainer>
    </WithModal>
  )
}

const TimePickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  margin: 30px;
`

const PickerHeader = styled.div`
  background-color: ${({ theme }) => theme.accent};
  height: 40px;
  border-radius: 8px;
  font-family: Outfit;
  font-size: 14px;
  font-weight: bold;
  display: flex;

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
const PickerOption = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  border: ${({ selected }) => selected && `2px solid #60D394`};
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

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  margin: 30px;
`

const TimePickerTopBox = styled.div`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })};
  border: 2px solid ${({ error }) => (error ? `#E24446` : `transparent`)};
`

export default TimeInput
