import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import VoiceButton from '../components/VoiceButton';

class HomeScreen extends React.Component {
    static navigationOptions = { header: null };
    render() {
      const { navigation } = this.props;
      const fileName = navigation.getParam('fileName', 'Enron Dataset');
      const success = navigation.getParam('success', false);
  
  
      return (
        <View style={styles.container}>
          <Text>Home Screen</Text>
          <Text>file: {JSON.stringify(fileName)}</Text>
          <Text>success: {JSON.stringify(success)}</Text>
          <Text style={styles.title}> Simple-MDL Search </Text>
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
        // backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default HomeScreen;
  
  