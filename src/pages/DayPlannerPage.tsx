import React, { useState } from 'react'
import styled from 'styled-components'

import ConfigsPanel from '../components/ConfigsPanel'
import Header from '../components/Header'
import CurrentTime from '../components/CurrentTime'
import NotificationsToggle from '../components/NotificationsToggle'
import IconButton from '../components/IconButton'
import TimeLine from '../components/TimeLine'
import AddBlockIcon from '../assets/icons/AddBlock.svg'
import TimeBlockEditor from '../components/TimeBlockEditor'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import DayPlannerDayContainer from '../components/DayPlannerDayContainer'
import {
  dayPlannerNotificationsToggled,
  selectDayPlannerNotificaionStateCombined,
  selectDayPlannerShowCurrentTime
} from '../redux/slices/configsSlice'
import { updateTimeStamps } from '../redux/slices/appSlice'
import GearIcon from '../assets/icons/Gear.svg'

const DayPlannerPage = () => (
  <DayPlannerPageContainer>
    <DayPlannerHeader />
    <MainContainer>
      <TimeLine />
      <DayPlannerDayContainer />
    </MainContainer>
  </DayPlannerPageContainer>
)

const DayPlannerHeader = () => {
  const dispatch = useAppDispatch()

  const [showAddPanel, setShowAddPanel] = useState<boolean>(false)
  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)

  const showCurrentTime = useAppSelector(selectDayPlannerShowCurrentTime)
  const notificationsActive = useAppSelector(selectDayPlannerNotificaionStateCombined)
  const toggleNotifications = () => {
    dispatch(dayPlannerNotificationsToggled())
    dispatch(updateTimeStamps())
  }

  return (
    <>
      {showUConfigPanel && <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />}
      {showAddPanel && <TimeBlockEditor closeHandler={() => setShowAddPanel(false)} dayPlanner />}
      <Header
        title='Day Planner'
        headerBubble1={showCurrentTime && <CurrentTime />}
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
              <IconButton Icon={GearIcon} onClick={() => setShowUConfigPanel(!showUConfigPanel)} />
            </div>
          </>
        }
      />
    </>
  )
}

const DayPlannerPageContainer = styled.div`
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

export default DayPlannerPage
