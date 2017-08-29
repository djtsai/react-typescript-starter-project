import * as ActionTypes from 'constants/ActionTypes'

export default function redirect(state = '', action) {
    let newState = state

    switch (action.type) {
        case ActionTypes.SET_REDIRECT:
            newState = action.url
            break
        case ActionTypes.RESET_REDIRECT:
            newState = ''
            break
        default:
            break
    }

    return newState
}
