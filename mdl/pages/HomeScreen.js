import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';

import VoiceButton from '../components/VoiceButton';
import ConfirmButton from '../components/ConfirmButton';
import CancelButton from '../components/CancelButton';

class HomeScreen extends React.Component {
    static navigationOptions = { header: null };
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search:search });
        console.log(this.state.search)
        // console.log(this.refs.VoiceButton.state.speechRes)

    };

    render() {
        const { navigation } = this.props;
        const fileName = navigation.getParam('fileName', 'Enron Dataset');
        const success = navigation.getParam('success', false);
    
    
        return (
            <View style={styles.box}>
                <View style={styles.container}>
                    <Text>file: {JSON.stringify(fileName)}</Text>
                    <Text>success: {JSON.stringify(success)}</Text>
                    <Text style={styles.title}> Simple-MDL Search </Text>
                </View>

                <View>
                <SearchBar
                platform='android'
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                placeholder='Try "Last 1 email Michael"'
                onChangeText={this.updateSearch}
                lightTheme
                value={this.state.search}
                />
                </View>

                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    
                  }}>

                  <View style={{ }}>
                  <CancelButton/>
                  </View>
                  <View style={{ }}>
                  <VoiceButton HomeScreen={this}/>
                  </View>
                  <View style={{ }}>
                    <ConfirmButton/>
                    </View>

                </View>
    
            </View>
        );
        }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        // backgroundColor: '#F5FCFF',
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: '#673AB7'
    },
});

export default HomeScreen;
  
  