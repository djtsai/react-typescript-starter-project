import { Action } from 'redux'

import * as ActionTypes from 'constants/ActionTypes'

interface APIActionMeta {
  type: string
  options: {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: object
  }
}

interface ToastMessage {
  message: string
  type: string
}

export interface GetExampleAction extends Action<typeof ActionTypes.GET_EXAMPLE> {
  meta: APIActionMeta
}

export interface DisplayToastAction extends Action<typeof ActionTypes.DISPLAY_TOAST> {
  toast: ToastMessage
}
