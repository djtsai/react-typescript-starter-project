import { toast as mockToast } from 'react-toastify'

import * as ActionTypes from 'constants/ActionTypes'
import toastMiddleware from 'middleware/toast'

import createMockMiddleware from './createMockMiddleware'

describe('toast middleware', () => {
  let mockMiddleware

  beforeEach(() => {
    mockMiddleware = createMockMiddleware(toastMiddleware)
  })

  it('should pass through when not toast action', () => {
    const { next, invoke } = mockMiddleware
    const action = { type: 'TEST' }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('should call toast function when receiving DISPLAY_TOAST action with message', () => {
    const { next, invoke } = mockMiddleware
    const action = {
      type: ActionTypes.DISPLAY_TOAST,
      toast: {
        message: 'Testing'
      }
    }
    invoke(action)

    expect(next).not.toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalledWith(action.toast.message, { type: mockToast.TYPE.DEFAULT })
  })
})
