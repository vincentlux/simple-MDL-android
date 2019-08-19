import React, { Component } from 'react';
import { StyleSheet,Button, FlatList, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


class ArchiveList extends Component {
    state = {

    };
    
  
    applyArchive = () =>{
        const {archive} = this.props;
        console.log(archive)
        console.log('should rn fetch put here? or set')

        // Hardcode
        if (archive.title === 'Archive') {
          const real_title = 'Enron Dataset'
          RNFetchBlob.config({
            trusty : true
          })
          .fetch('PUT', `https://mdl.unc.edu/api/file_list/${real_title}`)
          .then((res) => {
            console.log('put succeed!')
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
          
        console.log(archive.title)
        this.props.navigation.navigate('Home', {
            fileName: real_title,
            success: true,
          })
        } else {
          console.log(archive.title)
          this.props.navigation.navigate('Home', {
            fileName: 'Inbox',
            success: true,
          })
        }


    }

    // deleteArchive = () =>{
    //     const {archive} = this.props;
    //     console.log(archive)
    //     RNFetchBlob.config({
    //         trusty : true
    //       })
    //       .fetch('PUT', `https://mdl.unc.edu/api/delete_file/${archive.title}`)
    //       .then((res) => {
    //         console.log('delete succeed!')
    //         console.log(res)
    //       }).then(()=>{
    //         this.props.UploadScreen.loadArchiveList()
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    // }

    // _renderDeleteButton = () =>{
    //     const {archive} = this.props;
    //     // ensure demo not deleted
    //     if (archive.title != 'Enron Dataset'){
    //         return (
    //             <Button
    //             title="Delete"
    //             // color='#dd1e18'
    //             color='#f4a609'
    //             onPress={this.deleteArchive}
    //             />
    //         );
    //     }
    //     else{
    //         return null;
    //     }
    // }

    render() {        
        const {archive} = this.props;
        return (
            <View>
              <View style={styles.container}>
                <Text style={styles.title} >{archive.title}</Text>
                <TouchableOpacity 
                onPress={this.applyArchive}
                style={styles.button}>
                  <Text>Select</Text>
                </TouchableOpacity>
              {/*{this._renderDeleteButton()} */}
              </View>
            </View>
        )
      }
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      padding: 15,
      alignContent: 'stretch',
      borderBottomWidth: 1,
      // borderColor: '#bac6d9',
      borderColor: '#e8e9eb',
    },
    button: {
      backgroundColor: '#DDDDDD',
      padding: 15,
      borderRadius:5,

    },
    title: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333333',
      textAlign: 'left',
      // justifyContent: 'space-around'
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