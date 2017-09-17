import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { Container, Header ,Content ,Button, Text, Form, Picker, Item, Label, Input, List, ListItem } from 'native-base';
import Spinner from 'react-native-spinkit'

import { connect } from 'react-redux'

export class LoadScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#B53167",
            height: 60
        },
        headerTintColor: 'white',
        title: 'Result',
        gesturesEnabled: true
    }

  render() {
    return (
        <View style={ styles.container }>
            <Spinner 
                style={styles.spinner} 
                isVisible={true} 
                size={100} 
                type="9CubeGrid" 
                color="#ffffff"
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B53167',
    },


    spinner: {
        marginBottom: 50
    },
})

const mapStateToProps = ( state  ) => ({
    result: state.result
})

const mapDispatchToProps = ( dispatch ) => ({
    success: ( val ) => dispatch({'type' : 'ADD_RESULT', payload: val })
})


export default connect(mapStateToProps, mapDispatchToProps)(LoadScreen)