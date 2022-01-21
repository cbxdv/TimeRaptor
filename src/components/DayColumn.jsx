import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectBlocksByDay } from '../redux/slices/timeBlocksSlice.js'
import { selectNotificationState } from '../redux/slices/userConfigsSlice.js'
import { saveBlocksToDisk } from '../redux/helpers/ElectronContext.js'

import { getCurrentTimeAndDay } from '../utils/timeUtils.js'
import { timeBlockNotification } from '../utils/timeBlockUtils.js'

import TimeBlock from './TimeBlock.jsx'

import { themeColors } from '../styles/styleConstants.js'

const DayColumn = ({ dayId }) => {
  const dayData = useSelector((state) => selectBlocksByDay(state, dayId))
  const notificationStatus = useSelector((state) => selectNotificationState(state))

  if (dayData && dayData.length !== 0) {
    saveBlocksToDisk(dayData, dayId)
  }

  let timer

  const notifyChecker = () => {
    let now
    if (notificationStatus) {
      timer = setInterval(() => {
        dayData.forEach((block) => {
          let startHours = block.startTime.hours
          if (block.startTime.pm && block.startTime.hours !== 12) {
            startHours += 12
          }
          if (block.startTime.pm === false && block.startTime.hours === 12) {
            startHours = 0
          }
          let startMinutes = block.startTime.minutes
          const t1 = new Date()
          t1.setHours(startHours, startMinutes, 0, 0)
          now = new Date().toTimeString()
          if (now === t1.toTimeString()) {
            timeBlockNotification(block.title, block.description)
          }
        })
      }, 1000)
    }
  }

  useEffect(() => {
    const now = getCurrentTimeAndDay()
    if (now.day === dayId) {
      clearInterval(timer)
      notifyChecker()
    }
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <DayColumnContainer>
      <div style={{ height: 20, marginBottom: 10, paddingLeft: 5 }}>
        <DayIndicator>{dayId}</DayIndicator>
      </div>
      <DayColumnMain>
        <TimeBlockContainer>
          {dayData.map((timeblock) => (
            <TimeBlock key={timeblock.id} timeblock={timeblock} />
          ))}
        </TimeBlockContainer>
      </DayColumnMain>
    </DayColumnContainer>
  )
}

const DayColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DayColumnMain = styled.div`
  background-color: ${themeColors.secondary};
  width: 100%;
  height: 1960px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`

const DayIndicator = styled.div`
  font-family: Outfit;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`

const TimeBlockContainer = styled.div`
  height: 100%;
  margin: 0 5px;
  position: relative;
`

export default React.memo(DayColumn)
