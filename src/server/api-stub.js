import { example } from './fixtures/example-fixture'

const getError = (statusCode, errorMessage) => {
    const error = new Error(errorMessage)
    error.status = statusCode
    error.response = { text: `{"errors":[{"detail":"${errorMessage}"}]}` }

    return error
}

module.exports = [{
    pattern: `api/(.*)`,

    fixtures(match) {
        if (match[1].match(/example$/)) {
            return example
        }

        throw getError(405, 'Invalid API call!')
    },

    get(match, data) {
        return { body: data }
    },

    post() {
        throw getError(405, 'Invalid API call!')
    },

    put() {
        throw getError(405, 'Invalid API call!')
    },

    delete() {
        throw getError(405, 'Invalid API call!')
    }
}]
