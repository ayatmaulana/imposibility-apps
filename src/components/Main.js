import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  NetInfo
} from 'react-native';
import  { connect } from 'react-redux'
import { Icon, Container, Header ,Content ,Button, Text, Form, Picker, Item, Label, Input,  Spinner  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import axios from 'axios'

class Main extends Component {
    static navigationOptions = {
        header: null
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
            Alert.alert("BaseName Cannot Be Null")
        else{
            
            this.fetchDomain().then( r => {
                console.log(r)
                if( !r ) { Alert.alert( "Not Connectivy" ) }
            } )
            .catch(err => console.log(err))

            axios.get("http://sobatdev.com:1945/domain", {
                params: {
                    q: baseName,
                    k: k,
                    o: o
                }
            }).then( data => {
                this.props.addResult( data.data.data )
                
            } )
            .catch( err => console.log(err))

            this.props.navigation.navigate('Result')
        }
    }

    _view()
    {
      const { navigate } = this.props.navigation;
      
      return (
        <Container>
          <Header
            style={ styles.header }
            noShadow={true}
           />
          <Content>
          <Grid>
              <Col style={{ backgroundColor: 'white', height: 200 }}>
                <Content>
  
                <Form>
                  <Item floatingLabel error>
                    <Label>Username</Label>
                    <Input 
  
                      onChangeText={ (val) => { this.props.baseName( val ) } }
                    />
                  </Item>
                </Form>

                </Content>
              </Col>
              
            </Grid>
            <Grid>
              <Col style={{ backgroundColor: 'white', height: 200 }}>
                <Grid>
                  <Col>
                    <Content>
                      <Form>
                          <Picker
                            mode="dialog"
                            headerBackButtonText="Baaack!"
                            selectedValue={ this.props.inputForm.k }
                            onValueChange={ (val) => { this.props.k( val ) } }
                          >
                          <Item label="Adjectives" value="adjectives" />
                          <Item label="Nouns" value="nouns" />
                          <Item label="Verbs" value="verbs" />
                        </Picker>
  
                      </Form>
                    </Content>
                  </Col>
  
                  <Col>
                    <Content>
                      <Form>
                          <Picker
                            mode="dialog"
                            headerBackButtonText="Baaack!"
                            style={ styles.gridOne }
                            selectedValue={ this.props.inputForm.o }
                            onValueChange={ (val) => { this.props.o( val ) } }
                          >
                          <Item label="Suffix" value="suffix" />
                          <Item label="Prefix" value="prefix" />
                        </Picker>
  
                      </Form>
                    </Content>
                  </Col>
                </Grid>
                
              </Col>
              
            </Grid>
          </Content>
  
  
  
          <Button 
            style={ styles.generateButton }
            onPress={ () => { this.generateDomain() } }
          >
                  <Text style={ styles.generateButtonText }> Generate </Text>
          </Button>
        </Container>
      );
    }

  render() {
    return this._view()
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
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
      alignItems: 'center'
    },
    header: {
      backgroundColor: '#e74c3c',
      // elevation: 0
    }
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