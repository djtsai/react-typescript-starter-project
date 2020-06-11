import { applyMiddleware, createStore, Store } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import apiMiddleware from 'middleware/api'
import toastMiddleware from 'middleware/toast'
import rootReducer, { RootState } from 'reducers'

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

type ConfigureStore = Store<{ readonly '[$CombinedState]'?: undefined } &
  { redirect: string; requestStatus: string }> &
  { dispatch: unknown }

export default function configureStore(initialState: RootState): ConfigureStore {
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
