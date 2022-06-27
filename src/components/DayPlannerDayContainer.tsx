import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { DayPlannerDayTypes } from '../@types/DayPlannerInterfaces'
import DayPlannerColumn from './DayPlannerColumn'
import { getCurrentOffsetDayString } from '../utils/timeUtils'
import { flexCenter } from '../styles/styleUtils'
import DayColumn from './DayColumn'

const DayPlannerDayContainer = () => {
  const navigate = useNavigate()

  const [day, setDay] = useState<DayPlannerDayTypes>('currentDay')

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
      <div style={{ width: '80%', marginRight: '5px' }}>
        <DayPlannerColumn
          day={day}
          nextDayToggle={nextDayToggle}
          beforeDayToggle={beforeDayToggle}
        />
      </div>
      <div
        style={{ width: '20%' }}
        onDoubleClick={() => navigate('/timetable')}
      >
        <DayColumn
          dayId={getCurrentOffsetDayString(Number(day === 'nextDay'))}
          showIndicator={day === 'currentDay'}
          dayPlanner
        />
      </div>
    </DayContainer>
  )
}

const DayContainer = styled.div`
  ${flexCenter()};
  height: 100%;
  width: 100%;
  border-radius: 8px;
`

export default DayPlannerDayContainer
