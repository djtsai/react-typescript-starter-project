import * as ActionTypes from 'constants/ActionTypes'
import * as RequestStatus from 'constants/RequestStatus'
import reducer from 'reducers/requestStatus'

const initialState = RequestStatus.REQUEST_NOT_STARTED

describe('request status reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle SET_REQUEST_NOT_STARTED', () => {
    const action = { type: ActionTypes.SET_REQUEST_NOT_STARTED }

    expect(reducer(initialState, action)).toEqual(RequestStatus.REQUEST_NOT_STARTED)
  })

  it('should handle SET_REQUEST_PENDING', () => {
    const action = { type: ActionTypes.SET_REQUEST_PENDING }

    expect(reducer(initialState, action)).toEqual(RequestStatus.REQUEST_PENDING)
  })

  it('should handle SET_REQUEST_SUCCESS', () => {
    const action = { type: ActionTypes.SET_REQUEST_SUCCESS }

    expect(reducer(initialState, action)).toEqual(RequestStatus.REQUEST_SUCCESS)
  })

  it('should handle SET_REQUEST_FAILURE', () => {
    const action = { type: ActionTypes.SET_REQUEST_FAILURE }

    expect(reducer(initialState, action)).toEqual(RequestStatus.REQUEST_FAILURE)
  })
})
