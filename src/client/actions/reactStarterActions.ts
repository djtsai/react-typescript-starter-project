import { toast } from 'react-toastify'

import * as ActionTypes from 'constants/ActionTypes'

interface APIActionMeta {
  type: string
  options: {
    url: string
    method?: string
    data?: object
  }
}

interface GetExampleAction {
  type: typeof ActionTypes.GET_EXAMPLE
  meta: APIActionMeta
}

interface DisplayToastAction {
  type: typeof ActionTypes.DISPLAY_TOAST
  toast: {
    message: string
    type: string
  }
}

export function getExample(): GetExampleAction {
  return {
    type: ActionTypes.GET_EXAMPLE,
    meta: {
      type: 'api',
      options: {
        url: '/test-endpoint'
      }
    }
  }
}

export function displayToast(message: string, type = toast.TYPE.DEFAULT): DisplayToastAction {
  return {
    type: ActionTypes.DISPLAY_TOAST,
    toast: { message, type }
  }
}
