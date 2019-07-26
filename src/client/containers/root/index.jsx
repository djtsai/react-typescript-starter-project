import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import * as Actions from 'actions/reactStarterActions'

import 'react-toastify/dist/ReactToastify.min.css'
import './index.scss'

const RootContainer = () => {
  const dispatch = useDispatch()

  const getExample = useCallback(() => {
    dispatch(Actions.getExample())
  }, [dispatch])

  const displayToast = useCallback(() => {
    dispatch(Actions.displayToast('Hello'))
  }, [dispatch])

  return (
    <div className="react-starter-app-container">
      <ToastContainer/>
      <h1>React Starter App</h1>
      <div>
        <button onClick={getExample}>Click to make sample API call!</button>
      </div>
      <div>
        <button onClick={displayToast}>Click to make toast appear!</button>
      </div>
    </div>
  )
}

export default RootContainer
