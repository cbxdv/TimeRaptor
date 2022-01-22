import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { selectPlatform, selectMaximized, maximizedToggled, selectShowCurrentTime, selectShowCurrentBlock } from '../redux/slices/userConfigsSlice.js'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import CloseIcon from '../assets/icons/Close.svg'
import MinimizeIcon from '../assets/icons/Minimize.svg'
import OpenFull from '../assets/icons/OpenFull.svg'
import GearIcon from '../assets/icons/Gear.svg'
import Logo from '../assets/Logo.png'
import CurrentTime from './CurrentTime.jsx'
import CurrentBlock from './CurrentBlock.jsx'
import IconButton from './IconButton.jsx'
import NotificationsToggle from './NotificationsToggle.jsx'
import TimeBlockEditor from './TimeBlockEditor.jsx'
import UserConfigsPanel from './UserConfigsPanel.jsx'
import { closeWindow, maximizeWindow, minimizeWindow, restoreWindow } from '../redux/helpers/ElectronContext.js'
import { flexCenter } from '../styles/styleUtils.js'

const TopPanel = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)
  const isMaximized = useSelector(selectMaximized)
  const showCurrentTime = useSelector(selectShowCurrentTime)
  const showCurrentBlock = useSelector(selectShowCurrentBlock)

  const [showAddPanel, setShowAddPanel] = useState(false)
  const [showUConfigPanel, setShowUConfigPanel] = useState(false)

  const maximizeHandler = () => {
    if (isMaximized || window.innerHeight > 1000 || window.innerWidth > 1500) {
      restoreWindow()
    } else {
      maximizeWindow()
    }
    dispatch(maximizedToggled())
  }

  const keyBindHandler = event => {
    if(event.key === 'a' || event.key === 'A') {
      setShowAddPanel(true)
    }
    if(event.key === ',' && event.ctrlKey) {
      setShowUConfigPanel(true)
    }
    if((event.key === 'q' || event.key === 'Q') && event.ctrlKey) {
      closeWindow()
    }
    if((event.key === 'r' || event.key === 'R') && event.ctrlKey) {
      location.reload()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  return (
    <Top>
      <WindowControls />
      <Header>
        {showAddPanel && <TimeBlockEditor closeHandler={() => setShowAddPanel(false)} />}
        {showUConfigPanel && (
          <UserConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />
        )}
        <div className='header-section'>
          <img src={Logo} className='header-logo' />
          <h3>Timetable</h3>
        </div>
        <div className='header-section'>
          <div className='hb-cont'>
            { showCurrentTime && <CurrentTime /> }
          </div>
          <div className='hb-cont'>
            { showCurrentBlock && <CurrentBlock /> }
          </div>
        </div>
        <div className='header-section'  style={{ marginRight: platform === 'win32' && -80 }}>
          <div>
            <IconButton
              label='Add'
              Icon={AddBlockIcon}
              onClick={() => setShowAddPanel(!showAddPanel)}
            />
          </div>
          <div className='hb-cont'>
            <NotificationsToggle />
          </div>
          <div className='hb-cont'>
            <IconButton
              Icon={GearIcon}
              onClick={() => setShowUConfigPanel(!showUConfigPanel)}
            />
          </div>
        </div>
        {
          platform === 'win32' && (
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
          )
        }
      </Header>
    </Top>
  )
}

const Top = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
`

const ControlsContainer = styled.div`
  ${flexCenter()};
  align-self: flex-start;
  margin-top: -10px;
  margin-right: -20px;
`

const Control = styled.div`
  ${flexCenter()};
  margin: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  height: 100%;
  width: 100%;
  padding: 2px;
  
  & > svg {
    transform: scale(0.8);
    fill: ${({ theme }) => theme.text};
    height: 100%;
    width: 100%;
  }

  &:hover {
    background: ${({ variant }) => variant === 'close' && `#FD5652`};
    background: ${({ variant }) => variant === 'minimize' && `#fdbd41`};
    background: ${({ variant }) => variant === 'openFull' && `#33C949`};
    
    svg {
      fill: #FFFFFF;
    }
  }

`

const Header = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  ${flexCenter({ justifyContent: 'space-between' })};
  padding: 20px 30px;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;

  .header-logo {
    width: 45px;
    margin-right: 20px;
  }

  .hb-cont {
    margin-left: 20px;
  }

  .header-section {
    ${flexCenter()};
    margin: 0 20px;
  }
`

const WindowControls = styled.div`
  -webkit-app-region: drag;
  height: 20px;
  width: 100vw;
  position: fixed;
  top: 0;
`

export default TopPanel
