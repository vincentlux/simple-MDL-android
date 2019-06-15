import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableHighlight } from 'react-native';


class EmailSectionList extends Component {


    render() {
        return(
            <View style={{flex:1}}>
            {/*<Text>{JSON.stringify(this.props.HomeScreen.state.emailJson)}</Text>*/}
            
            <SectionList
                renderItem={({item, index, section}) => <Text style={styles.text} key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.title}>{title}</Text>
                  )}
                sections={this.props.HomeScreen.state.emailJson}
                keyExtractor={(item, index) => item + index}
            />
            
            </View>

    
        )}

}

const styles = StyleSheet.create({
    text:{
        padding:10,
        fontSize:16,
    
      },
    title:{
        padding:10,
        fontSize:24,
        fontWeight: 'bold'
      }

})

export default EmailSectionList;