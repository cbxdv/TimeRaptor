import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  currentBlockChanged,
  selectBlocksByDay,
  selectCurrentBlock
} from '../redux/slices/timeBlocksSlice'
import { selectNotificationState } from '../redux/slices/userConfigsSlice'
import { timeBlockNotification } from '../utils/timeBlockUtils'
import { getCurrentTimeAndDay, milliToTimeObj } from '../utils/timeUtils'
import CurrentTimeLine from './CurrentTimeLine'
import { dayStrings } from '../utils/strings'
import TimeBlock from './TimeBlock'

const DayColumn = ({ dayId }) => {
  const dispatch = useDispatch()
  const dayData = useSelector(state => selectBlocksByDay(state, dayId))
  const notificationStatus = useSelector(selectNotificationState)
  const currentBlock = useSelector(selectCurrentBlock)

  const [isToday, setIsToday] = useState(false)

  let timer

  const notifyChecker = () => {
    let now
    let selectedBlock
    let startDateObj
    let endDateObj

    if (notificationStatus) {
      timer = setInterval(() => {
        dayData.forEach(block => {
          // Start Object
          let startHours = block.startTime.hours
          if (block.startTime.pm && block.startTime.hours !== 12) {
            startHours += 12
          }
          if (block.startTime.pm === false && block.startTime.hours === 12) {
            startHours = 0
          }
          const startMinutes = block.startTime.minutes
          startDateObj = new Date()
          startDateObj.setHours(startHours, startMinutes, 0, 0)

          // End Object
          let endHours = block.endTime.hours
          if (block.endTime.pm && block.endTime.hours !== 12) {
            endHours += 12
          }
          if (block.endTime.pm === false && block.endTime.hours === 12) {
            endHours = 0
          }
          const endMinutes = block.endTime.minutes
          endDateObj = new Date()
          endDateObj.setHours(endHours, endMinutes, 0, 0)

          // Now object
          now = new Date()

          if (endDateObj - now < 0) {
            return
          }

          // Comparing for notification
          if (now.toTimeString() === startDateObj.toTimeString()) {
            timeBlockNotification(block.title, block.description)
          }

          // Comparing for current block
          if (now >= startDateObj && now <= endDateObj) {
            selectedBlock = block
          }
        })

        selectedBlock = {
          ...selectedBlock,
          timeLeft: milliToTimeObj(endDateObj - now, false)
        }

        // Checking whether the current block id is same as the selected block id
        // and deciding whether to update the state
        if (!currentBlock) {
          // If not current block found, then the selected block is stored
          dispatch(currentBlockChanged(selectedBlock))
        } else if (currentBlock && selectedBlock) {
          if (currentBlock.id !== selectedBlock.id) {
            // If current block exists and the current block's id is not equal to selected block's id
            dispatch(currentBlockChanged(selectedBlock))
          } else if (
            currentBlock.timeLeft.hours !== selectedBlock.timeLeft.hours ||
            currentBlock.timeLeft.minutes !== selectedBlock.timeLeft.minutes
          ) {
            dispatch(currentBlockChanged(selectedBlock))
          }
          // If current block exists but actuallly nothing is selected as current block
        } else if (currentBlock && !selectedBlock) {
          dispatch(currentBlockChanged(null))
        }
      }, 1000)
    }
  }

  useEffect(() => {
    const now = getCurrentTimeAndDay()
    if (now.day === dayId) {
      setIsToday(true)
      if (dayData.length === 0) {
        dispatch(currentBlockChanged(null))
      }
      if (dayData && dayData.length !== 0) {
        clearInterval(timer)
        notifyChecker()
      }
    }
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <DayColumnContainer>
      <div style={{ height: 20, marginBottom: 10, paddingLeft: 5 }}>
        <DayIndicator isToday={isToday}>{dayStrings[dayId]}</DayIndicator>
      </div>
      <DayColumnMain>
        <TimeBlockContainer>
          {dayData.map(timeblock => (
            <TimeBlock key={timeblock.id} timeblock={timeblock} />
          ))}
          {isToday && <CurrentTimeLine />}
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
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? theme.shade1 : theme.secondary};
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
  color: ${({ isToday }) => isToday && `#FD2513`};
`

const TimeBlockContainer = styled.div`
  height: 100%;
  margin: 0 5px;
  position: relative;
`

export default React.memo(DayColumn)
