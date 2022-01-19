import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store.js'

import MainPage from './pages/MainPage.jsx'

const App = () => (
    <Provider store={store}>
        <MainPage />
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
