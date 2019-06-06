/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PixelRatio, TouchableOpacity} from 'react-native';
import FetchLocation from './components/FetchLocation';

import FilePickerManager from 'react-native-file-picker';

// type Props = {};
// export default class App extends Component<Props> {
export default class App extends React.Component {

  state = {
      file: undefined
  };

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    }, err => console.log(err));
  }

  selectFileTapped = () => {
    const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...'
    };

    FilePickerManager.showFilePicker(options, (response) =>{
      console.log('Response=', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          file: response
        });
        console.log('hey',this.state.file)
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.selectFileTapped.bind(this)}>
              <Text>Choose file...</Text>
            </TouchableOpacity>
          <Text style={styles.fileInfo}>{JSON.stringify(this.state.file)}</Text>
    
        <FetchLocation onGetLocation={this.getUserLocationHandler} />

        <Text style={styles.welcome}>Welcome React Native!!!</Text>
        <Text style={styles.instructions}>To get start, edit App.js!</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
	margin: 5,
	padding: 5
  },
  fileInfo: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
	margin: 5,
	padding: 5
  },
});
