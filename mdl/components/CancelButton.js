import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class CancelButton extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <View>
                <TouchableHighlight underlayColor='rgba(227, 227, 227, 1)'>
	                <Image style={styles.button} source={require('../assets/images/refresh.png')} />
                </TouchableHighlight>

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

export default CancelButton;
