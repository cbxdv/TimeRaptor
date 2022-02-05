import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectTTShowCurrentTime
  // selectShowCurrentBlock
} from '../redux/slices/configsSlice'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import GearIcon from '../assets/icons/Gear.svg'
import Logo from '../assets/Logo.png'
import CurrentTime from './CurrentTime'
// import CurrentBlock from './CurrentBlock'
import IconButton from './IconButton'
import NotificationsToggle from './NotificationsToggle'
import TimeBlockEditor from './TimeBlockEditor'
import ConfigsPanel from './ConfigsPanel'
import { closeWindow, reloadWindow } from '../utils/electronContext'
import { flexCenter } from '../styles/styleUtils'
import { selectPlatform } from '../redux/slices/appSlice'

const TopPanel = () => {
  const platform = useSelector(selectPlatform)
  const showCurrentTime = useSelector(selectTTShowCurrentTime)
  // const showCurrentBlock = useSelector(selectShowCurrentBlock)

  const [showAddPanel, setShowAddPanel] = useState<boolean>(false)
  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'a' || event.key === 'A') && event.ctrlKey) {
      setShowAddPanel(true)
    }
    if (event.key === ',' && event.ctrlKey) {
      setShowUConfigPanel(true)
    }
    if ((event.key === 'q' || event.key === 'Q') && event.ctrlKey) {
      closeWindow()
    }
    if ((event.key === 'r' || event.key === 'R') && event.ctrlKey) {
      reloadWindow()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })
  return (
    <Header platform={platform}>
      {showAddPanel && (
        <TimeBlockEditor closeHandler={() => setShowAddPanel(false)} />
      )}
      {showUConfigPanel && (
        <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />
      )}
      <div className='header-section'>
        <Link to='/'>
          <img src={Logo} className='header-logo' alt='Time Raptor' />
        </Link>
        <h3>Timetable</h3>
      </div>
      <div className='header-section'>
        <div className='hb-cont'>{showCurrentTime && <CurrentTime />}</div>
        {/* <div className='hb-cont'>{showCurrentBlock && <CurrentBlock />}</div> */}
      </div>
      <div className='header-section'>
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
    </Header>
  )
}

const Header = styled.div<{ platform: string }>`
  background-color: ${({ theme }) => theme.secondary};
  ${flexCenter({ justifyContent: 'space-between' })};
  padding: 20px 30px;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;
  padding-right: ${({ platform }) => platform === 'win32' && '180px'};
  position: sticky;
  top: 0;
  z-index: 4;

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

export default TopPanel
