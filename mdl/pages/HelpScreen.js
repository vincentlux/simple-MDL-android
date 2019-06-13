import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';

class HelpScreen extends React.Component {
    static navigationOptions = { header: null };
    render() {
      return (
        <View style={styles.container}>
          <Text>Help placeholder</Text>
        </View>
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
});
  
export default HelpScreen;