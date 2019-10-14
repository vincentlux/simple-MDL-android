import React, { Component } from 'react';
import { StyleSheet,Button, FlatList, Text, View, Image, TouchableHighlight } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


class ArchiveList extends Component {
    state = {

    };
    
  
    applyArchive = () =>{
        const {archive} = this.props;
        console.log(archive)
        console.log('should rn fetch put here? or set')
        RNFetchBlob.config({
            trusty : true
          })
          .fetch('PUT', `https://mdl.unc.edu/api/file_list/${archive.title}`)
          .then((res) => {
            console.log('put succeed!')
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })

        this.props.navigation.navigate('MDL', {
            fileName: archive.title,
            success: true,
          })
    }

    deleteArchive = () =>{
        const {archive} = this.props;
        console.log(archive)
        RNFetchBlob.config({
            trusty : true
          })
          .fetch('PUT', `https://mdl.unc.edu/api/delete_file/${archive.title}`)
          .then((res) => {
            console.log('delete succeed!')
            console.log(res)
          }).then(()=>{
            this.props.UploadScreen.loadArchiveList()
          })
          .catch((err) => {
            console.log(err)
          })

    }

    _renderDeleteButton = () =>{
        const {archive} = this.props;
        // ensure demo not deleted
        if (archive.title != 'Enron Dataset'){
            return (
                <Button
                title="Delete"
                // color='#dd1e18'
                color='#f4a609'
                onPress={this.deleteArchive}
                />
            );
        }
        else{
            return null;
        }

    }

    render() {        
        const {archive} = this.props;
        return (
          <TouchableHighlight>
            <View>
              <View>
                <Text style={styles.title} >{archive.title}</Text>
                <Button
                title="Apply"
                onPress={this.applyArchive}
                />
                {this._renderDeleteButton()}
              </View>
            </View>
          </TouchableHighlight>
        )
      }
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10,
      borderBottomWidth: 1,
    },
    thumbnail: {
      width: 110,
      height: 150,
      backgroundColor: '#f0f0f0',
    },
    rightContainer: {
      flex: 1,
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333333',
      textAlign: 'left',
    },
    year: {
      textAlign: 'left',
      color: '#777777',
      marginTop: 10,
    },
    horizontalView: {
      flexDirection: 'row',
      marginTop: 10
    },
    titleTag: {
      color: '#666666',
    },
    score: {
      color: '#ff8800',
      fontWeight: 'bold',
    },
    name: {
      color: '#333333',
      flex: 1
    },
  });
  
export default ArchiveList;
