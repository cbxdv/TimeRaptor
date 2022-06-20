import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  selectTimetableNotificationStateCombined,
  selectTimetableShowCurrentBlock,
  selectTimetableShowCurrentTime,
  timetableNotificationsToggled
} from '../redux/slices/configsSlice'
import CurrentBlock from '../components/CurrentBlock'
import CurrentTime from '../components/CurrentTime'
import DayContainer from '../components/DayContainer'
import Header from '../components/Header'
import TimeLine from '../components/TimeLine'
import TimeBlockEditor from '../components/TimeBlockEditor'
import ConfigsPanel from '../components/ConfigsPanel'
import IconButton from '../components/IconButton'
import NotificationsToggle from '../components/NotificationsToggle'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import GearIcon from '../assets/icons/Gear.svg'

const TimetablePage = () => (
  <TimetablePageContainer>
    <TimetableHeader />
    <MainContainer>
      <TimeLine />
      <DayContainer />
    </MainContainer>
  </TimetablePageContainer>
)

const TimetableHeader = () => {
  const dispatch = useDispatch()

  const showCurrentTime = useSelector(selectTimetableShowCurrentTime)
  const showCurrentBlock = useSelector(selectTimetableShowCurrentBlock)
  const notificationsActive = useSelector(
    selectTimetableNotificationStateCombined
  )

  const [showAddPanel, setShowAddPanel] = useState<boolean>(false)
  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)

  const toggleNotifications = () => {
    dispatch(timetableNotificationsToggled())
  }

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'a' || event.key === 'A') && event.ctrlKey) {
      setShowAddPanel(true)
    }
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
      {showAddPanel && (
        <TimeBlockEditor closeHandler={() => setShowAddPanel(false)} />
      )}
      {showUConfigPanel && (
        <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />
      )}
      <Header
        title='Timetable'
        headerBubble1={showCurrentTime && <CurrentTime />}
        headerBubble2={showCurrentBlock && <CurrentBlock />}
        actions={
          <>
            <div>
              <IconButton
                label='Add'
                Icon={AddBlockIcon}
                onClick={() => setShowAddPanel(!showAddPanel)}
              />
            </div>
            <div className='hb-cont'>
              <NotificationsToggle
                active={notificationsActive}
                toggleNotifications={toggleNotifications}
              />
            </div>
            <div className='hb-cont'>
              <IconButton
                Icon={GearIcon}
                onClick={() => setShowUConfigPanel(!showUConfigPanel)}
              />
            </div>
          </>
        }
      />
    </>
  )
}

const TimetablePageContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`
const MainContainer = styled.main`
  display: flex;
  padding-top: 30px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 30px;
  position: relative;
`

export default TimetablePage
