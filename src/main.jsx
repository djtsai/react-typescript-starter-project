import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { render } from 'react-dom'
import configureStore from './configureStore'
import ReactStarterApp from './containers/ReactStarterApp'

const store = configureStore()

class MainApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={ReactStarterApp}/>
                </BrowserRouter>
            </Provider>
        )
    }
}

render(<MainApp/>, document.getElementById('content'))
