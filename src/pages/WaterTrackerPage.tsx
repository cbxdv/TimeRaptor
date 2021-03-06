import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import ConfigsPanel from '../components/ConfigsPanel'
import Header from '../components/Header'
import IconButton from '../components/IconButton'
import {
  selectWaterTrackerNotifications,
  selectWaterTrackerShowCurrentTime,
  waterTrackerNotificationsToggled
} from '../redux/slices/configsSlice'
import CurrentTime from '../components/CurrentTime'
import NotificationsToggle from '../components/NotificationsToggle'
import WaterTrackerMain from '../components/WaterTrackerMain'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import GearIcon from '../assets/icons/Gear.svg'

const WaterTrackerPage = () => (
  <WaterTrackerPageContainer>
    <WaterTrackerHeader />
    <MainContainer>
      <WaterTrackerMain />
    </MainContainer>
  </WaterTrackerPageContainer>
)

const WaterTrackerHeader = () => {
  const dispatch = useAppDispatch()

  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)

  const showCurrentTime = useAppSelector(selectWaterTrackerShowCurrentTime)
  const notificationsActive = useAppSelector(selectWaterTrackerNotifications)

  const toggleNotifications = () => {
    dispatch(waterTrackerNotificationsToggled())
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if (event.key === ',' && event.ctrlKey) {
      setShowUConfigPanel(true)
    }
    if ((event.key === 'n' || event.key === 'N') && event.ctrlKey) {
      toggleNotifications()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  return (
    <>
      {showUConfigPanel && <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />}
      <Header
        title='Water Tracker'
        headerBubble1={showCurrentTime && <CurrentTime />}
        actions={
          <>
            <div className='hb-cont'>
              <NotificationsToggle
                active={notificationsActive}
                toggleNotifications={toggleNotifications}
              />
            </div>
            <div className='hb-cont'>
              <IconButton Icon={GearIcon} onClick={() => setShowUConfigPanel(!showUConfigPanel)} />
            </div>
          </>
        }
      />
    </>
  )
}

const WaterTrackerPageContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`

const MainContainer = styled.main`
  height: calc(100vh - 100px);
`

export default WaterTrackerPage
