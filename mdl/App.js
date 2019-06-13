/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PixelRatio, TouchableOpacity, TouchableHighlight, Image} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UploadArchive from './components/UploadArchive';
import VoiceButton from './components/VoiceButton';


export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <UploadArchive/>
        <VoiceButton/>

      </View>
    );
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
  text: {
    color: '#fff',
    fontSize: 20,
  },
  test: {
    color: '#0b45a3',
    fontSize: 20,
  },
  button: {
    // borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    backgroundColor: '#8543e8',
    margin: 10,
    padding: 10
  },
  fileInfo: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
	margin: 5,
	padding: 5
  },
});
