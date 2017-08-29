import reducer, { initialState } from 'reducers/toast'
import * as ActionTypes from 'constants/ActionTypes'

describe('toast reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle UPDATE_TOAST', () => {
        const message = 'Message'
        const toastType = 'success'
        const action = { type: ActionTypes.UPDATE_TOAST, message, toastType }

        expect(reducer(initialState, action)).toEqual({
            show: true,
            message,
            toastType
        })
    })

    it('should handle RESET_TOAST', () => {
        const oldState = {
            show: true,
            message: 'Message',
            toastType: 'success'
        }
        const action = { type: ActionTypes.RESET_TOAST }

        expect(reducer(oldState, action)).toEqual(initialState)
    })
})
