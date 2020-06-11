import { toast as mockToast } from 'react-toastify'

import * as Actions from 'actions/reactStarterActions'
import { DisplayToastAction, GetExampleAction } from 'actions/types/reactStarterActions'
import * as ActionTypes from 'constants/ActionTypes'

describe('react starter actions', () => {
  it('get example should return GET_EXAMPLE action', () => {
    const expectedAction: GetExampleAction = {
      type: ActionTypes.GET_EXAMPLE,
      meta: {
        type: 'api',
        options: {
          url: '/test-endpoint'
        }
      }
    }

    expect(Actions.getExample()).toEqual(expectedAction)
  })

  it('display toast should return DISPLAY_TOAST action with default type', () => {
    const message = 'test'
    const expectedAction: DisplayToastAction = {
      type: ActionTypes.DISPLAY_TOAST,
      toast: { message, type: mockToast.TYPE.DEFAULT }
    }

    expect(Actions.displayToast(message)).toEqual(expectedAction)
  })

  it('display toast should return DISPLAY_TOAST action with custom type', () => {
    const message = 'test'
    const type = mockToast.TYPE.DEFAULT
    const expectedAction: DisplayToastAction = {
      type: ActionTypes.DISPLAY_TOAST,
      toast: { message, type }
    }

    expect(Actions.displayToast(message, type)).toEqual(expectedAction)
  })
})
