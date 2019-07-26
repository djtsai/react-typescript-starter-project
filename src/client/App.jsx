import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import RootContainer from 'containers/root'
import configureStore from 'store/configureStore'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={RootContainer}/>
      </BrowserRouter>
    </Provider>
  )
}

render(<App/>, document.getElementById('app-root'))
