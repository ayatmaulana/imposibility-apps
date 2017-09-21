import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  ListView,
  RefreshControl
} from 'react-native';
import { Container, Header ,Content ,Button, Text, Form, Picker, Item, Label, Input, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import Spinner from 'react-native-spinkit'

import { connect } from 'react-redux'

import LoadScreen from './LoadScreen'

import { get } from '../services/fetchService'

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
    
    constructor(props)
    {
        super(props)
        var ds =  new ListView.DataSource(
            { rowHasChanged: (r1,r2) => r1 !== r2 }
        )

        this.state = {
            dataSource: ds.cloneWithRows( [ 2,4 ] )
        }
    }

    componentDidUpdate()
    {
        var ds =  new ListView.DataSource(
            { rowHasChanged: (r1,r2) => r1 !== r2 }
        )
       
        this.setState({
            dataSource: ds.cloneWithRows( [ ...this.props.stateLocal.result] )
        })
    }

    componentWillUnmount()
    {
        this.props.destroyResult()
    }

    render()
    {
        if(this.props.stateLocal.result.length == 0)
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
                            {/* <List
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
                                    
                                </List> */}

                                <ListView 
                                    dataSource={ this.state.dataSource }
                                    renderRow={(rowData, i) => {
                                        return (
                                            <ListItem key={i} >
                                                <Text style={{fontSize: 20}}>{rowData}</Text>
                                            </ListItem>
                                        )
                                    }}
                                    onEndReached={() => {
                                        console.log('reached')
                                        let {baseName, o, k} = this.props.stateLocal.inputForm

                                        get(baseName, o, k).then(v => {
                                            this.props.updateResult( v.data.data )
                                        }).catch(e => console.log(e))
                                    }}
                                    onEndReachedThreshold={0.5}
                                    refreshControl={
                                    <RefreshControl
                                        refreshing={ false }
                                        onRefresh={ () => console.log('refreshed') }
                                    />
                                    }
                                />

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
});

const mapStateToProps = (state) => ({
    stateLocal: state
})

const mapDispatchToProps = (dispatch) => ({
    destroyResult : () => dispatch({ type: 'DESTROY_RESULT' }),
    addResult: (val) => dispatch({ type: 'ADD_RESULT', payload: val }),
    updateResult: (val) => dispatch({ type: 'UPDATE_RESULT', payload: val })
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
// export default Result