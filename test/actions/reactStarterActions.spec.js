import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import nock from 'nock'
import { toast } from 'react-toastify'
import * as Actions from 'actions/reactStarterActions'
import * as ActionTypes from 'constants/ActionTypes'
import { example } from 'server/fixtures/example-fixture'

const mockStore = configureMockStore([thunkMiddleware])

describe('react starter actions', () => {
    const store = mockStore()
    const nockUrl = 'http://localhost'

    beforeEach(() => {
        store.clearActions()
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it('get example should dispatch UPDATE_TOAST, RESET_TOAST actions', done => {
        nock(nockUrl).get('/api/example').reply(200, example)

        const expectedActions = [
            {
                type: ActionTypes.UPDATE_TOAST,
                message: example.message,
                toastType: toast.TYPE.SUCCESS
            },
            { type: ActionTypes.RESET_TOAST }
        ]

        store.dispatch(Actions.getExample()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    it('get example error should dispatch UPDATE_TOAST, RESET_TOAST actions', done => {
        const message = 'Error Message'
        nock(nockUrl).get('/api/example').reply(500, `{"errors":[{"detail":"${message}"}]}`)

        const expectedActions = [
            {
                type: ActionTypes.UPDATE_TOAST,
                message,
                toastType: toast.TYPE.ERROR
            },
            { type: ActionTypes.RESET_TOAST }
        ]

        store.dispatch(Actions.getExample()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
            done()
        })
    })

    it('display toast should dispatch UPDATE_TOAST, RESET_TOAST actions', () => {
        const message = 'Message'
        const toastType = toast.TYPE.SUCCESS

        const expectedActions = [
            {
                type: ActionTypes.UPDATE_TOAST,
                message,
                toastType
            },
            { type: ActionTypes.RESET_TOAST }
        ]

        store.dispatch(Actions.displayToast(message, toastType))

        expect(store.getActions()).toEqual(expectedActions)
    })
})
