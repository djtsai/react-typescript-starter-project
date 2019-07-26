import mockAxios from 'axios'

import * as ActionTypes from 'constants/ActionTypes'
import apiMiddleware from 'middleware/api'

import createMockMiddleware from './mockMiddleware'

describe('api middleware', () => {
  let mockMiddleware

  beforeEach(() => {
    mockMiddleware = createMockMiddleware(apiMiddleware)
  })

  it('should pass through when no meta object present in action', () => {
    const { next, invoke } = mockMiddleware
    const action = { type: 'TEST' }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('should make an API call when appropriate meta object is in action', (done) => {
    const { store, next, invoke } = mockMiddleware

    const data = { data: [{ name: 'def' }, { name: 'abc' }] }
    mockAxios.mockImplementationOnce(() => Promise.resolve({ data }))
    const action = {
      type: 'TEST',
      meta: {
        type: 'api',
        options: {
          url: 'https://www.example.com'
        }
      }
    }

    invoke(action).then(() => {
      expect(mockAxios).toHaveBeenCalledWith(action.meta.options)
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_NOT_STARTED })
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_PENDING })
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_SUCCESS })
      expect(next).toHaveBeenCalledWith({ ...action, value: data.data })
      done()
    })
  })

  it('should dispatch SET_REQUEST_FAILURE when API call fails', (done) => {
    const { store, next, invoke } = mockMiddleware

    mockAxios.mockImplementationOnce(() => Promise.reject())
    const action = {
      type: 'TEST',
      meta: {
        type: 'api',
        options: {
          url: 'https://www.example.com'
        }
      }
    }

    invoke(action).then(() => {
      expect(mockAxios).toHaveBeenCalledWith(action.meta.options)
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_NOT_STARTED })
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_PENDING })
      expect(store.dispatch).toHaveBeenCalledWith({ type: ActionTypes.SET_REQUEST_FAILURE })
      expect(next).not.toHaveBeenCalled()
      done()
    })
  })
})
