import * as ActionTypes from 'constants/ActionTypes'

export const initialState = {
    show: false,
    message: '',
    toastType: ''
}

export default function toast(state = initialState, action) {
    const newState = { ...state }

    switch (action.type) {
        case ActionTypes.UPDATE_TOAST:
            newState.show = true
            newState.message = action.message
            newState.toastType = action.toastType
            break
        case ActionTypes.RESET_TOAST:
            return { ...initialState }
        default:
            break
    }

    return newState
}
