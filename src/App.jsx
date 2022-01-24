import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

import MainPage from './pages/MainPage'

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
