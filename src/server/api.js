import request from 'superagent'

const API_URL = '/api'
const EXAMPLE_URL = `${API_URL}/example`

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
    require('superagent-mock')(request, require('./api-stub'))
}

export function getExample() {
    return request.get(EXAMPLE_URL)
}
