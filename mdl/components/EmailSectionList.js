import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableHighlight, FlatList, Color } from 'react-native';

class EmailSectionList extends Component {

    _renderItem = ({item}) => {
      return (
        <TouchableHighlight onPress={() => this.props.ResultScreen.props.navigation.navigate('Detail', {item: item})}>
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            {/*add from and to here*/}
            <Text style={styles.text}>{item.date}</Text>
        </View>
        </TouchableHighlight>
      )};

    render() {
      console.log('emailsectionlist')
        return(
            <View>
            {/*<Text>{JSON.stringify(this.props.HomeScreen.state.emailJson)}</Text>*/}

            <FlatList
            data={this.props.ResultScreen.state.emailJson}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id.toString()}
            />
            </View>   
        )}

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#bac6d9',
    },

    text:{
        padding:10,
        fontSize:12,
    
      },
    title:{
        padding:10,
        fontSize:15,
        fontWeight: 'bold',
        color: 'black',
      }

})

export default EmailSectionList;