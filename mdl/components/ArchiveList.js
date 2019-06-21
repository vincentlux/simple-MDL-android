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



    render() {        
        const {archive} = this.props;
        return (
          <TouchableHighlight>
            <View>
              <View>
                <Text>{archive.title}</Text>
                <Button
                title="Apply"
                /////////////////////NEED TO ALSO FETCH PUT NAME INTO LIST!! 
                // onPress={a function here}
                onPress={this.applyArchive}
                />

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
      fontSize: 16,
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