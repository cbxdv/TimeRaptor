import React from 'react'
import styled from 'styled-components'

import CurrentTimeLine from './CurrentTimeLine'
import { dayPlannerDayString } from '../utils/strings'
import TimeBlock from './TimeBlock'
import { DayPlannerDayTypes, IDayPlannerBlock } from '../@types/DayPlannerInterfaces'
import {
  selectCurrentDayPlannerBlocks,
  selectNextDayPlannerBlocks
} from '../redux/slices/dayPlannerSlice'
import { flexCenter } from '../styles/styleUtils'
import AfterIcon from '../assets/icons/NavigateAfter.svg'
import BeforeIcon from '../assets/icons/NavigateBefore.svg'
import { useAppSelector } from '../redux/hook'

const DayPlannerColumn: React.FC<DayPlannerColumnProps> = ({
  day,
  nextDayToggle,
  beforeDayToggle
}) => {
  let dayData = []
  if (day === 'currentDay') {
    dayData = useAppSelector(selectCurrentDayPlannerBlocks)
  } else {
    dayData = useAppSelector(selectNextDayPlannerBlocks)
  }

  return (
    <DayPlannerColumnContainer>
      <div style={{ height: 20, marginBottom: 10, paddingLeft: 5 }}>
        <DayIndicator isCurrent={day === 'currentDay'}>
          {dayPlannerDayString(day)}
          <DayContolsContainer>
            <DayControl onClick={beforeDayToggle} disabled={day === 'currentDay'}>
              <BeforeIcon />
            </DayControl>
            <DayControl onClick={nextDayToggle} disabled={day === 'nextDay'}>
              <AfterIcon />
            </DayControl>
          </DayContolsContainer>
        </DayIndicator>
      </div>
      <DayPlannerColumnMain>
        <TimeBlockContainer>
          {dayData.map((timeblock: IDayPlannerBlock) => (
            <TimeBlock dayPlanner key={`${timeblock.id}_${day}`} timeblock={timeblock} />
          ))}
          {day === 'currentDay' && <CurrentTimeLine />}
        </TimeBlockContainer>
      </DayPlannerColumnMain>
    </DayPlannerColumnContainer>
  )
}

interface DayPlannerColumnProps {
  day: DayPlannerDayTypes
  nextDayToggle: () => void
  beforeDayToggle: () => void
}

const DayPlannerColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DayPlannerColumnMain = styled.div`
  background-color: ${({ theme }) => (theme.name === 'dark' ? theme.shade1 : theme.secondary)};
  width: 100%;
  height: 1960px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`

const DayIndicator = styled.div<{ isCurrent: boolean }>`
  ${flexCenter({ justifyContent: 'space-between' })};
  font-family: Outfit;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ isCurrent }) => isCurrent && `#FD2513`};
`

const TimeBlockContainer = styled.div`
  height: 100%;
  margin: 0 5px;
  position: relative;
`

const DayContolsContainer = styled.div`
  ${flexCenter()};
  width: 100px;
  margin-right: 20px;

  svg {
    fill: ${({ theme }) => theme.text};
  }
`

const DayControl = styled.div<{ disabled?: boolean }>`
  ${flexCenter()};
  margin: 0 10px;
  border-radius: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ theme }) => theme.shade2};
  }

  &:active {
    transform: scale(0.9);
  }
`

export default React.memo(DayPlannerColumn)
