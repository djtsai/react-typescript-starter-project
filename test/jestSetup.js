// Mock localStorage for tests
const localStorageMock = (() => {
  return {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})
