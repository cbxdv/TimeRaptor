import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { selectAppMaximized, maximizedToggled } from '../redux/slices/appSlice'
import { flexCenter } from '../styles/styleUtils'
import CloseIcon from '../assets/icons/Close.svg'
import MinimizeIcon from '../assets/icons/Minimize.svg'
import OpenFull from '../assets/icons/OpenFull.svg'
import { closeWindow, maximizeWindow, minimizeWindow, restoreWindow } from '../utils/electronUtils'

const Win32Controls = () => {
  const dispatch = useDispatch()

  const isMaximized = useSelector(selectAppMaximized)

  const maximizeHandler = () => {
    if (isMaximized || window.innerHeight > 1000 || window.innerWidth > 1500) {
      restoreWindow()
    } else {
      maximizeWindow()
    }
    dispatch(maximizedToggled())
  }

  return (
    <Top>
      <WindowDragRegion />
      <ControlsContainer>
        <Control variant='minimize' onClick={minimizeWindow}>
          <MinimizeIcon />
        </Control>
        <Control variant='openFull' onClick={maximizeHandler}>
          <OpenFull />
        </Control>
        <Control variant='close' onClick={closeWindow}>
          <CloseIcon />
        </Control>
      </ControlsContainer>
    </Top>
  )
}

const Top = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
`

const ControlsContainer = styled.div`
  ${flexCenter({ justifyContent: 'flex-end' })};
  position: absolute;
  right: 0;
  margin-right: 20px;
  padding-top: 20px;
  z-index: 6;
`

const Control = styled.div<{ variant: string }>`
  ${flexCenter()};
  margin: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  padding: 2px;

  & > svg {
    ${flexCenter()};
    transform: scale(0.8);
    fill: grey;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }

  &:hover {
    background: ${({ variant }) => variant === 'close' && `#FD5652`};
    background: ${({ variant }) => variant === 'minimize' && `#fdbd41`};
    background: ${({ variant }) => variant === 'openFull' && `#33C949`};

    svg {
      fill: #ffffff;
    }
  }
`

const WindowDragRegion = styled.div`
  -webkit-app-region: drag;
  height: 20px;
  width: 100vw;
  position: fixed;
  top: 0;
`

export default Win32Controls
