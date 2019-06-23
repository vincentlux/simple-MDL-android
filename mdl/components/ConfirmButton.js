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
        // call api to convert speech query to mdl query
        const query = {'query': this.props.HomeScreen.state.search}
        this.props.HomeScreen.getEmail()
        // this.props.HomeScreen.updateSearch
        // RNFetchBlob.config({
        //   trusty : true
        // })
        // .fetch('POST', 'https://mdl.unc.edu/api/speech_regex', {
        //   'Content-Type' : 'application/json',
        // }, JSON.stringify(query)).then((res) => {
        //   // set mdlQuery
        //   this.setState({
        //     mdlQuery: res.json().res_query
        //   }, ()=>this.props.HomeScreen.updateSearch(this.state.mdlQuery)) // update to homescreen

        // }).catch((err) => {
        //   console.log(err)
        // })

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