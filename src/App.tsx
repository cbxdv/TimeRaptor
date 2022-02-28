import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { HashRouter, Routes, Route } from 'react-router-dom'

import store from './redux/store'

import {
  fetchConfigs,
  selectDarkMode,
  darkModeToggled,
  selectTTNotificationState
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

// import MainPage from './pages/MainPage'
import TimetablePage from './pages/TimetablePage'
// import TodoPage from './pages/TodoPage'
// import { fetchTodos } from './redux/slices/todoSlice'

const MainComponent = () => {
  const dispatch = useDispatch()
  const platform = useSelector(selectPlatform)
  const darkMode = useSelector(selectDarkMode)
  const notificationState = useSelector(selectTTNotificationState)

  const keyBindHandler = (event: KeyboardEvent) => {
    if ((event.key === 'l' || event.key === 'L') && event.ctrlKey) {
      dispatch(darkModeToggled())
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyBindHandler)
    if (notificationState) {
      dispatch(notificationServiceStarted())
    }
    return () => {
      document.removeEventListener('keydown', keyBindHandler)
      dispatch(notificationServiceStopped())
    }
  })

  useEffect(() => {
    dispatch(appLoadingStarted())
    dispatch(fetchConfigs())
    dispatch(fetchBlocks())
    // dispatch(fetchTodos())
    dispatch(fetchAppProps())
    dispatch(appLoadingStopped())
  }, [])

  return (
    <ThemeProvider theme={darkMode ? darkThemeColors : lightThemeColors}>
      {platform === 'win32' && <Win32Controls />}
      <Routes>
        {/* <Route path='/' element={<MainPage />} /> */}
        <Route path='/' element={<TimetablePage />} />
        {/* <Route path='/todo/:listId' element={<TodoPage />} /> */}
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
