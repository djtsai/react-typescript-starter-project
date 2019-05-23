import { toast } from 'react-toastify'

import * as ActionTypes from 'constants/ActionTypes'

export function getExample() {
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

export function displayToast(message, type = toast.TYPE.DEFAULT) {
  return {
    type: ActionTypes.DISPLAY_TOAST,
    toast: { message, type }
  }
}
