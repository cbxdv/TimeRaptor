import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { fetchBlocks } from '../redux/slices/timeBlocksSlice.js'

import TimeLine from '../components/TimeLine.jsx'
import DayContainer from '../components/DayContainer.jsx'

import { themeColors } from '../styles/styleConstants.js'
import Header from '../components/Header.jsx'

const MainPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlocks())
  }, [])

  return (
    <MainPageContainer>
        <Header />
        <MainContainer>
          <TimeLine />
          <DayContainer />
        </MainContainer>
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
