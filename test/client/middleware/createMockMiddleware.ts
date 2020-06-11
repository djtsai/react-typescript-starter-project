/* istanbul ignore file */
import { AxiosPromise } from 'axios'
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux'

export interface MockMiddlewareType {
  next: Dispatch
  invoke: (action: AnyAction) => void
  store: MiddlewareAPI
}

export interface APIMockMiddlewareType extends MockMiddlewareType {
  invoke: (action: AnyAction) => AxiosPromise
}

export type CreateMockMiddlewareType = (middleware: Middleware) => MockMiddlewareType | APIMockMiddlewareType

const createMockMiddleware: CreateMockMiddlewareType = (middleware: Middleware) => {
  const store: MiddlewareAPI = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }

  const next: Dispatch = jest.fn()

  const invoke = (action: AnyAction) => middleware(store)(next)(action)

  return { store, next, invoke }
}

export default createMockMiddleware
