const axios = jest.fn(() => Promise.resolve({ data: {} }))
axios.get = jest.fn(() => Promise.resolve({ data: {} }))
axios.post = jest.fn(() => Promise.resolve({ data: {} }))

export default axios
