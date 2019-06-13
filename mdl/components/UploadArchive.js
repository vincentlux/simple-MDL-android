import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, TouchableOpacity, PixelRatio } from 'react-native';

import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob';

class UploadArchive extends Component {
    state = {
        showFileName: false,
        file: undefined,
        txt: undefined,
    };
  
    // getUserLocationHandler = () => {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     console.log(position);
    //   }, err => console.log(err));
    // }
  
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
          console.log('FilePickerManager Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.setState({
            file: response,
            txt: response.uri,
            fileName: response.path.replace(/\//g, '_'), // convert all / to _
            showFileName: !this.state.showFileName
          });
          console.log('hey',this.state.file)
          console.log(this.state.file.path.replace(/\//g, '_'))
          console.log('txt?',this.state.txt)
        }
      });
    }

    _renderFileName = () => {
      console.log(this.state.showFileName)
      if (this.state.showFileName) {
        console.log('omg')
        return (
                <View>
                    <Text style={styles.textBlack}>{this.state.file.path}</Text>
                </View>
        );
      } else {
        return null;
      }
    }



    render() {
        return (
          <View style={styles.container}>
            {this._renderFileName()}
            <TouchableOpacity style={styles.button} onPress={this.selectFileTapped.bind(this)}>
                  <Text style={styles.text}>Choose file..</Text>
            </TouchableOpacity>
            {/*<Text style={styles.fileInfo}>{JSON.stringify(this.state.file)}</Text>*/}
            {/*<FetchLocation onGetLocation={this.getUserLocationHandler} />*/}
            <TouchableOpacity style={styles.button} onPress={this.uploadText}>
                <Text style={styles.text} >Upload!</Text>
            </TouchableOpacity>
    
          </View>
        );
      }

};





// const uploadArchive = props => {
//     return (
//         // <Button title="Upload" onPress={props.onGetLocation} />
//         <TouchableOpacity style={styles.button} onPress={props.onUploadArchive}>
//             <Text style={styles.text}  >Upload!</Text>
//         </TouchableOpacity>
//     );

// };



const styles = StyleSheet.create({
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
      text: {
        color: '#fff',
        fontSize: 20,
      },
      textBlack: {
        color: '#000000',
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

export default UploadArchive;