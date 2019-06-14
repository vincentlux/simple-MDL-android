import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import { SearchBar } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

import VoiceButton from '../components/VoiceButton';
import EmailSectionList from '../components/EmailSectionList';
// import ConfirmButton from '../components/ConfirmButton';
// import CancelButton from '../components/CancelButton';


class HomeScreen extends React.Component {
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

    // getEmail = () =>{
    //     console.log(this.state.search)
    //     console.log(this.state.fileName)
    //     // call simple here to search
    //     const query = {'query': this.state.search}
    //     RNFetchBlob.config({
    //       trusty : true
    //     })
    //     .fetch('POST', 'https://mdl.unc.edu/api/simple_rn', {
    //       'Content-Type' : 'application/json',
    //     }, JSON.stringify(query)).then((res) => {
    //     //   console.log(res.json())
        
    //       this.setState({
    //         emailJson:res.json() 
    //       }, ()=>this.setState({sectionListReady: true})) // set ready here? => let SectionList fetch all res through props
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // }

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
                    <Text>file: {JSON.stringify(fileName)}</Text>
                    <Text>success: {JSON.stringify(success)}</Text>
                    <Text style={styles.title}> Simple-MDL Search </Text>
                </View>

                <View>
                <SearchBar
                platform='android'
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                placeholder='Say "Last 1 email Michael"'
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

                  <View>
                    <VoiceButton HomeScreen={this}/>
                  </View>

                </View>
            
                {this._renderSectionList()}

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
  
  