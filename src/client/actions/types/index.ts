import { TypeOptions } from 'react-toastify'
import { Action } from 'redux'

import * as ActionTypes from 'constants/ActionTypes'

interface APIActionMeta {
  type: string
  options: {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: Record<string, unknown>
  }
}

interface ToastMessage {
  message: string
  type?: TypeOptions
}

export interface APIAction<T> extends Action<T> {
  meta: APIActionMeta
}

export type GetExampleAction = APIAction<typeof ActionTypes.GET_EXAMPLE>

export interface DisplayToastAction extends Action<typeof ActionTypes.DISPLAY_TOAST> {
  toast: ToastMessage
}

interface SetRedirectAction extends Action<typeof ActionTypes.SET_REDIRECT> {
  url: string
}

type ResetRedirectAction = Action<typeof ActionTypes.RESET_REDIRECT>

export type RedirectActionType = SetRedirectAction | ResetRedirectAction

type RequestNotStartedAction = Action<typeof ActionTypes.SET_REQUEST_NOT_STARTED>
type RequestPendingAction = Action<typeof ActionTypes.SET_REQUEST_PENDING>
type RequestSuccessAction = Action<typeof ActionTypes.SET_REQUEST_SUCCESS>
type RequestFailureAction = Action<typeof ActionTypes.SET_REQUEST_FAILURE>

export type RequestStatusAction =
  RequestNotStartedAction |
  RequestPendingAction |
  RequestSuccessAction |
  RequestFailureAction
