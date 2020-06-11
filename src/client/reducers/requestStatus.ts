import { RequestStatusAction } from 'actions/types/requestStatusActions'
import * as ActionTypes from 'constants/ActionTypes'
import * as RequestStatus from 'constants/RequestStatus'

export default function requestStatus(state = RequestStatus.REQUEST_NOT_STARTED, action: RequestStatusAction): string {
  switch (action.type) {
    case ActionTypes.SET_REQUEST_NOT_STARTED:
      return RequestStatus.REQUEST_NOT_STARTED
    case ActionTypes.SET_REQUEST_PENDING:
      return RequestStatus.REQUEST_PENDING
    case ActionTypes.SET_REQUEST_SUCCESS:
      return RequestStatus.REQUEST_SUCCESS
    case ActionTypes.SET_REQUEST_FAILURE:
      return RequestStatus.REQUEST_FAILURE
    default:
      break
  }

  return state
}
