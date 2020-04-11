import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import GlobalStyles from './styles/global'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
