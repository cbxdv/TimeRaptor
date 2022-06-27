import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { blockDeleted } from '../redux/slices/timetableSlice'
import { getTimeString12 } from '../utils/timeUtils'
import BlockTool, { PositionTypes } from './BlockTool'
import TimeBlockEditor from './TimeBlockEditor'
import { flexCenter } from '../styles/styleUtils'
import { varietyColors } from '../styles/styleConstants'

import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { updateTimeStamps } from '../redux/slices/appSlice'

const TimeBlock: React.FC<TimeBlockProps> = ({ timeblock }) => {
  const dispatch = useDispatch()

  const { day, title, startTime, endTime, duration, blockColor } = timeblock

  const [showBlockTool, setShowBlockTool] = useState<boolean>(false)
  const [showBlockEditor, setShowBlockEditor] = useState<boolean>(false)

  const editHandler = () => {
    setShowBlockTool(false)
    setShowBlockEditor(true)
  }

  const deleteHandler = () => {
    setShowBlockTool(false)
    dispatch(blockDeleted(timeblock))
    dispatch(updateTimeStamps())
  }

  const bgColor = varietyColors[blockColor]
  const startTimeString = getTimeString12(startTime)
  const endTimeString = getTimeString12(endTime)
  const blockHeight = (duration / 15) * 20
  let startPosition = startTime.hours * 80 + (startTime.minutes / 15) * 20 + 20
  if (startTime.pm === false && startTime.hours === 12) {
    startPosition -= 12 * 80
  }

  let tooltipPosition: PositionTypes = 'left'
  switch (day) {
    case 'sunday':
    case 'monday':
    case 'tuesday':
    case 'wednesday':
      tooltipPosition = 'right'
      break
    default:
      tooltipPosition = 'left'
  }

  if (startTime.pm && startTime.hours !== 12) {
    startPosition += 12 * 80
  }

  return (
    <>
      {showBlockEditor && (
        <TimeBlockEditor
          closeHandler={() => setShowBlockEditor(false)}
          currentBlock={timeblock}
          edit
        />
      )}
      <ToolContainer
        onContextMenu={() => !showBlockTool && setShowBlockTool(true)}
        onClick={() => !showBlockTool && setShowBlockTool(true)}
      >
        <TimeBlockContainer
          bgColor={bgColor}
          startPosition={startPosition}
          blockHeight={blockHeight}
        >
          <StylingLineContainer>
            <TimeBlockStylingLine />
          </StylingLineContainer>
          <TimeBlockDetailsContainer>
            {duration > 15 && <BlockHeading>{title}</BlockHeading>}
            {duration > 40 && (
              <BlockSubText>
                {startTimeString} - {endTimeString}
              </BlockSubText>
            )}
          </TimeBlockDetailsContainer>
          {showBlockTool && (
            <BlockTool
              timeBlock={timeblock}
              position={tooltipPosition}
              closeHandler={() => setShowBlockTool(false)}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          )}
        </TimeBlockContainer>
      </ToolContainer>
    </>
  )
}

type TimeBlockProps = {
  timeblock: ITimeBlock
}

const TimeBlockContainer = styled.div<TimeBlockContainerProps>`
  width: 100%;
  ${flexCenter({ justifyContent: 'flex-start' })}
  background-color: ${({ bgColor }) => bgColor || `#FFADAD`};
  color: #000000;
  height: ${({ blockHeight }) => blockHeight}px;
  position: absolute;
  top: ${({ startPosition }) => startPosition}px;
  border-radius: 8px;
  box-shadow: inset 0px 0px 10px rgba(255, 251, 251, 0.5);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
`

type TimeBlockContainerProps = {
  blockHeight: number
  bgColor: string
  startPosition: number
}

const StylingLineContainer = styled.div`
  ${flexCenter()};
  width: 10px;
  position: relative;
  height: 100%;
  margin-right: 10px;
`

const TimeBlockStylingLine = styled.div`
  border-left: 4px solid black;
  height: 60%;
  opacity: 20%;
  border-radius: 8px;
  position: absolute;
  left: 5;
`

const TimeBlockDetailsContainer = styled.div`
  ${flexCenter({ alignItems: 'flex-start', flexDirection: 'column' })};
  display: block;
  width: 100%;
  overflow: hidden;
`

const BlockHeading = styled.p`
  font-weight: bold;
  font-size: 14px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BlockSubText = styled.p`
  font-family: 'Dongle';
  font-weight: normal;
  font-size: 18px;
  height: 20px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ToolContainer = styled.div`
  position: relative;
  ${flexCenter()};
`

export default TimeBlock
