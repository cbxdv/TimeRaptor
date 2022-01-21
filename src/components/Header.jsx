import React, { useState } from 'react'
import styled from 'styled-components'

import CurrentTime from './CurrentTime.jsx'
import TimeBlockEditor from './TimeBlockEditor.jsx'
import UserConfigsPanel from './UserConfigsPanel.jsx'
import IconButton from './IconButton.jsx'
import NotificationsToggle from './NotificationsToggle.jsx'

import GearIcon from '../assets/icons/Gear.svg'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import Logo from '../assets/Logo.png'

import { flexCenter } from '../styles/styleUtils.js'
import { themeColors } from '../styles/styleConstants.js'

const TopPanel = () => {
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [showUConfigPanel, setShowUConfigPanel] = useState(false)

  return (
    <Header>
      {showAddPanel && (
        <TimeBlockEditor closeHandler={() => setShowAddPanel(false)} />
      )}
      {showUConfigPanel && (
        <UserConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />
      )}
      <div className='header-section'>
        <img src={Logo} className='header-logo' />
        <h1 style={{ fontFamily: 'Outfit' }}>Timetable</h1>
      </div>
      <div className='header-section'>
        <div className='hb-cont'>
          <CurrentTime />
        </div>
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

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${themeColors.background};
  ${flexCenter({ justifyContent: 'space-between' })};
  padding: 20px 60px;
  z-index: 5;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;

  .header-logo {
    width: 45px;
    margin-right: 20px;
  }

  .hb-cont {
    margin-left: 30px;
  }

  .header-section {
    ${flexCenter()}
  }
`

export default TopPanel
