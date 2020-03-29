import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import apiMiddleware from 'middleware/api'
import toastMiddleware from 'middleware/toast'
import rootReducer from 'reducers'

const loggerMiddleware = createLogger({ level: 'info', collapsed: true })

const createStoreWithMiddleware = process.env.NODE_ENV === 'development' ? (
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    toastMiddleware,
    loggerMiddleware
  )(createStore)
) : (
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    toastMiddleware
  )(createStore)
)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index') // eslint-disable-line @typescript-eslint/no-var-requires
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
