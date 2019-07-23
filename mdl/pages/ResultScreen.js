import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import EmailSectionList from '../components/EmailSectionList';


class ResultScreen extends Component {
    state = {
        search: '',
        fileName: '',
        emailJson: '',
        sectionListReady: false,
    };

    componentDidMount(){
        console.log('result screen did mount')
        console.log(this.state.search)
        const { navigation } = this.props;
        const search = navigation.getParam('search', '');
        const fileName = navigation.getParam('fileName', 'Enron Dataset');
        console.log(search)
        this.setState({search: search}, ()=>this.getEmail())
        
    }


    getEmail = () =>{
        console.log(this.state.search)
        // console.log(this.state.fileName)
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
            // this.props.navigation.navigate('Result')
            console.log('show!')
            console.log(this.state.emailJson)
            return <EmailSectionList ResultScreen={this}/>;
        }
        else{
            return null;
        }

    }
    render() {

        // get query from HomeScreen
        const { navigation } = this.props;
        const search = navigation.getParam('search', '');
        const fileName = navigation.getParam('fileName', 'Enron Dataset');
        console.log('resultScreen',search)
        // getEmail




        return (
            <View>
                    {this._renderSectionList()}
            </View>
            


        );
    }

  }
  const styles = StyleSheet.create({
    content:{
        flex:1,
      },

  });

  export default ResultScreen;