import { toast, TypeOptions } from 'react-toastify'
import { Middleware } from 'redux'

import { DisplayToastAction } from 'actions/types'
import * as ActionTypes from 'constants/ActionTypes'

const toastMiddleware: Middleware = () => (next) => (action: DisplayToastAction) => {
  if (action.type !== ActionTypes.DISPLAY_TOAST || !action.toast || !action.toast.message) {
    return next(action)
  }

  const type = action.toast.type || toast.TYPE.DEFAULT as TypeOptions

  toast(action.toast.message, { type })
}

export default toastMiddleware
