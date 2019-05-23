import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import * as Actions from 'actions/reactStarterActions'

import 'react-toastify/dist/ReactToastify.min.css'
import './index.scss'

const mapStateToProps = (state) => ({
  redirect: state.redirect
})

const mapDispatchToProps = { ...Actions }

class RootContainer extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.redirect !== prevProps.redirect && this.props.redirect !== '') {
      this.props.history.push(this.props.redirect)
    }
  }

  render() {
    return (
      <div className="react-starter-app-container">
        <ToastContainer/>
        <h1>React Starter App</h1>
        <div>
          <button onClick={this.props.getExample}>Click to make sample API call!</button>
        </div>
        <div>
          <button onClick={() => this.props.displayToast('Hello')}>Click to make toast appear!</button>
        </div>
      </div>
    )
  }
}

RootContainer.propTypes = {
  redirect: PropTypes.string.isRequired,
  getExample: PropTypes.func.isRequired,
  displayToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
