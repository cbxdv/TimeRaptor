import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import DayContainer from '../components/DayContainer'
import Header from '../components/Header'
import TimeLine from '../components/TimeLine'
import Loader from '../components/Loader'
import { fetchBlocks } from '../redux/slices/timeBlocksSlice'
import {
  fetchUserConfigs,
  selectDarkMode,
  darkModeToggled
} from '../redux/slices/userConfigsSlice'
import { darkThemeColors, lightThemeColors } from '../styles/styleConstants'

const MainPage = () => {
  const dispatch = useDispatch()
  const userConfigsStatus = useSelector(state => state.userConfigs.status)
  const darkMode = useSelector(selectDarkMode)

  const keyBindHandler = event => {
    if (event.key === 'l' || event.key === 'L') {
      dispatch(darkModeToggled())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
    }
  })

  useEffect(() => {
    dispatch(fetchUserConfigs())
    dispatch(fetchBlocks())
  }, [])

  if (userConfigsStatus === 'loading') {
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
  return (
    <ThemeProvider theme={darkMode ? darkThemeColors : lightThemeColors}>
      <MainPageContainer>
        <Header />
        <MainContainer>
          <TimeLine />
          <DayContainer />
        </MainContainer>
      </MainPageContainer>
    </ThemeProvider>
  )
}

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
