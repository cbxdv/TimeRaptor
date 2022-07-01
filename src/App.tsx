import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import store from './redux/store'
import { fetchConfigs, selectDarkMode, darkModeToggled } from './redux/slices/configsSlice'
import { fetchBlocks } from './redux/slices/timetableSlice'
import {
  appLoadingStarted,
  appLoadingStopped,
  fetchAppProps,
  notificationServiceStarted,
  notificationServiceStopped,
  selectPlatform
} from './redux/slices/appSlice'
import Win32Controls from './components/Win32Controls'
import { darkThemeColors, lightThemeColors } from './styles/styleConstants'
import TimetablePage from './pages/TimetablePage'
import MainPage from './pages/HomePage'
import TodosPage from './pages/TodosPage'
import { fetchTodos } from './redux/slices/todosSlice'
import DayPlannerPage from './pages/DayPlannerPage'
import { fetchDayPlannerBlocks } from './redux/slices/dayPlannerSlice'
import WaterTrackerPage from './pages/WaterTrackerPage'
import { useAppDispatch, useAppSelector } from './redux/hook'

const MainComponent = () => {
  const dispatch = useAppDispatch()
  const platform = useAppSelector(selectPlatform)
  const darkMode = useAppSelector(selectDarkMode)

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'l' || event.key === 'L') && event.ctrlKey) {
      dispatch(darkModeToggled())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    dispatch(notificationServiceStarted())
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
      dispatch(notificationServiceStopped())
    }
  })

  useEffect(() => {
    // app loading
    dispatch(appLoadingStarted())

    dispatch(fetchConfigs())
    dispatch(fetchBlocks())
    dispatch(fetchTodos())
    dispatch(fetchDayPlannerBlocks())
    dispatch(fetchAppProps())

    // app loading
    dispatch(appLoadingStopped())
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkThemeColors : lightThemeColors}>
      {platform === 'win32' && <Win32Controls />}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/timetable' element={<TimetablePage />} />
        <Route path='/todos/:todoListId' element={<TodosPage />} />
        <Route path='/dayPlanner' element={<DayPlannerPage />} />
        <Route path='/waterTracker' element={<WaterTrackerPage />} />
      </Routes>
    </ThemeProvider>
  )
}

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <MainComponent />
    </HashRouter>
  </Provider>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
