import { toast, TypeOptions } from 'react-toastify'
import { AnyAction } from 'redux'

import { DisplayToastAction } from 'actions/types'
import * as ActionTypes from 'constants/ActionTypes'
import toastMiddleware from 'middleware/toast'

import createMockMiddleware, { MockMiddlewareType } from './createMockMiddleware'

jest.mock('react-toastify')
const mockToast = toast as jest.Mocked<typeof toast>

describe('toast middleware', () => {
  let mockMiddleware: MockMiddlewareType

  beforeEach(() => {
    mockMiddleware = createMockMiddleware(toastMiddleware)
  })

  it('should pass through when not toast action', () => {
    const { next, invoke } = mockMiddleware
    const action: AnyAction = { type: 'TEST' }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('should call toast function when receiving DISPLAY_TOAST action with message', () => {
    const { next, invoke } = mockMiddleware
    const action: DisplayToastAction = {
      type: ActionTypes.DISPLAY_TOAST,
      toast: {
        message: 'Testing'
      }
    }
    invoke(action)

    expect(next).not.toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalledWith(action.toast.message, { type: mockToast.TYPE.DEFAULT as TypeOptions })
  })
})
