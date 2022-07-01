import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ITimeBlock } from '../@types/TimeBlockInterfaces'
import { IDayPlannerBlock } from '../@types/DayPlannerInterfaces'
import { getTimeString12 } from '../utils/timeUtils'
import BinIcon from '../assets/icons/Bin.svg'
import EditIcon from '../assets/icons/Edit.svg'
import { buttonStyles, flexCenter } from '../styles/styleUtils'

const BlockTool: React.FC<BlockToolProps> = ({
  timeBlock,
  closeHandler,
  position,
  editHandler,
  deleteHandler
}) => {
  const { title, startTime, endTime, description } = timeBlock
  const timeString = `${getTimeString12(startTime)} - ${getTimeString12(endTime)}`

  const ref = useRef<HTMLDivElement | null>(null)

  const closeTool = () => {
    if (ref && ref.current) {
      ref.current.style.opacity = '0'
    }
    setTimeout(() => {
      closeHandler()
    }, 150)
  }

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      if (closeTool) {
        closeTool()
      }
    }
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeTool()
    }
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.opacity = '1'
      setTimeout(() => {
        ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
      })
    }
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  return (
    <BlockToolContainer ref={ref} position={position}>
      {(position === 'right' || position === 'top') && <PositionIndicator position={position} />}
      <TooltipTextContainer>
        <TooltipHeading>{title}</TooltipHeading>
        <TooltipDescription>{description || timeString}</TooltipDescription>
      </TooltipTextContainer>
      <ButtonsContainer>
        <IconButton onClick={editHandler}>
          <EditIcon />
        </IconButton>
        <IconButton danger onClick={deleteHandler}>
          <BinIcon />
        </IconButton>
      </ButtonsContainer>
      {(position === 'left' || position === 'bottom') && <PositionIndicator position={position} />}
    </BlockToolContainer>
  )
}

export type PositionTypes = 'left' | 'right' | 'bottom' | 'top'

type BlockToolProps = {
  timeBlock: ITimeBlock | IDayPlannerBlock
  closeHandler: () => void
  position: PositionTypes
  editHandler: () => void
  deleteHandler: () => void
}

const BlockToolContainer = styled.div<{ position: PositionTypes }>`
  ${flexCenter()};
  opacity: 0;
  transition: 0.1s opacity ease-in;
  padding: 14px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  position: absolute;
  z-index: 3;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => (theme.name === 'dark' ? theme.text : theme.shade1)};
  right: ${({ position }) => position === 'left' && `110%`};
  left: ${({ position }) => position === 'right' && `110%`};
  bottom: ${({ position }) => position === 'top' && `110%`};
  top: ${({ position }) => position === 'bottom' && `110%`};
`

const ButtonsContainer = styled.div`
  ${flexCenter()};
`

const IconButton = styled.button<{ danger?: boolean }>`
  ${buttonStyles()};
  ${flexCenter()};
  border: 2px solid ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  outline: none;
  border-radius: 10px;
  margin: 0 4px;
  height: 40px;
  width: 40px;

  & > svg {
    fill: ${({ danger }) => (danger ? `#e24446` : `#2C9AFF`)};
  }
`

const PositionIndicator = styled.div<{ position: PositionTypes }>`
  width: 0;
  height: 0;
  position: absolute;
  ${({ position }) => position === 'right' && `right: 100%;`};
  ${({ position }) => position === 'left' && `left: 100%`};
  ${({ position }) => position === 'bottom' && `bottom: 100%`};
  ${({ position }) => position === 'top' && `top: 100%`};
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  ${({ theme, position }) => position === 'right' && `border-right: 10px solid ${theme.accent}`};
  ${({ theme, position }) => position === 'left' && `border-left: 10px solid ${theme.accent}`};
  ${({ theme, position }) => position === 'bottom' && `border-bottom: 10px solid ${theme.accent}`};
  ${({ theme, position }) => position === 'top' && `border-top: 10px solid ${theme.accent}`};
`

const TooltipTextContainer = styled.div`
  margin-right: 20px;
  width: max-content;
`

const TooltipHeading = styled.h1`
  font-size: 16px;
  font-weight: bold;
`

const TooltipDescription = styled.p`
  font-family: Dongle;
  font-size: 20px;
  font-weight: normal;
`

export default BlockTool
