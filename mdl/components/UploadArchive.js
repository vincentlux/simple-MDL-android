import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, PixelRatio } from 'react-native';

const uploadArchive = props => {
    return (
        // <Button title="Upload" onPress={props.onGetLocation} />
        <TouchableOpacity style={styles.button} onPress={props.onUploadArchive}>
            <Text style={styles.text}  >Upload!</Text>
        </TouchableOpacity>
    );

};

export default uploadArchive;

const styles = StyleSheet.create({
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

  });