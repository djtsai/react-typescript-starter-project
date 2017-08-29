import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        redirect: state.redirect,
        toast: state.toast
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

class ReactStarterApp extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirect !== this.props.redirect && nextProps.redirect !== '') {
            this.props.history.push(nextProps.redirect)
        }
    }

    render() {
        return (
            <div className="react-starter-app-container">
                <h1>React Starter App</h1>
                <button>Click to make sample API call!</button>
            </div>
        )
    }
}

ReactStarterApp.propTypes = {
    redirect: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactStarterApp)
