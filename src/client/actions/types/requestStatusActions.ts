import { Action } from 'redux'

import * as ActionTypes from 'constants/ActionTypes'

type RequestNotStartedAction = Action<typeof ActionTypes.SET_REQUEST_NOT_STARTED>
type RequestPendingAction = Action<typeof ActionTypes.SET_REQUEST_PENDING>
type RequestSuccessAction = Action<typeof ActionTypes.SET_REQUEST_SUCCESS>
type RequestFailureAction = Action<typeof ActionTypes.SET_REQUEST_FAILURE>

export type RequestStatusAction =
  RequestNotStartedAction |
  RequestPendingAction |
  RequestSuccessAction |
  RequestFailureAction
