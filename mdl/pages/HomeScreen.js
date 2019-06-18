import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

import VoiceButton from '../components/VoiceButton';
import EmailSectionList from '../components/EmailSectionList';
// import ConfirmButton from '../components/ConfirmButton';
// import CancelButton from '../components/CancelButton';


class HomeScreen extends Component {
    static navigationOptions = { 
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/images/m.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          ), 
    };
    state = {
        search: '',
        fileName: '',
        emailJson: '',
        sectionListReady: false,
    };

    // idea: if update search being called, trigger api post email immediately
    updateSearch = search => {
        this.setState({ search:search },()=>this.getEmail());
        console.log('time to search!')
    };

    getEmail = () =>{
        console.log(this.state.search)
        console.log(this.state.fileName)
        // call simple here to search
        const query = {'query': this.state.search}
        RNFetchBlob.config({
          trusty : true
        })
        .fetch('POST', 'https://mdl.unc.edu/api/simple_rn', {
          'Content-Type' : 'application/json',
        }, JSON.stringify(query)).then((r) => r.json())
        .then(r => {
            const emailForSection = r.reduce((r,s) =>{
                r.push({title: s.subject, data: [s.date, 'From:',s.from, 'To:', s.to, s.content]});
                return r;
            }, []);
            this.setState({emailJson: emailForSection}, ()=>this.setState({sectionListReady: true}))
            console.log(this.state.sectionListReady)
        })
        .catch((err) => {
          console.log(err)
        })
    }


    _renderSectionList = () =>{
        if(this.state.sectionListReady){
            // change to email sectionlist
            return <EmailSectionList HomeScreen={this}/>;
        }
        else{
            return null;
        }

    }
    
    render() {
        const { navigation } = this.props;
        const fileName = navigation.getParam('fileName', 'Enron Dataset');
        const success = navigation.getParam('success', false);
        this.state.fileName = fileName;
    
    
        return (
            <View style={styles.box}>
                <View style={styles.container}>
                    <Text>{fileName}</Text>
                    <Text style={styles.title}> Simple-MDL Search </Text>
                

                    <SearchBar
                    platform='android'
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                    placeholder='Say "Last 1 email Michael"'
                    onChangeText={this.updateSearch}
                    lightTheme
                    clearIcon={false}
                    searchIcon={false}
                    value={this.state.search}
                    />
                    <View style={styles.behind}>
                        <VoiceButton HomeScreen={this}/>
                    </View>
                    
                </View>

                <View style={styles.content}> 
                    {this._renderSectionList()}
                </View>
            
                

            </View>
        );
        }
}
const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection:'column',
        // backgroundColor: '#F5FCFF',
    },
    container: {
        height: 220,

        // backgroundColor: '#F5FCFF',
    },
    behind:{
        position: 'absolute',
        // left: 200,
        alignItems: 'flex-end',
        top: 155,
        width: '100%',
        height: '100%'
    },
    content:{
        flex:1,
      },
    title: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#673AB7'
    },
    icon: {
        width: 30,
        height: 26,
      },
});

export default HomeScreen;
  
  