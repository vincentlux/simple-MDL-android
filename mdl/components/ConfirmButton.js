import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

class ConfirmButton extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    sendQuery = () => {
        console.log('Query should be sent here')
        console.log(this.props.HomeScreen.state.search)
        console.log(this.props.HomeScreen.state.fileName)
        // things to do here: 1. choose right collection 2. send mdl query to get data back

    }


    render() {
        return (
            <View>
                <TouchableOpacity underlayColor='rgba(227, 227, 227, 1)' onPress={this.sendQuery}>
                <Image style={styles.button} source={require('../assets/images/check.png')} />
                </TouchableOpacity>

            </View>
        );
        }

};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      text: {
        color: '#fff',
        fontSize: 20,
      },
      textBlack: {
        color: '#000000',
        fontSize: 20,
      },
      button: {
        width: 50,
        height: 50,
        //#673AB7
      },

});

export default ConfirmButton;