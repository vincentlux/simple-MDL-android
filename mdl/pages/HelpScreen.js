import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { WebView } from 'react-native-webview';
// import {WebView} from 'react-native';


class HelpScreen extends React.Component {
    static navigationOptions = { header: null,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/images/help.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
    render() {
      return (
          <WebView
           source={{ uri: 'https://mdl.unc.edu' }}
           originWhitelist={['https://*', 'git://*']}
           javaScriptEnabled={true}
           domStorageEnabled={true} 
           startInLoadingState={false}
           />
      );
    }
  }


const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
},
title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
},
icon: {
  width: 30,
  height: 26,
},
});
  
export default HelpScreen;