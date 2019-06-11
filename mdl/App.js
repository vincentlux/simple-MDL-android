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

import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Voice from 'react-native-voice';


// type Props = {};
// export default class App extends Component<Props> {
export default class App extends React.Component {

  state = {
      file: undefined,
      txt: undefined,
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
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
        console.log('User cancelled file picker');
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
          fileName: response.path.replace(/\//g, '_') // convert all / to _
        });
        console.log('hey',this.state.file)
        console.log(this.state.file.path.replace(/\//g, '_'))
        console.log('txt?',this.state.txt)
        
      }
    });
  }





  constructor(props) {
      super(props);
      Voice.onSpeechStart = this.onSpeechStart;
      Voice.onSpeechRecognized = this.onSpeechRecognized;
      Voice.onSpeechEnd = this.onSpeechEnd;
      Voice.onSpeechError = this.onSpeechError;
      Voice.onSpeechResults = this.onSpeechResults;
      Voice.onSpeechPartialResults = this.onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }
  
    componentWillUnmount() {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  
    onSpeechStart = e => {
      // eslint-disable-next-line
      console.log('onSpeechStart: ', e);
      console.log('what?')
      this.setState({
        started: '√',
      });
    };
  
    onSpeechRecognized = e => {
      // eslint-disable-next-line
      console.log('onSpeechRecognized: ', e);
      this.setState({
        recognized: '√',
      });
    };
  
    onSpeechEnd = e => {
      // eslint-disable-next-line
      console.log('onSpeechEnd: ', e);
      this.setState({
        end: '√',
      });
    };
  
    onSpeechError = e => {
      // eslint-disable-next-line
      console.log('onSpeechError: ', e);
      this.setState({
        error: JSON.stringify(e.error),
      });
    };
  
    onSpeechResults = e => {
      // eslint-disable-next-line
      console.log('onSpeechResults: ', e);
      this.setState({
        results: e.value,
      });
    };
  
    onSpeechPartialResults = e => {
      // eslint-disable-next-line
      console.log('onSpeechPartialResults: ', e);
      this.setState({
        partialResults: e.value,
      });
    };
  
    onSpeechVolumeChanged = e => {
      // eslint-disable-next-line
      console.log('onSpeechVolumeChanged: ', e);
      this.setState({
        pitch: e.value,
      });
    };
  
    _startRecognizing = async () => {
      this.setState({
        recognized: '',
        pitch: '',
        error: '',
        started: '',
        results: [],
        partialResults: [],
        end: '',
      });
  
      try {
        await Voice.start('en-US', {
          "RECOGNIZER_ENGINE": "GOOGLE",
          "EXTRA_PARTIAL_RESULTS": true
        });
        // await Voice.start('zh-CN');
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    };
  
    _stopRecognizing = async () => {
      try {
        await Voice.stop();
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    };
  
    _cancelRecognizing = async () => {
      try {
        await Voice.cancel();
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    };
  
    _destroyRecognizer = async () => {
      try {
        await Voice.destroy();
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
      this.setState({
        recognized: '',
        pitch: '',
        error: '',
        started: '',
        results: [],
        partialResults: [],
        end: '',
      });
    };
  

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.selectFileTapped.bind(this)}>
              <Text style={styles.text}>Choose file...</Text>
        </TouchableOpacity>
        {/*<Text style={styles.fileInfo}>{JSON.stringify(this.state.file)}</Text>*/}
        {/*<FetchLocation onGetLocation={this.getUserLocationHandler} />*/}
        <UploadArchive onUploadArchive={this.uploadText}/>



        <Text style={styles.welcome}>Welcome to React Native Voice</Text>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.voicebutton} source={require('./button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  voicebutton: {
    width: 50,
    height: 50,
  },
});
