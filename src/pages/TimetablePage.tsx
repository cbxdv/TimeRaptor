import React from 'react'
import styled from 'styled-components'

import DayContainer from '../components/DayContainer'
import Header from '../components/Header'
import TimeLine from '../components/TimeLine'

const MainPage = () => (
  <MainPageContainer>
    <Header />
    <MainContainer>
      <TimeLine />
      <DayContainer />
    </MainContainer>
  </MainPageContainer>
)

const MainPageContainer = styled.div`
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

export default MainPage
