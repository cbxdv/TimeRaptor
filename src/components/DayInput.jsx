import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import WithModal from '../hooks/WithModal.jsx'
import TextButton from './TextButton.jsx'

import CalendarIcon from '../assets/icons/CalendarDayView.svg'

import { themeColors } from '../styles/styleConstants.js'
import { flexCenter, inputBack } from '../styles/styleUtils.js'

const DayInput = ({ title = '', value, valueSetHandler }) => {
  const [showPickerPanel, setShowPickerPanel] = useState(false)
  return (
    <React.Fragment>
      {showPickerPanel && (
        <DayPickerPanel
          day={value}
          mainSubmitHandler={valueSetHandler}
          closeHandler={() => setShowPickerPanel(false)}
        />
      )}
      <DayPickerTopBox>
        {dayStrings[value] || title}
        <div
          onClick={() => setShowPickerPanel(true)}
          style={{ cursor: 'pointer' }}
        >
          <CalendarIcon />
        </div>
      </DayPickerTopBox>
    </React.Fragment>
  )
}

const DayPickerPanel = ({ day, closeHandler, mainSubmitHandler }) => {
  const [selectedDay, setSelectedDay] = useState('')

  useEffect(() => {
    setSelectedDay(day)
  }, [])

  const submitHandler = () => {
    mainSubmitHandler(selectedDay)
    closeHandler()
  }

  const generateDayOptions = () => {
    let i = 0
    let dayArr = Object.keys(dayStrings).map((d) => {
      i++
      return (
        <PickerOption
          selected={selectedDay === d}
          alt={i % 2}
          onClick={() => setSelectedDay(d)}
          key={`${d}-option`}
        >
          {dayStrings[d]}
        </PickerOption>
      )
    })
    return dayArr
  }

  return (
    <WithModal modalTitle='Pick a day' closeHandler={closeHandler}>
      <DayPickerPanelContainer>
        <OptionsContainer>{generateDayOptions()}</OptionsContainer>
      </DayPickerPanelContainer>
      <ButtonsContainer>
        <TextButton label='Discard' variant='danger' onClick={closeHandler} />
        <TextButton
          label='Submit'
          variant='success'
          onClick={() => submitHandler()}
        />
      </ButtonsContainer>
    </WithModal>
  )
}

const dayStrings = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const DayPickerTopBox = styled.div`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })};
`

const DayPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${themeColors.shade1};
  border-radius: 8px;
  margin: 30px;
`

const OptionsContainer = styled.div`
  height: 200px;
  overflow: scroll;
  padding: 10px 0;
`

const PickerOption = styled.div`
  background-color: ${(props) =>
    props.alt ? themeColors.background : themeColors.secondary};
  background-color: ${(props) => props.selected && `#e7f8eb`};
  border: ${(props) => props.selected && `1px solid #60D394`};
  border-radius: ${(props) => props.selected && `8px`};
  ${flexCenter()}
  width: 200px;
  padding: 10px 30px;
  height: max-content;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${themeColors.shade2};
    color: ${themeColors.accent};
  }
`

const ButtonsContainer = styled.div`
  ${flexCenter({ justifyContent: 'space-between' })};
  margin: 30px;
  min-width: 250px;
`

export default DayInput
