/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UploadArchive from './components/UploadArchive';

import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';

// type Props = {};
// export default class App extends Component<Props> {
export default class App extends React.Component {

  state = {
      file: undefined,
      txt: undefined
  };

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    }, err => console.log(err));
  }

  uploadText = () =>{
    console.log('uploading')

    RNFetchBlob.config({
      trusty : true
    })
    .fetch('POST', 'https://mdl.unc.edu/api/upload_file_rn', {
      'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'name', data : 'user'},
      // element with property `filename` will be transformed into `file` in form data
      { name : 'file', filename: this.state.fileName, type:'text/*', data: RNFetchBlob.wrap(this.state.txt)},
    ]).then((resp) => {
      console.log('uploaded')
      console.log(resp)
    }).catch((err) => {
      console.log(err)
    })

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
          file: response,
          txt: response.uri,
          fileName: response.path.replace(/\//g, '_')
        });
        console.log('hey',this.state.file)
        console.log(this.state.file.path.replace(/\//g, '_'))
        console.log('txt?',this.state.txt)
        
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.selectFileTapped.bind(this)}>
              <Text style={styles.text}>Choose file...</Text>
        </TouchableOpacity>
        {/*<Text style={styles.fileInfo}>{JSON.stringify(this.state.file)}</Text>*/}
        {/*<FetchLocation onGetLocation={this.getUserLocationHandler} />*/}
        <UploadArchive onUploadArchive={this.uploadText}/>
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
  text: {
    color: '#fff',
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
