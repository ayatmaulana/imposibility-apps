import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { Container, Header ,Content ,Button, Text, Form, Picker, Item, Label, Input, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import Spinner from 'react-native-spinkit'

import { connect } from 'react-redux'

import LoadScreen from './LoadScreen'

class Result extends Component {
    static navigationOptions = {
        header: false,
        headerStyle: {
            backgroundColor: "#B53167",
            height: 60
        },
        headerTintColor: 'white',
        title: 'Result',
        gesturesEnabled: true
    }
    
    // render() {

    //     if (this.props.stateLocal.result == null) 
    //     {
    //         return ( <Spinner isVisible={true} size={100} type="Bounce"  color="red" /> )
    //     }
    //     else{
    //         return (
    //             <Container>
    //                 <Content>
    //                     <Grid>
    //                         <Content>
    //                         <List
    //                                 onEndReachedThreshold={0.5}
    //                                 onEndReached={ () => { console.log('wis') } }
    //                             >
    //                                 {
    //                                     this.props. stateLocal.result.map( (a, i) => {
    //                                         return (
    //                                             <ListItem 
    //                                                 key={i}
    //                                             >
    //                                                 <Text>{a}</Text>
    //                                             </ListItem>
    //                                         )
    //                                     } )
    //                                 }
                                    
    //                             </List>
    //                         </Content>
    //                     </Grid>
    //                 </Content>
    //             </Container>
    //         )
    //     }
        
    // }

    render()
    {
        if(this.props.stateLocal.result == null)
        {
            return (
                <LoadScreen />
            )
        }  else{
            return (
                <Container
                    style={{
                        backgroundColor: "#F0A7C1"
                    }}
                >
                    <Content>
                        <Grid>
                            <Content>
                            <List
                                    onEndReachedThreshold={0.5}
                                    onEndReached={ () => { console.log('wis') } }
                                >
                                    {
                                        this.props. stateLocal.result.map( (a, i) => {
                                            return (
                                                <ListItem 
                                                    key={i}
                                                >
                                                    <Text>{a}</Text>
                                                </ListItem>
                                            )
                                        } )
                                    }
                                    
                                </List>
                            </Content>
                        </Grid>
                    </Content>
                </Container>
            )
        }
        
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