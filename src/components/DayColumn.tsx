import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { selectBlocksByDay } from '../redux/slices/timetableSlice'
import { getCurrentTimeAndDay } from '../utils/timeUtils'
import CurrentTimeLine from './CurrentTimeLine'
import { dayStrings } from '../utils/strings'
import TimeBlock from './TimeBlock'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'
import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { IState } from '../@types/StateInterfaces'
import { selectTimetableShowCurrentBlock } from '../redux/slices/configsSlice'
import { useAppSelector } from '../redux/hook'

const DayColumn: React.FC<DayColumnProps> = ({ dayId, showIndicator, dayPlanner }) => {
  const dayData = useAppSelector((state: IState) => selectBlocksByDay(state, dayId))

  const showCurrentBlock = useAppSelector(selectTimetableShowCurrentBlock)

  const [isToday, setIsToday] = useState<boolean>(false)

  let timer: NodeJS.Timer

  const currentBlockService = () => {
    if (!showCurrentBlock) return
    timer = setInterval(() => {}, 60000)
  }

  useEffect(() => {
    const now = getCurrentTimeAndDay()
    if (now.day === dayId) {
      setIsToday(true)

      if (showCurrentBlock) {
        currentBlockService()
      }
    }
    return () => {
      clearInterval(timer)
    }
  }, [dayData])

  return (
    <DayColumnContainer>
      <div style={{ height: 20, marginBottom: 10, paddingLeft: 5 }}>
        <DayIndicator isToday={isToday && showIndicator}>{dayStrings(dayId)}</DayIndicator>
      </div>
      <DayColumnMain>
        <TimeBlockContainer>
          {dayData.map((timeblock: ITimeBlock) => (
            <TimeBlock
              key={timeblock.id}
              timeblock={timeblock}
              dayPlanner={dayPlanner}
              disableTool={dayPlanner}
            />
          ))}
          {isToday && showIndicator && <CurrentTimeLine />}
        </TimeBlockContainer>
      </DayColumnMain>
    </DayColumnContainer>
  )
}

type DayColumnProps = {
  dayId: DayStringTypes
  showIndicator?: boolean
  dayPlanner?: boolean
}

DayColumn.defaultProps = {
  showIndicator: true,
  dayPlanner: false
}

const DayColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DayColumnMain = styled.div`
  background-color: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.secondary)};
  width: 100%;
  height: 1960px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`

const DayIndicator = styled.div<{ isToday: boolean }>`
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
