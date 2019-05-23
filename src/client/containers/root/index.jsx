import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import './index.scss'

const mapStateToProps = (state) => ({
  redirect: state.redirect
})

const mapDispatchToProps = {}

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
        <button>Click to make sample API call!</button>
      </div>
    )
  }
}

RootContainer.propTypes = {
  redirect: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
