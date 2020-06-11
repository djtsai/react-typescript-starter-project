import { toast, TypeOptions } from 'react-toastify'

import { DisplayToastAction, GetExampleAction } from 'actions/types'
import * as ActionTypes from 'constants/ActionTypes'

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

export function displayToast(message: string, type = toast.TYPE.DEFAULT as TypeOptions): DisplayToastAction {
  return {
    type: ActionTypes.DISPLAY_TOAST,
    toast: { message, type }
  }
}
