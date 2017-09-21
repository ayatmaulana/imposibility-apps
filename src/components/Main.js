import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  NetInfo,
  TextInput,
  Picker,
  Image,
  TouchableHighlight,
  AsyncStorage,
  ToastAndroid,
  BackHandler
} from 'react-native';
import  { connect } from 'react-redux'
import { Icon, Container, Header ,Content ,Button, Text, Form, Item, Label,  Spinner,  } from 'native-base';
import ActionSheet, { ActionSheetCustom } from 'react-native-actionsheet'
// import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'

import { get } from '../services/fetchService'

const CANCEL_INDEX = 0
const options = [ 'Cancel', 'Adjectives', 'Nouns', 'Verbs' ]
const options2 = [ 'Cancel', 'Suffix', 'Prefix']

const title = 'Choose One'



class Main extends Component {
    static navigationOptions = {
        header: null
    }

    async isInstalled(){
      try{
        let isInstalled = await AsyncStorage.getItem('installed')
        
        return isInstalled
      } catch(e)
      {
        console.log(e)
      }
      
    }


    constructor( props ){
        super(props)
        this.actionSheet = null

        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log(111)
            return true;
        });

        this.isInstalled().then( v => {


          if(v == null)
            this.props.navigation.navigate('Intro')


        })
        .catch( e => {
          console.log(e)
        })

        // this.handlePress = this.handlePress.bind(this)
        // this.showActionSheet = this.showActionSheet.bind(this)
    }

    async fetchDomain()
    {
        let isConnected = await NetInfo.isConnected.fetch()
        
        // console.log(isConnected)
        return isConnected
    }

    generateDomain()
    {
        var { baseName, o, k } = this.props.inputForm
        if( baseName == null )
            ToastAndroid.show('Base Name Cannot be Null', 6000)
        else{
            
            this.fetchDomain().then( r => {
                console.log(r)
                if( !r ) { ToastAndroid.show( "Not Connectivy", 6000 ) }
            } )
            .catch(err => console.log(err))

            get(baseName, o, k).then(d => {
              this.props.addResult( d.data.data )
            })
            .catch(e => console.log(e))
            
            this.props.navigation.navigate('Result')
        }
    }

    showActionSheet() {
      this.ActionSheet.show()
    }

    actionSheetO()
    {
     return (
          <View>
          <TouchableHighlight
            onPress={() => {
              this.ActionSheet.show()
            }}
            style={{
              marginTop: 10,
              padding: 17,
              backgroundColor: "#F0A7C1",
              borderRadius: 15
            }}
            underlayColor="#F0A7C1"
          >
            <Text style={{ color: '#626262' }}>{ this.props.inputForm.k } </Text>
          </TouchableHighlight>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title="lalala"
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={(v) => {
                if( v == CANCEL_INDEX )
                    return false

                this.props.k( options[v] )
            }}
          />
          </View>
     )
     
    }

    actionSheetK()
    {
      return (
        <View>
             <TouchableHighlight
                    onPress={() => {
                      this.ActionSheetCustom.show()
                    }}
                    style={{
                      marginTop: 10,
                      padding: 17,
                      backgroundColor: "#F0A7C1",
                      borderRadius: 15
                    }}
                    underlayColor="#F0A7C1"
                  >
                    <Text style={{ color: '#626262' }}> { this.props.inputForm.o } </Text>
                  </TouchableHighlight>
                  <ActionSheetCustom
                    
                    ref={o => this.ActionSheetCustom = o}
                    title={title}
                    options={options2}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={(v) => {
                        if( v == CANCEL_INDEX )
                          return false

                        this.props.o( options2[v] )
                    }}
                  />
        </View>
      )
    }

    _view()
    {
      const { navigate } = this.props.navigation;
      
      return (
        <Container style={ styles.container }>
                <Content>
                <View
                  style={{
                    alignItems: 'center'
                  }}
                >
                  <Image 
                      source={ require("../assets/img/logo.png") }
                      style={{ 
                        width: 250, 
                        height:200, 
                        alignItems: 'center' 
                      }}
                  />  
                </View>
                <Form
                  style={{padding: 20}}
                >
                    <TextInput 
                      onChangeText={ (val) => { this.props.baseName( val ) } }
                      placeholder="Base Name"
                      placeholderTextColor="#626262"
                      style={{
                        marginTop: 10,
                        padding: 15,
                        backgroundColor: "#F0A7C1",
                        borderRadius: 15,
                        color: "#626262"
                      }}
                      underlineColorAndroid="transparent"
                    />

                  {/* <Picker
                            mode="dialog"
                            headerBackButtonText="Baaack!"
                            selectedValue={ this.props.inputForm.k }
                            onValueChange={ (val) => { this.props.k( val ) } }
                            style={{
                              marginTop: 5,
                              padding: 15,
                              backgroundColor: "#F0A7C1",
                              borderRadius: 15
                            }}
                          >
                          <Item label="Adjectives" value="adjectives" />
                          <Item label="Nouns" value="nouns" />
                          <Item label="Verbs" value="verbs" />
                  </Picker> */}
                  
                 { this.actionSheetO() }
                 { this.actionSheetK() }

                 

                  {/* <Picker
                            mode="dialog"
                            headerBackButtonText="Baaack!"
                            selectedValue={ this.props.inputForm.o }
                            onValueChange={ (val) => { this.props.o( val ) } }
                            style={{
                              marginTop: 10,
                              padding: 15,
                              backgroundColor: "#F0A7C1",
                              borderRadius: 15
                            }}
                          >
                          <Item label="Suffix" value="suffix" />
                          <Item label="Prefix" value="prefix" />
                  </Picker> */}

                  <TouchableHighlight 
                    style={ styles.generateButton }
                    onPress={ () => { this.generateDomain() } }
                    underlayColor="#AA4468"

                  >
                          <Text style={ { color: 'white' } }> Generate </Text>
                  </TouchableHighlight>
                </Form>

                <Text style={{ marginTop: 20 ,alignSelf: 'center', color: 'white' }}> (c) 2017 - Ayat Maulana </Text>

                </Content>
       
        </Container>
      );
    }

  render() {
    return this._view()
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#B53167',
      flex: 1
    },
    gridOne: {
      backgroundColor: 'red'
    },
    gridTwo: {
      backgroundColor: 'green'
    },
    generateButton: {
      width: '100%',
      height: 60,
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#822042",
      borderRadius: 15,
      marginTop: 20
    },
    header: {
      backgroundColor: '#e74c3c',
      // elevation: 0
    },



  });
  


const mapStateToProps = (state) => ({
    inputForm: state.inputForm
})

const mapDispatchToProps = (dispatch) => ({
    baseName : (val) => dispatch({ type: 'CHANGE_BASENAME', payload: val }),
    o: (val) => dispatch({ type: 'CHANGE_O', payload: val }),
    k: (val) => dispatch({ type: 'CHANGE_K', payload: val }),
    addResult: (val) => dispatch({ type: 'ADD_RESULT', payload: val })
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
// export default Main