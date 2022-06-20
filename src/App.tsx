import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import store from './redux/store'

import {
  fetchConfigs,
  selectDarkMode,
  darkModeToggled,
  selectNotificationStateCombined,
  selectStartNotification,
  selectEndNotification,
  selectStartNotificationBefore,
  selectEndNotificationBefore
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

const MainComponent = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)
  const darkMode = useSelector(selectDarkMode)
  const notificationState = useSelector(selectNotificationStateCombined)
  const startNotificationState = useSelector(selectStartNotification)
  const endNotificationState = useSelector(selectEndNotification)
  const startNotificationBefore = useSelector(selectStartNotificationBefore)
  const endNotificationBefore = useSelector(selectEndNotificationBefore)

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
          startNotification: startNotificationState,
          endNotification: endNotificationState,
          startNotificationBefore,
          endNotificationBefore
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
      <TimetablePage />
    </ThemeProvider>
  )
}

const App = () => (
  <Provider store={store}>
    <MainComponent />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
