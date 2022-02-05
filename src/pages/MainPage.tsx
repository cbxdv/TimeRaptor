import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { IState } from '../@types/StateInterfaces'
import Loader from '../components/Loader'

import WeekIcon from '../assets/icons/Week.svg'
import TaskIcon from '../assets/icons/Task.svg'
import Logo from '../assets/Logo.svg'
import { flexCenter } from '../styles/styleUtils'

const MainPage = () => {
  const appStatus = useSelector((state: IState) => state.app.status)

  if (appStatus === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          background: 'black'
        }}
      >
        <Loader />
      </div>
    )
  }

  const generatePageButton = (
    link: string,
    name: string,
    Icon: React.ReactElement
  ) => (
    <PageButtonContainer>
      <Link to={link}>
        <PageButton>
          <IconContainer>{Icon}</IconContainer>
          <PageName>{name}</PageName>
        </PageButton>
      </Link>
    </PageButtonContainer>
  )

  return (
    <MainPageContainer>
      <AppDetails>
        <Logo />
        Time Raptor
      </AppDetails>
      <MainButtonContainer>
        {generatePageButton('/timetable', 'Timetable', <WeekIcon />)}
        {generatePageButton('/todo/today', 'Todos', <TaskIcon />)}
      </MainButtonContainer>
    </MainPageContainer>
  )
}

const MainPageContainer = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  color: #ffffff;
  background-size: 100% 100%;
  min-height: 100vh;

  // Mesh Gradiant
  background-image: #000000;
  background-image: radial-gradient(
      at 96% 95%,
      hsla(352, 78%, 7%, 1) 0,
      transparent 52%
    ),
    radial-gradient(at 4% 76%, hsla(263, 68%, 7%, 1) 0, transparent 63%),
    radial-gradient(at 80% 10%, hsla(239, 92%, 10%, 1) 0, transparent 100%),
    radial-gradient(at 15% 27%, hsla(340, 68%, 12%, 1) 0, transparent 50%);
`

const AppDetails = styled.div`
  ${flexCenter()}
  margin-bottom: 100px;
  font-size: 32px;
  font-weight: bold;

  & > svg {
    margin-right: 20px;
    height: 80px;
    width: 80px;
  }
`

const MainButtonContainer = styled.div`
  ${flexCenter()};
`

const PageButtonContainer = styled.div`
  margin: 0 20px;
`

const PageButton = styled.div`
  ${flexCenter({ flexDirection: 'column' })};
  border: 0.1px solid #ffffff;
  background: #1d1d1f;
  height: 120px;
  width: 120px;
  border-radius: 8px;
`

const IconContainer = styled.div`
  background: #ffffff;
  border-radius: 100px;
  padding: 10px;

  & > svg {
    height: 28px;
    width: 28px;
    ${flexCenter()};
    fill: #1d1d1f;
  }
`

const PageName = styled.p`
  color: #ffffff;
  margin-top: 14px;
`

export default MainPage
