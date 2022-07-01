import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import WithModal from '../wrappers/WithModal'
import { dayPlannerDaysArray, dayPlannerDayString, daysArray, dayStrings } from '../utils/strings'
import { flexCenter, inputBack } from '../styles/styleUtils'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { DayPlannerDayTypes } from '../@types/DayPlannerInterfaces'
import CalendarIcon from '../assets/icons/CalendarDayView.svg'

const DayInput: React.FC<DayInputProps> = ({
  title,
  value,
  valueSetHandler,
  dayPlanner,
  dayPlannerValueSetHandler
}) => {
  const [showPickerPanel, setShowPickerPanel] = useState<boolean>(false)

  return (
    <>
      {showPickerPanel && (
        <DayPickerPanel
          day={value}
          mainSubmitHandler={valueSetHandler}
          closeHandler={() => setShowPickerPanel(false)}
          dayPlanner={dayPlanner}
          dayPlannerValueSetHandler={dayPlannerValueSetHandler}
        />
      )}
      <DayPickerTopBox>
        {dayPlanner
          ? dayPlannerDayString(value as DayPlannerDayTypes) || title
          : dayStrings(value as DayStringTypes) || title}
        <CalendarIcon onClick={() => setShowPickerPanel(true)} />
      </DayPickerTopBox>
    </>
  )
}

type DayInputProps = {
  title: string
  value: DayStringTypes | DayPlannerDayTypes
  valueSetHandler?: (day: DayStringTypes) => void
  dayPlanner?: boolean
  dayPlannerValueSetHandler?: (day: DayPlannerDayTypes) => void
}

DayInput.defaultProps = {
  valueSetHandler: () => {},
  dayPlanner: false,
  dayPlannerValueSetHandler: () => {}
}

const DayPickerPanel: React.FC<DayPickerPanelProps> = ({
  day,
  closeHandler,
  mainSubmitHandler,
  dayPlanner,
  dayPlannerValueSetHandler
}) => {
  const [selectedDay, setSelectedDay] = useState<DayStringTypes>('monday')
  const [dayPlannerSelectedDay, setDayPlannerSelectedDay] =
    useState<DayPlannerDayTypes>('currentDay')

  const dayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dayPlanner) {
      setDayPlannerSelectedDay(day as DayPlannerDayTypes)
    } else {
      setSelectedDay(day as DayStringTypes)
    }

    setTimeout(() => {
      if (dayRef && dayRef.current) {
        dayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }, [])

  const submitHandler = (close = () => {}) => {
    if (dayPlanner) {
      dayPlannerValueSetHandler(dayPlannerSelectedDay)
    } else {
      mainSubmitHandler(selectedDay)
    }
    close()
  }

  const generateDayOptions = () => {
    let dayArr = []
    if (!dayPlanner) {
      dayArr = daysArray.map((d: DayStringTypes) => (
        <PickerOption
          selected={selectedDay === d}
          onClick={() => setSelectedDay(d)}
          key={`${d}-option`}
          ref={selectedDay === d ? dayRef : null}
        >
          {dayStrings(d)}
        </PickerOption>
      ))
    } else {
      dayArr = dayPlannerDaysArray.map((d: DayPlannerDayTypes) => (
        <PickerOption
          selected={dayPlannerSelectedDay === d}
          onClick={() => setDayPlannerSelectedDay(d)}
          key={`${d}-option`}
          ref={dayPlannerSelectedDay === d ? dayRef : null}
        >
          {dayPlannerDayString(d as DayPlannerDayTypes)}
        </PickerOption>
      ))
    }
    return dayArr
  }

  return (
    <WithModal
      modalTitle='Pick a day'
      closeHandler={closeHandler}
      mainButtonProps={{ onClick: submitHandler }}
      bodyPadding='0 30px 30px 30px'
      scrollLockDisabled
    >
      <DayPickerPanelContainer>
        <OptionsContainer dayPlanner={dayPlanner}>{generateDayOptions()}</OptionsContainer>
      </DayPickerPanelContainer>
    </WithModal>
  )
}

type DayPickerPanelProps = {
  day: DayStringTypes | DayPlannerDayTypes
  closeHandler: () => void
  mainSubmitHandler: (day: DayStringTypes) => void
  dayPlanner: boolean
  dayPlannerValueSetHandler: (day: DayPlannerDayTypes) => void
}

const DayPickerTopBox = styled.div`
  ${inputBack()};
  ${flexCenter({ justifyContent: 'space-between' })};
`

const DayPickerPanelContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background-color: ${({ theme }) => theme.shade1};
  border-radius: 8px;
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const OptionsContainer = styled.div<{ dayPlanner: boolean }>`
  height: ${({ dayPlanner }) => (dayPlanner ? `100%` : `200px`)};
  overflow: scroll;
  padding: 10px 0;
`

const PickerOption = styled.div<{ selected?: boolean }>`
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ selected }) => (selected ? `#60D394` : `transparent`)};
  border-radius: 8px;
  ${flexCenter()}
  width: 200px;
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
export default DayInput
