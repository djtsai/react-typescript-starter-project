import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import * as ReactStarterActions from 'actions/reactStarterActions'

import './ReactStarterApp.scss'

function mapStateToProps(state) {
    return {
        redirect: state.redirect,
        toast: state.toast
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReactStarterActions, dispatch)
}

class ReactStarterApp extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast.show) {
            toast(nextProps.toast.message, { type: nextProps.toast.toastType })
        }

        if (nextProps.redirect !== this.props.redirect && nextProps.redirect !== '') {
            this.props.history.push(nextProps.redirect)
        }
    }

    render() {
        return (
            <>
                <ToastContainer/>
                <div className="react-starter-app-container">
                    <h1>React Starter App</h1>
                    <button onClick={this.props.getExample}>Click to make sample API call!</button>
                </div>
            </>
        )
    }
}

ReactStarterApp.propTypes = {
    redirect: PropTypes.string.isRequired,
    toast: PropTypes.shape({
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        toastType: PropTypes.string.isRequired
    }).isRequired,
    getExample: PropTypes.func.isRequired,
    displayToast: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactStarterApp)
