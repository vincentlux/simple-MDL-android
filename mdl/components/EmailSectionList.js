import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableHighlight, FlatList, Color } from 'react-native';

class EmailSectionList extends Component {


    _renderItem = ({item}) => {
      return (
        <View style={styles.container}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.date}</Text>
        </View>
      )};

    render() {
      console.log('emailsectionlist')
      console.log(this.props.ResultScreen.state.emailJson)
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
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: Color.separatorColor
    },

    text:{
        padding:10,
        fontSize:14,
    
      },
    title:{
        padding:10,
        fontSize:20,
        fontWeight: 'bold'
      }

})

export default EmailSectionList;