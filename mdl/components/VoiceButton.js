import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

import Voice from 'react-native-voice';
import RNFetchBlob from 'rn-fetch-blob';

class VoiceButton extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    speechRes: '',
    mdlQuery: ''
  };



constructor(props) {
    super(props);
    // speechRes: 'lol';
    // a = props.onUpdateSearch;
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
    // console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    // console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    // set speechRes here and send to HomeScreeen box
    // console.log('onSpeechResults: ', e);
    // console.log(e.value[0])
    this.setState({
      results: e.value,
      speechRes: e.value[0],
    });
    // query -> mdl query -> back to HomeScreen 
    this.queryToMDL()
  };

  queryToMDL= () => {
    // call api to convert speech query to mdl query
    const query = {'query': this.state.speechRes}
    RNFetchBlob.config({
      trusty : true
    })
    .fetch('POST', 'https://mdl.unc.edu/api/speech_regex', {
      'Content-Type' : 'application/json',
    }, JSON.stringify(query)).then((res) => {
      // set mdlQuery
      this.setState({
        mdlQuery: res.json().res_query
      }, ()=>this.props.HomeScreen.updateSearch(this.state.mdlQuery)) // update to homescreen

    }).catch((err) => {
      console.log(err)
    })
  }
  


  onSpeechPartialResults = e => {
    // console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    // console.log('onSpeechVolumeChanged: ', e);
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
      console.log('stopped')
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
      <View>
        {/*<Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
    <Text style={styles.stat}>Results</Text>

        {this.state.results.map((result, index) => {
            if(index==0)
                return (
                    <Text key={`result-${index}`} style={styles.stat}>
                    {result}
                    </Text>
                );
        })}*/}

        {/*<Text style={styles.stat}>{`End: ${this.state.end}`}</Text>*/}
        <TouchableOpacity onPress={this._startRecognizing} underlayColor='rgba(227, 227, 227, 1)'>
          <Image style={styles.button} source={require('../assets/images/large.png')} />
        </TouchableOpacity>
        {/*<TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>*/}
      </View>
    );
  }
};



const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    //#673AB7
  },
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
});

export default VoiceButton;
