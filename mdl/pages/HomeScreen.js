import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, TouchableHighlight, Keyboard, TextInput} from 'react-native';
import { SearchBar } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

import VoiceButton from '../components/VoiceButton';
import EmailSectionList from '../components/EmailSectionList';
import ConfirmButton from '../components/ConfirmButton';



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

    componentDidMount(){
        console.log('home screen did mount')

        // reset solr at the start
        const query = {'query': 'reset'}
        RNFetchBlob.config({
            trusty : true
        })
        .fetch('POST', 'https://mdl.unc.edu/api/reset_solr', {
            'Content-Type' : 'application/json',
        }, JSON.stringify(query)).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        // add keyboard listener
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this),
        );

    }

    _keyboardDidHide() {
        console.log('keyboard hidden')
        // time to trigger 'confirm button'
        if(this.state.search==''){
            this.setState({search: "?LAST 3 EMAIL 'Michael'"})
        }
        console.log(this.state.search)
        this.updateSearch(this.state.search)
      }

    updateSearchText = search => {
        // only update text instead of triggering search automatically
        // this.getEmail should be triggered by ConfirmButton
        this.setState({ search:search });
        console.log('updated the text')
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
                    {/* <Text>{fileName}</Text>*/}
                    
                    {/* <Text style={styles.title}> Simple MDL Search </Text>*/}
                

                    <SearchBar
                    platform='android'
                    // inputStyle={{backgroundColor: 'white',borderWidth: 0, borderRadius: 10}}
                    inputContainerStyle={{backgroundColor: 'white',borderWidth: 0, borderRadius: 3, justifyContent:'center'}}
                    // leftIconContainerStyle={{shadowColor: 'white', backgroundColor: 'white',borderWidth: 0, borderRadius: 10}}
                    // rightIconContainerStyle={{shadowColor: 'white', backgroundColor: 'black',borderWidth: 0, borderRadius: 0}}
                    containerStyle={{backgroundColor: '#1b89f7', borderWidth: 0, borderRadius: 0}}
                    placeholder='Say "Last 3 email Michael"'
                    onChangeText={this.updateSearchText}
                    // lightTheme
                    // clearIcon = {{type: 'material-community', color: 'black', name: 'share'}}
                    cancelIcon={false}
                    clearIcon={false}
                    searchIcon={true}
                    value={this.state.search}
                    />
                    <View style={styles.behind}>
                        <VoiceButton HomeScreen={this}/>
                    </View>

                    {/* 
                    <View style={styles.confirmButton}>
                    <ConfirmButton HomeScreen={this}/>
                    </View>
                    */}

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
        height: 260,

        // backgroundColor: '#F5FCFF',
    },
    behind:{
        position: 'absolute',
        // left: 200,
        alignItems: 'flex-end',
        top: 20,
        width: '100%',
        height: '100%'
    },
    confirmButton:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
  
  