/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import UploadArchive from './components/UploadArchive';
import VoiceButton from './components/VoiceButton';
import { createAppContainer, createBottomTabNavigator } from "react-navigation";

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <UploadArchive/>
//         <VoiceButton/>

//       </View>
//     );
//   }
// }


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



class UploadScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <UploadArchive ref='UploadArchive' />
        <Button
          title="Apply"
          onPress={() => this.props.navigation.navigate('MDL', {
            fileName: this.refs.UploadArchive.state.fileName,
            success: true,
          })}
        />
      </View>
    );
  }
}


class HelpPage extends React.Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        <Text>Help placeholder</Text>
      </View>
    );
  }
}



const RootStack = createBottomTabNavigator({
  MDL: HomeScreen,
  Upload: UploadScreen,
  Help: HelpPage
},
{
  initialRouteName: "MDL"
}
);

const AppContainer = createAppContainer(RootStack);

// initiate as always
export default class App extends React.Component {
  render() {
    return <AppContainer />;
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


