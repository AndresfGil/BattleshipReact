import React from 'react'
import ReactDOM from 'react-dom/client'
import { Screen } from './Views/Screen.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Screen/>
    </Provider>
  </React.StrictMode>
)
