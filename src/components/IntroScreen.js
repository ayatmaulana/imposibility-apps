import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AsyncStorage
  } from 'react-native';
import { Button } from 'native-base'
import AppIntro from 'react-native-app-intro';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class IntroScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props)
    {
        super(props)

    }

    async checkIfInstalled()
    {
        try{
            let isInstalled = await AsyncStorage.getItem('@ayatmaulana:installed')

            if(isInstalled == null)
            {
                this.props.navigation.navigate('Main')
            }
        } catch(e)
        {
            console.log(e)
        }
    }
    
    render() {
    const pageArray = [{
        title: 'Generate Your Domain',
        description: 'Description 1',
        img: require('../assets/img/logo.png'),
        imgStyle: {
          height: 80 * 2.5,
          width: 109 * 2.5,
        },
        backgroundColor: '#fa931d',
        fontColor: '#fff',
        level: 10,
      }, {
        title: 'Page 2',
        description: 'Description 2',
        img: require('../assets/img/logo.png'),
        imgStyle: {
          height: 93 * 2.5,
          width: 103 * 2.5,
        },
        backgroundColor: '#a4b602',
        fontColor: '#fff',
        level: 10,
      }];

    return (
        <AppIntro
            showSkipButton={false}
            onDoneBtnClick={async () => {
                
                try{
                    store = await AsyncStorage.setItem('installed','1')
                    
                    this.props.navigation.navigate('Main')
                } catch(e)
                {
                    console.log(e)
                }
                

                
            }}
            customStyles={{btnContainer: {flex: 1, alignItems: 'flex-end'}}}
        >
            <View style={[styles.slide, { backgroundColor: '#B53167' }]}>
                <View style={ styles.iconWrapper }>
                    <Icon name="rocket" size={150} color="#fff" />
                </View>
                <View 
                    style={ styles.titleWrapper }
                    level={-10}>
                        <Text style={styles.text}>Discover The Miracle</Text>
                </View>
                <View level={15}>
                        <Text style={styles.desc}>find a miracle that will change your life</Text>
                </View>
            </View>


            <View style={[styles.slide, { backgroundColor: '#B53167' }]}>
                <View style={ styles.iconWrapper }>
                    <Icon name="commenting" size={150} color="#fff" />
                </View>
                <View
                    style={ styles.titleWrapper }
                    level={8}>
                        <Text style={styles.text}>Create The Product</Text>
                </View>
                <View level={-15}>
                    <Text style={styles.desc}>create a product with a good name right now !</Text>
                </View>
            </View>

            <View style={[styles.slide,{ backgroundColor: '#B53167' }]}>
                <View>
                    <Icon name="bandcamp" size={150} color="#fff" />
                </View>
                <View 
                    style={ styles.titleWrapper }
                    level={10}>
                        <Text style={styles.text}>Generate Your Domain</Text>
                </View>
                <View level={15} style={{ padding: 5 }} >
                    <Text style={styles.desc}>create your domain now, with domain generator</Text>
                </View>
            </View>
            
        </AppIntro>
    )
  }
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: '#9DD6EB',
      padding: 15,
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    desc: {
        color: '#fff',
        fontSize: 18,
        marginTop: 60,
    },
    titleWrapper: {
        marginTop: 10
    },

    iconWrapper: {
        marginTop: -30
    }
  });
  

