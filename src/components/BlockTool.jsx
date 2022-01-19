import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import BinIcon from '../assets/icons/Bin.svg'
import EditIcon from '../assets/icons/Edit.svg'

import { getTimeString } from '../utils/timeUtils.js'

import { themeColors } from '../styles/styleConstants.js'
import { flexCenter, buttonStyles } from '../styles/styleUtils.js'

const BlockTool = ({ timeblock, show, closeHandler, position, editHandler, deleteHandler }) => {
  let { title, startTime, endTime, description } = timeblock
  const timeString = `${getTimeString(startTime)} - ${getTimeString(endTime)}`

  let ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeHandler && closeHandler()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  if (!show) return null

  return (
    <BlockToolContainer ref={ref} position={position}>
      {position === 'right' && <PositionIndicator position={position} />}
      <TooltipTextContainer>
        <TooltipHeading>{title}</TooltipHeading>
        <TooltipDescription>{description || timeString}</TooltipDescription>
      </TooltipTextContainer>
      <ButtonsContainer>
        <IconButton danger={false} onClick={editHandler}>
          <EditIcon />
        </IconButton>
        <IconButton danger={true} onClick={deleteHandler}>
          <BinIcon />
        </IconButton>
      </ButtonsContainer>
      {position === 'left' && <PositionIndicator position={position} />}
    </BlockToolContainer>
  )
}

const BlockToolContainer = styled.div`
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  ${flexCenter()};
  position: absolute;
  z-index: 3;
  background: ${themeColors.accent};
  color: ${themeColors.shade1};
  right: ${(props) => props.position === 'left' && `110%`};
  left: ${(props) => props.position === 'right' && `110%`};
`

const ButtonsContainer = styled.div`
  ${flexCenter()};
`

const IconButton = styled.button`
  ${buttonStyles()};
  background: ${(props) => (props.danger ? `#FFE5E5` : themeColors.shade1)};
  border: 1px solid
    ${(props) => (props.danger ? `#e24446` : themeColors.accent)};
  outline: none;
  border-radius: 8px;
  ${flexCenter()};
  margin: 0 4px;
  height: 40px;
  width: 40px;

  & > svg {
    fill: ${(props) => (props.danger ? `#e24446` : themeColors.accent)};
  }
`

const PositionIndicator = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  ${(props) => props.position === 'right' && `right: 100%;`};
  ${(props) => props.position === 'left' && `left: 100%`};
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  ${(props) =>
    props.position === 'right' &&
    `border-right: 10px solid ${themeColors.accent}`};
  ${(props) =>
    props.position === 'left' &&
    `border-left: 10px solid ${themeColors.accent}`};
`

const TooltipTextContainer = styled.div`
  margin-right: 20px;
  width: max-content;
`

const TooltipHeading = styled.h1`
  height: 25px;
  font-family: Dongle;
  font-size: 24px;
  font-weight: bold;
`

const TooltipDescription = styled.p`
  font-family: Dongle;
  font-size: 20px;
  font-weight: normal;
`

export default BlockTool
