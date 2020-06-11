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
  type: string
}

export interface APIAction<T> extends Action<T> {
  meta: APIActionMeta
}

export type GetExampleAction = APIAction<typeof ActionTypes.GET_EXAMPLE>

export interface DisplayToastAction extends Action<typeof ActionTypes.DISPLAY_TOAST> {
  toast: ToastMessage
}
