import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight, Dimensions} from 'react-native';



class DetailScreen extends Component {
    componentDidMount(){
        console.log('detail screen')
    }
    render() {
        return (
            <View>
                <Text>hello to detail screen</Text>
            </View>
        );

    }

}

export default DetailScreen;