import React, { Component } from 'react';
import { StyleSheet,Button, FlatList, Text, View, Image, TouchableHighlight } from 'react-native';

class ArchiveList extends Component {
    render() {
        const {archive} = this.props;
        console.log(archive)
        
        return (
          <TouchableHighlight>
            <View>
              <View>
                <Text>{archive.title}</Text>
                <Button
                title="Apply"
                /////////////////////NEED TO ALSO FETCH PUT NAME INTO LIST
                onPress={() => this.props.navigation.navigate('MDL', {
                  fileName: archive.title,
                  success: true,
                })}
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