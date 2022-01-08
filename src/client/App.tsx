import React, { FunctionComponent } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RootContainer from 'containers/root'
import configureStore from 'store/configureStore'

const store = configureStore()

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootContainer />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

render(<App />, document.getElementById('app-root'))
