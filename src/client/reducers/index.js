import { combineReducers } from 'redux'

import redirect from './redirect'
import requestStatus from './requestStatus'

const rootReducer = combineReducers({
  redirect,
  requestStatus
})

export default rootReducer
