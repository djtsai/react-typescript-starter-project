import { toast } from 'react-toastify'
import * as ActionTypes from 'constants/ActionTypes'
import * as API from 'server/api'

export function getExample() {
    return dispatch => (
        API.getExample().then(
            response => {
                dispatch(displayToast(response.body.message, toast.TYPE.SUCCESS))
            },
            error => {
                dispatch(displayToast(JSON.parse(error.response.text).errors[0].detail, toast.TYPE.ERROR))
            }
        )
    )
}

export function displayToast(message, toastType) {
    return dispatch => {
        dispatch({
            type: ActionTypes.UPDATE_TOAST,
            message,
            toastType
        })
        dispatch({ type: ActionTypes.RESET_TOAST })
    }
}
