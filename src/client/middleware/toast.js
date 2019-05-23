import { toast } from 'react-toastify'

import * as ActionTypes from 'constants/ActionTypes'

const toastMiddleware = () => (next) => (action) => {
  if (action.type !== ActionTypes.DISPLAY_TOAST || !action.toast || !action.toast.message) {
    return next(action)
  }

  const type = action.toast.type || toast.TYPE.DEFAULT

  toast(action.toast.message, { type })
}

export default toastMiddleware
