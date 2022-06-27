import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { IState } from '../@types/StateInterfaces'
import AppLogo from '../assets/Logo.svg'
import WeekIcon from '../assets/icons/Week.svg'
import TaskIcon from '../assets/icons/Task.svg'
import { buttonStyles, flexCenter, emojiTextStyles } from '../styles/styleUtils'
import Loader from '../components/Loader'
import ConfigsPanel from '../components/ConfigsPanel'
import GearEmoji from '../assets/icons/Gear.png'
import DayIcon from '../assets/icons/Day.svg'

const HomePage = () => {
  const appStatus = useSelector((state: IState) => state.app.status)
  const [showUConfigPanel, setShowUConfigPanel] = useState<boolean>(false)
  if (appStatus === 'loading') {
    return (
      <HomePageContainer>
        <Loader />
      </HomePageContainer>
    )
  }

  const generatePageContainer = (
    link: string,
    name: string,
    Icon: React.ReactElement
  ) => (
    <Link to={link} style={{ margin: '0 10px' }}>
      <MainButtonContainer>
        <IconContainer>{Icon}</IconContainer>
        <div>{name}</div>
      </MainButtonContainer>
    </Link>
  )

  return (
    <HomePageContainer>
      {showUConfigPanel && (
        <ConfigsPanel closeHandler={() => setShowUConfigPanel(false)} />
      )}
      <AppInfoContainer>
        <AppLogoContainer>
          <AppLogo />
        </AppLogoContainer>
        <AppHeading>Time Raptor</AppHeading>
      </AppInfoContainer>
      <ButtonsContainer>
        {generatePageContainer('/timetable', 'Timetable', <WeekIcon />)}
        {generatePageContainer('/todos/today', 'Todos', <TaskIcon />)}
        {generatePageContainer('/dayPlanner', 'Day Planner', <DayIcon />)}
      </ButtonsContainer>
      <div>
        <EmojiTextContainer
          role='link'
          onClick={() => setShowUConfigPanel(true)}
          style={{ cursor: 'pointer' }}
        >
          <img className='text-image' src={GearEmoji} alt='Quit' />
          <div style={{ position: 'relative' }}>
            <span className='text-link'>Settings</span>
          </div>
        </EmojiTextContainer>
      </div>
    </HomePageContainer>
  )
}

const HomePageContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  background: ${({ theme }) => theme.shade1};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-family: Outfit;
`

const AppInfoContainer = styled.div`
  ${flexCenter()};
`

const AppLogoContainer = styled.div`
  height: 100px;
  width: 100px;
`

const AppHeading = styled.div`
  font-size: 32px;
  margin: 0 20px;
`

const ButtonsContainer = styled.div`
  ${flexCenter({ flexDirection: 'row' })};
  margin: 60px 0;
`

const MainButtonContainer = styled.div`
  ${buttonStyles()};
  ${flexCenter({ flexDirection: 'column' })};
  height: 120px;
  width: 120px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;

  svg {
    fill: ${({ theme }) => theme.text};
  }
`

const IconContainer = styled.div`
  ${flexCenter()};
  background: ${({ theme }) => theme.text};
  border-radius: 30px;
  padding: 8px;
  margin-bottom: 10px;

  svg {
    fill: ${({ theme }) => theme.shade1};
  }
`

const EmojiTextContainer = styled.div`
  ${emojiTextStyles()};
`

export default HomePage
