import React, { useState } from 'react'
import styled from 'styled-components'

import BlockTool from './BlockTool.jsx'
import TimeBlockEditor from './TimeBlockEditor.jsx'

import { getTimeString } from '../utils/timeUtils.js'

import { flexCenter } from '../styles/styleUtils.js'
import { varietyColors, themeColors } from '../styles/styleConstants.js'

const TimeBlock = ({ timeblock }) => {
  let {
    blockId,
    day,
    title,
    startTime,
    endTime,
    duration,
    blockColor,
    description,
  } = timeblock

  const [showBlockTool, setshowBlockTool] = useState(false)
  const [showBlockEditor, setShowBlockEditor] = useState(false)

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
    <ToolContainer onClick={() => setshowBlockTool(true)}>
      {showBlockEditor && (
        <TimeBlockEditor
          closeHandler={() => setShowBlockEditor(false)}
          currentBlock={timeblock}
          edit
        />
      )}
      <TimeBlockContainer
        bgColor={bgColor}
        startPosition={startPosition}
        blockHeight={blockHeight}
      >
        <StylingLineContainer>
          <TimeBlockStylingLine></TimeBlockStylingLine>
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
            closeHandler={() => setshowBlockTool(false)}
            openEditor={() => setShowBlockEditor(true)}
          />
        )}
      </TimeBlockContainer>
    </ToolContainer>
  )
}

const TimeBlockContainer = styled.div`
  width: 100%;
  ${flexCenter({ justifyContent: 'flex-start' })}
  background-color: ${(props) => props.bgColor || `#FFADAD`};
  height: ${(props) => props.blockHeight}px;
  position: absolute;
  top: ${(props) => props.startPosition}px;
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
