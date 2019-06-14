import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import UploadArchive from '../components/UploadArchive';


class UploadScreen extends React.Component {
    static navigationOptions = { header: null, 
        tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/images/upload.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          )
    
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text>Details Screen</Text>
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
  

