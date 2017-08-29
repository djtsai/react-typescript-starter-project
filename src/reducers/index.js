import { combineReducers } from 'redux'
import redirect from './redirect'
import toast from './toast'

const rootReducer = combineReducers({
    redirect,
    toast
})

export default rootReducer
