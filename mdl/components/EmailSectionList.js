import React, { Component } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableHighlight } from 'react-native';


class EmailSectionList extends Component {


    render() {
        return(
            <View style={{flex: 2, marginTop: 30}}>
            {/*<Text>{JSON.stringify(this.props.HomeScreen.state.emailJson)}</Text>*/}
            
            <SectionList
                renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                  )}
                sections={this.props.HomeScreen.state.emailJson}
                keyExtractor={(item, index) => item + index}
            />
            
            </View>

    
        )}

}

export default EmailSectionList;