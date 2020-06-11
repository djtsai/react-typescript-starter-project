import axios, { AxiosStatic } from 'axios'
import { AnyAction } from 'redux'

import { APIAction } from 'actions/types'
import * as ActionTypes from 'constants/ActionTypes'
import apiMiddleware from 'middleware/api'

import createMockMiddleware, { APIMockMiddlewareType } from './createMockMiddleware'

interface AxiosMock extends AxiosStatic {
  mockResolvedValueOnce: (value: jest.ResolvedValue<PromiseLike<Record<string, unknown>>>) => this
  mockRejectedValueOnce: (value?: jest.ResolvedValue<PromiseLike<Record<string, unknown>>>) => this
}

jest.mock('axios')
const mockAxios = axios as jest.Mocked<AxiosMock>

describe('api middleware', () => {
  let mockMiddleware: APIMockMiddlewareType

  beforeEach(() => {
    mockMiddleware = createMockMiddleware(apiMiddleware) as APIMockMiddlewareType
  })

  it('should pass through when no meta object present in action', () => {
    const { next, invoke } = mockMiddleware
    const action: AnyAction = { type: 'TEST' }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('should make an API call when appropriate meta object is in action', (done) => {
    const { store, next, invoke } = mockMiddleware

    const data = { data: [{ name: 'def' }, { name: 'abc' }] }
    mockAxios.mockResolvedValueOnce({ data })
    const action: APIAction<string> = {
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

    mockAxios.mockRejectedValueOnce()
    const action: APIAction<string> = {
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
