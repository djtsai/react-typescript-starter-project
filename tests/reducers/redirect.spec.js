import reducer from 'reducers/redirect'
import * as ActionTypes from 'constants/ActionTypes'

describe('redirect reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual('')
    })

    it('should handle SET_REDIRECT', () => {
        const url = '/test'
        const action = { type: ActionTypes.SET_REDIRECT, url }

        expect(reducer('', action)).toEqual(url)
    })

    it('should handle RESET_REDIRECT', () => {
        const action = { type: ActionTypes.RESET_REDIRECT }

        expect(reducer('/test', action)).toEqual('')
    })
})
