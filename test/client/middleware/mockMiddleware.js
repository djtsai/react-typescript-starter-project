/* istanbul ignore file */
const createMockMiddleware = (middleware) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }

  const next = jest.fn()

  const invoke = (action) => middleware(store)(next)(action)

  return { store, next, invoke }
}

export default createMockMiddleware
