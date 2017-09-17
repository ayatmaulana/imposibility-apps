import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './stores/store'

import Main from './components/Main'
import Result from './components/Result'
import IntroScreen from './components/IntroScreen'

const AppNavigator = StackNavigator({
    Main : { screen: Main} ,
    Intro : { screen: IntroScreen}, 
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

