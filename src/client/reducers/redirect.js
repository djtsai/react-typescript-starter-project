import * as ActionTypes from 'constants/ActionTypes'

export default function redirect(state = '', action) {
  switch (action.type) {
    case ActionTypes.SET_REDIRECT:
      return action.url
    case ActionTypes.RESET_REDIRECT:
      return ''
    default:
      break
  }

  return state
}
