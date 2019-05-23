import axios from 'axios'

import * as ActionTypes from 'constants/ActionTypes'

/**
 * This middleware will make an HTTP request to retrieve data from an API endpoint
 *
 * In order for this middleware to trigger, you will need to send an action with a meta object
 * action = {
 *   type: YOUR_TYPE,
 *   meta: {
 *     type: 'api',
 *     options: {
 *       method: 'get' || 'post' || 'put' || 'delete', // default: 'get'
 *       url: '/api/v1/myEndpoint',
 *       data: {}, // optional request body
 *       responseType: '' // optional
 *     }
 *   }
 * }
 *
 * @param store
 * @returns {function(*): Function}
 */
const apiMiddleware = (store) => (next) => (action) => {
  if (!action.meta || action.meta.type !== 'api') {
    return next(action)
  }

  store.dispatch({ type: ActionTypes.SET_REQUEST_NOT_STARTED })
  store.dispatch({ type: ActionTypes.SET_REQUEST_PENDING })

  const options = action.meta.options
  return axios(options)
    .then((response) => {
      store.dispatch({ type: ActionTypes.SET_REQUEST_SUCCESS })

      next({ ...action, value: response.data.data })
    })
    .catch(() => store.dispatch({ type: ActionTypes.SET_REQUEST_FAILURE }))
}

export default apiMiddleware
