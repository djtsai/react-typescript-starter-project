import { Action } from 'redux'

import * as ActionTypes from 'constants/ActionTypes'

interface SetRedirectAction extends Action<typeof ActionTypes.SET_REDIRECT> {
  url: string
}

type ResetRedirectAction = Action<typeof ActionTypes.RESET_REDIRECT>

export type RedirectActionType = SetRedirectAction | ResetRedirectAction
