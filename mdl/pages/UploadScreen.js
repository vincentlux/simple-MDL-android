import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import UploadArchive from '../components/UploadArchive';
import ArchiveList from '../components/ArchiveList';

class UploadScreen extends Component {
    static navigationOptions = { header: null, 
      tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/images/upload.png')}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        )
      };

    constructor(props) {
      super(props);
      this.state = {
        fileList: [],
      };
    }
    componentDidMount() {
      console.log('did mount')
      console.log(this.state.fileList)
      this.loadArchiveList();
    }
    // componentDidUpdate() {
    //   console.log('did update')
    // }
    _renderItem = (item) => {
      console.log('render item')
      console.log(item)
      return (
        <ArchiveList archive={item.item} navigation={this.props.navigation}/>
      )
    };


    render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.fileList}
            renderItem={this._renderItem}
            // may have bug here 
            keyExtractor={(item, index) => index.toString()}
          /> 
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

    loadArchiveList() {
        console.log('load list here')
        RNFetchBlob.config({
          trusty : true
        })
        .fetch('GET', 'https://mdl.unc.edu/api/file_list', {
          'Content-Type' : 'application/json',
        })
        .then((resp) => resp.json())
        .then((json) => {
          console.log('get file list')
          console.log(json)
          console.log(json.books) 

          this.setState({fileList: json.books})
          console.log(this.state.fileList)

        }).catch((err) => {
          console.log(err)
        })
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
    icon: {
        width: 30,
        height: 20,
      },
  });

export default UploadScreen;
  

