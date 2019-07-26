import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View, Button, Image, ActivityIndicator, TouchableHighlight, Dimensions} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import EmailSectionList from '../components/EmailSectionList';


class ResultScreen extends Component {
    // static navigationOptions = { 
    //     title: 'qq',

    // };
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
            headerTitle: (
                <View style={styles.content}>
                <Text
                adjustsFontSizeToFit
                numberOfLines={3}
                style={styles.htitle}>``{navigation.getParam('search')}``</Text>
                <Text
                adjustsFontSizeToFit
                numberOfLines={4}
                style={styles.stitle}>{navigation.getParam('numEmail')} emails found.</Text>
                </View>
            )
        }
      }
    state = {
        search: '',
        fileName: '',
        emailJson: '',
        numEmail: 0,
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

        // this.props.navigation.setParams({ numEmail: this.state.numEmail });
        console.log(this.state.emailJson.length)
        
    }

    // getEmail = () => {
    //     console.log(this.state.search)
    //     const query = this.state.search
    //     RNFetchBlob.config({
    //       trusty : true
    //     })
    //     .fetch('POST', 'https://mdl.unc.edu/api/simple_rn', {
    //       'Content-Type' : 'application/json',
    //     }, JSON.stringify(query)).then((response) => response.json()).then(json => {
    //         console.log(json);

    //     }).catch((e) => {
    //         console.log(e)
    //         console.log("加载失败");
    //       }).done();
    // }

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
            const emailForSection = r.reduce((r,s) => {
                // r.push({title: s.subject, data: [s.date, 'From:',s.from, 'To:', s.to, s.content]});
                r.push({title: s.subject, id: s.id, date: s.date.substring(0, s.date.indexOf('T')), data:['From:',s.from, 'To:', s.to, s.content]});
                return r;
            }, []);
            this.setState({emailJson: emailForSection}, ()=>this.setState({sectionListReady: true, numEmail: emailForSection.length}))
            console.log(this.state.sectionListReady)
            console.log(this.state.numEmail)
        })
        .then(r => {this.props.navigation.setParams({ numEmail: this.state.numEmail })})
        .catch((err) => {
          console.log(err)
          this.props.navigation.setParams({ numEmail: 0 })
        })
    }


    _renderSectionList = () =>{
        if(this.state.sectionListReady){
            // change to email sectionlist
            // this.props.navigation.navigate('Result')
            console.log('show!')
            console.log(this.state.emailJson.length)
            return <EmailSectionList ResultScreen={this}/>;
        }
        else{
            return (
                <View style={styles.loadingView}>
                  <ActivityIndicator animating={true} size="small"/>
                </View>
              )
          
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
  
  const width = Dimensions.get('window').width
  const styles = StyleSheet.create({
    // title:{
    //     alignSelf:'stretch',
    // },
    
    htitle:{
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 0.039*width,
      },
    stitle:{
        textAlign: 'center',
        fontSize: 0.03*width,
      },
    content:{
        flex:1,
      },
    loadingView: {
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }

  });

  export default ResultScreen;