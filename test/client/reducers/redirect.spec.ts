import { AnyAction } from 'redux'

import { RedirectActionType } from 'actions/types'
import * as ActionTypes from 'constants/ActionTypes'
import reducer from 'reducers/redirect'

describe('redirect reducer', () => {
  it('should return the initial state', () => {
    const action: AnyAction = { type: '' }
    expect(reducer(undefined, action)).toEqual('')
  })

  it('should handle SET_REDIRECT', () => {
    const url = '/test'
    const action: RedirectActionType = { type: ActionTypes.SET_REDIRECT, url }

    expect(reducer('', action)).toEqual(url)
  })

  it('should handle RESET_REDIRECT', () => {
    const action: RedirectActionType = { type: ActionTypes.RESET_REDIRECT }

    expect(reducer('/test', action)).toEqual('')
  })
})
