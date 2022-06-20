import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import store from './redux/store'

import {
  fetchConfigs,
  selectDarkMode,
  darkModeToggled,
  selectTimetableNotificationStateCombined,
  selectTimetableStartNotifications,
  selectTimetableEndNotifications,
  selectTimetableStartNotificationsBefore,
  selectTimetableEndNotificationsBefore
} from './redux/slices/configsSlice'
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

const MainComponent = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)
  const darkMode = useSelector(selectDarkMode)
  const notificationState = useSelector(
    selectTimetableNotificationStateCombined
  )
  const startNotificationsState = useSelector(selectTimetableStartNotifications)
  const endNotificationsState = useSelector(selectTimetableEndNotifications)
  const startNotificationsBefore = useSelector(
    selectTimetableStartNotificationsBefore
  )
  const endNotificationsBefore = useSelector(
    selectTimetableEndNotificationsBefore
  )

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'l' || event.key === 'L') && event.ctrlKey) {
      dispatch(darkModeToggled())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    if (notificationState) {
      dispatch(
        notificationServiceStarted({
          startNotifications: startNotificationsState,
          endNotifications: endNotificationsState,
          startNotificationsBefore,
          endNotificationsBefore
        })
      )
    }
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
    dispatch(fetchAppProps())

    // app loading
    dispatch(appLoadingStopped())
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkThemeColors : lightThemeColors}>
      {platform === 'win32' && <Win32Controls />}
      <Routes>
        {/* <TimetablePage /> */}
        <Route path='/' element={<MainPage />} />
        <Route path='/timetable' element={<TimetablePage />} />
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

ReactDOM.render(<App />, document.getElementById('root'))
