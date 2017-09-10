import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux'

class Result extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! ganteng banget Result
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
            { this.props.stateLocal.reducerSatu }
        </Text>

        <Button
            title="KURANG SATU"
            onPress={() => this.props.decrement()}
        />

        <Button
            title="GO BACK"
            onPress={() => this.props.navigation.goBack()}
        >

        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => ({
    stateLocal: state
})

const mapDispatchToProps = (dispatch) => ({
    increment : () => dispatch({ type: 'INCREMENT' }),
    decrement : () => dispatch({ type: 'DECREMENT' }),
    tambah    : () => dispatch({ type: 'TAMBAH' }),
    kurang    : () => dispatch({ type: 'KURANG' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
// export default Result