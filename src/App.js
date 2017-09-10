import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './stores/store'

import Main from './components/Main'
import Result from './components/Result'

const AppNavigator = StackNavigator({
    Main : { screen: Main} ,
    Result: { screen: Result }
})


export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
  }
}

