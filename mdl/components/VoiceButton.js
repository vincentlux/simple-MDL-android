import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import Voice from 'react-native-voice';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from "react-native-modal";


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
    mdlQuery: '',
    modalVisible: false,
  };



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
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
      modalVisible: true,
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
      // modalVisible: false,
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
        mdlQuery: res.json().res_query,
        modalVisible: false,
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

  _renderModal = () => {
    if (this.state.modalVisible) {
      return (
        <View>
          <Modal
          animationIn={'slideInDown'}
          animationOut={'slideOutUp'}
          animationInTiming={300}
          backdropOpacity={Platform.OS === 'android'? 0.5 : 0.7}
          backdropTransitionOutTiming={800}
          useNativeDriver={true}
          isVisible={this.state.modalVisible}>
            <View style={styles.content}>
              <Text style={styles.listening}>Listening...</Text>
              <Text style={styles.text}>{this.state.partialResults}</Text>
            </View>
        </Modal>
        
        
        </View>)

      
    }

  };
  render() {
    return (
      <View>
      {/*<Text style={styles.stat}>{`Pitch: ${this.state.partialResults}`}</Text>*/}

        {/*<Text style={styles.stat}>{`End: ${this.state.end}`}</Text>*/}
        <TouchableOpacity onPress={this._startRecognizing} underlayColor='rgba(227, 227, 227, 1)'>
        <Icon
          name='mic'
          type='material'
          color='grey'
          size={26}
        />
          {/*<Image style={styles.button} source={require('../assets/images/large.png')} />*/}
        </TouchableOpacity>

        {this._renderModal()}
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  listening: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'grey'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    color: 'grey'
  },
});

export default VoiceButton;
