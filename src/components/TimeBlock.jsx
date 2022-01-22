import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { blockDeleted } from '../redux/slices/timeBlocksSlice.js'
import { getTimeString } from '../utils/timeUtils.js'
import BlockTool from './BlockTool.jsx'
import TimeBlockEditor from './TimeBlockEditor.jsx'
import { flexCenter } from '../styles/styleUtils.js'
import { varietyColors } from '../styles/styleConstants.js'

const TimeBlock = ({ timeblock }) => {
  const dispatch = useDispatch()
  let { blockId, day, title, startTime, endTime, duration, blockColor, description } =
    timeblock

  const [showBlockTool, setShowBlockTool] = useState(false)
  const [showBlockEditor, setShowBlockEditor] = useState(false)

  const editHandler = () => {
    setShowBlockEditor(true)
    setShowBlockTool(false)
  }

  const deleteHandler = () => {
    setShowBlockTool(false)
    dispatch(blockDeleted(timeblock))
  }

  let bgColor = varietyColors[blockColor]
  let startTimeString = getTimeString(startTime)
  let endTimeString = getTimeString(endTime)
  let blockHeight = (duration / 15) * 20
  let startPosition = startTime.hours * 80 + (startTime.minutes / 15) * 20 + 20
  if (startTime.pm === false && startTime.hours === 12) {
    startPosition -= 12 * 80
  }

  let tooltipPosition = ''
  switch (day) {
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

  let blockTitle = title
  if (title.length > 12) {
    blockTitle = blockTitle.slice(0, 12) + '...'
  }

  if (startTimeString.length + endTimeString > 24) {
    startTimeString = getTimeString(startTime, true)
    endTimeString = getTimeString(endTime, true)

    if (startTimeString.length + endTimeString > 24) {
      startTimeString = ''
      endTimeString = ''
    }
  }

  return (
    <React.Fragment>
      {showBlockEditor && (
        <TimeBlockEditor
          closeHandler={() => setShowBlockEditor(false)}
          currentBlock={timeblock}
          edit
        />
      )}
      <ToolContainer onClick={() => !showBlockTool && setShowBlockTool(true)}>
        <TimeBlockContainer
          bgColor={bgColor}
          startPosition={startPosition}
          blockHeight={blockHeight}
        >
          <StylingLineContainer>
            <TimeBlockStylingLine />
          </StylingLineContainer>
          <div style={{ overflow: 'scroll' }}>
            <BlockHeading>{blockTitle}</BlockHeading>
            {duration > 30 && (
              <BlockSubText>
                {startTimeString} - {endTimeString}
              </BlockSubText>
            )}
          </div>
          {showBlockTool && (
            <BlockTool
              timeblock={timeblock}
              position={tooltipPosition}
              show={showBlockTool}
              closeHandler={() => setShowBlockTool(false)}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          )}
        </TimeBlockContainer>
      </ToolContainer>
    </React.Fragment>
  )
}

const TimeBlockContainer = styled.div`
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
`

const StylingLineContainer = styled.div`
  width: 20px;
  ${flexCenter()};
  position: relative;
  height: 100%;
`

const TimeBlockStylingLine = styled.div`
  border-left: 4px solid black;
  height: 60%;
  opacity: 20%;
  border-radius: 8px;
`

const BlockHeading = styled.h1`
  font-family: 'Dongle';
  font-weight: bold;
  font-size: 25px;
  height: 25px;
  ${flexCenter({ justifyContent: 'flex-start' })}
  margin-bottom: -4px;
  flex-grow: 1;
`

const BlockSubText = styled.p`
  font-family: 'Dongle';
  font-weight: normal;
  font-size: 18px;
  height: 20px;
`

const ToolContainer = styled.div`
  position: relative;
  ${flexCenter()};
`

export default TimeBlock
