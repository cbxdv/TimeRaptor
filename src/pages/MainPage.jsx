import React from 'react'
import styled from 'styled-components'

import { TimeBlocksProvider } from '../data/contexts/timeBlocksContext.js'

import TimeLine from '../components/TimeLine.jsx'
import DayContainer from '../components/DayContainer.jsx'

import { themeColors } from '../styles/styleConstants.js'
import TopPanel from '../components/Header.jsx'

const MainPage = () => {
  return (
    <MainPageContainer>
      <TimeBlocksProvider>
        <TopPanel />
        <MainContainer>
          <TimeLine />
          <DayContainer />
        </MainContainer>
      </TimeBlocksProvider>
    </MainPageContainer>
  )
}

const MainPageContainer = styled.div`
  background-color: ${themeColors.background};
  min-height: 100vh;
`
const MainContainer = styled.main`
  display: flex;
  padding-top: 30px;
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 30px;
`

export default MainPage
