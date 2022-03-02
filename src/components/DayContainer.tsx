import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectDaysToShow } from '../redux/slices/configsSlice'
import DayColumn from './DayColumn'
import { daysArray } from '../utils/strings'
import { flexCenter } from '../styles/styleUtils'

import { IState } from '../@types/StateInterfaces'
import { DayStringTypes } from '../@types/DayAndTimeInterfaces'

const DayContainer = () => {
  const blocksStatus = useSelector((state: IState) => state.timetable.status)
  const daysToShow = useSelector(selectDaysToShow)

  if (blocksStatus === 'loading') {
    return <>Loading...</>
  }

  const generateDayColumns = () => {
    const dayColumns: React.ReactElement[] = []
    daysArray.forEach((day: DayStringTypes) => {
      if (daysToShow[day] === true) {
        dayColumns.push(
          <DayColumnContainer key={`DayColumn-${day}`}>
            <DayColumn dayId={day} />
          </DayColumnContainer>
        )
      }
    })
    return dayColumns
  }

  return <DayContainerContainer>{generateDayColumns()}</DayContainerContainer>
}

const DayContainerContainer = styled.div`
  ${flexCenter()};
  height: 100%;
  width: 100%;
  border-radius: 8px;
`

const DayColumnContainer = styled.div<{ rm?: boolean }>`
  margin-right: ${({ rm }) => (rm ? 0 : `5px`)};
  width: 100%;
  border-radius: 8px;
`

export default DayContainer
