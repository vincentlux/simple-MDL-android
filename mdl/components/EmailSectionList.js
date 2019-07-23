import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableHighlight } from 'react-native';

class EmailSectionList extends Component {


    render() {
      console.log('emailsectionlist')

        return(
            <View>
            {/*<Text>{JSON.stringify(this.props.HomeScreen.state.emailJson)}</Text>*/}
            <SectionList
                renderItem={({item, index, section}) => <Text style={styles.text} key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.title}>{title}</Text>
                  )}
                sections={this.props.ResultScreen.state.emailJson}
                keyExtractor={(item, index) => item + index}
            />
            
            </View>

    
        )}

}

const styles = StyleSheet.create({
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