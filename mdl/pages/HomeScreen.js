import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';

import VoiceButton from '../components/VoiceButton';


class HomeScreen extends React.Component {
    static navigationOptions = { header: null };
    state = {
        search: 'sddd',
    };

    componentWillMount() {
        console.log('component will mount')
    };

    updateSearch = search => {
        this.setState({ search:search });
        console.log(this.state.search)
        console.log(this.refs.VoiceButton.state.speechRes)

    };

    componentDidMount() {

          
    }


    render() {
        const { navigation } = this.props;
        const fileName = navigation.getParam('fileName', 'Enron Dataset');
        const success = navigation.getParam('success', false);
    
    
        return (
            <View style={styles.box}>
                <View style={styles.container}>
                <Text>Home Screen</Text>
                <Text>file: {JSON.stringify(fileName)}</Text>
                <Text>success: {JSON.stringify(success)}</Text>
                <Text style={styles.title}> Simple-MDL Search </Text>
                </View>

                <View>
                <SearchBar
                platform='android'
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                placeholder='Try "Last email Michael"'
                onChangeText={this.updateSearch}
                lightTheme
                value={this.state.search}
                />
                </View>

            <VoiceButton ref='VoiceButton'/>
    
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
    box: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default HomeScreen;
  
  