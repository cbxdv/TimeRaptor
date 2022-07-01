import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { DayPlannerDayTypes } from '../@types/DayPlannerInterfaces'
import DayPlannerColumn from './DayPlannerColumn'
import { getCurrentOffsetDayString } from '../utils/timeUtils'
import { flexCenter } from '../styles/styleUtils'
import DayColumn from './DayColumn'
import TodosColumn from './TodoColumn'
import {
  selectDayPlannerShowTimetable,
  selectDayPlannerShowTodo
} from '../redux/slices/configsSlice'
import { useAppSelector } from '../redux/hook'

const DayPlannerDayContainer = () => {
  const navigate = useNavigate()

  const [day, setDay] = useState<DayPlannerDayTypes>('currentDay')

  const showTimetable = useAppSelector(selectDayPlannerShowTimetable)
  const showTodo = useAppSelector(selectDayPlannerShowTodo)

  const nextDayToggle = () => {
    if (day === 'nextDay') return
    setDay('nextDay')
  }

  const beforeDayToggle = () => {
    if (day === 'currentDay') return
    setDay('currentDay')
  }

  return (
    <DayContainer>
      <div style={{ width: '100%', marginRight: '5px' }}>
        <DayPlannerColumn
          day={day}
          nextDayToggle={nextDayToggle}
          beforeDayToggle={beforeDayToggle}
        />
      </div>
      {showTimetable && (
        <div style={{ width: '30%' }} onDoubleClick={() => navigate('/timetable')}>
          <DayColumn
            dayId={getCurrentOffsetDayString(Number(day === 'nextDay'))}
            showIndicator={day === 'currentDay'}
            dayPlanner
          />
        </div>
      )}
      {showTodo && (
        <TodoContainer
          onDoubleClick={() =>
            navigate(`/todos/${day === 'currentDay' ? 'today' : 'tomorrow'}?enableBack=true`)
          }
        >
          <TodosColumn listId={`${day === 'currentDay' ? 'today' : 'tomorrow'}`} />
        </TodoContainer>
      )}
    </DayContainer>
  )
}

const DayContainer = styled.div`
  ${flexCenter({ alignItems: 'flex-start' })};
  height: 100%;
  width: 100%;
  border-radius: 8px;
`

const TodoContainer = styled.div`
  width: 40%;
  height: 100%;
  position: sticky;
  top: 120px;
  left: 0;
  margin-right: 5px;
`

export default DayPlannerDayContainer
