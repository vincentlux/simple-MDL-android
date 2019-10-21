/* This is the home screen for searching 
 * (displays a search bar and a voice button on the screen top)
 */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

import VoiceButton from '../components/VoiceButton';

class HomeScreen extends Component {
  /* configure header */
  static navigationOptions = {
    header: null,
  };
  state = {
    search: '',
    fileName: '',
    emailJson: '',
    sectionListReady: false,
  };

  componentDidMount() {
    console.log('home screen did mount');

    /* reset solr at the start */
    const query = {query: 'reset'};
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        'https://mdl.unc.edu/api/reset_solr',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(query),
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _keyboardDidHide() {
    console.log('keyboard hidden');
  }

  updateSearchText = search => {
    this.setState({search: search});
    console.log('updated the text');
  };

  /* if update search being called, pass param to ResultScreen */
  updateSearch = search => {
    // this.setState({ search:search },()=>this.getEmail());
    this.setState({search: search}, () =>
      this.props.navigation.navigate('Result', {
        search: this.state.search,
        fileName: this.state.fileName,
      }),
    );
    console.log('time to search!');
  };

//  getEmail = () => {
//    console.log(this.state.search);
//    console.log(this.state.fileName);
//    /* call simple here to search */
//    const query = {query: this.state.search};
//    RNFetchBlob.config({
//      trusty: true,
//    })
//      .fetch(
//        'POST',
//        'https://mdl.unc.edu/api/simple_rn',
//        {
//          'Content-Type': 'application/json',
//        },
//        JSON.stringify(query),
//      )
//      .then(r => r.json())
//      .then(r => {
//        const emailForSection = r.reduce((r, s) => {
//          r.push({
//            title: s.subject,
//            data: [s.date, 'From:', s.from, 'To:', s.to, s.content],
//          });
//          return r;
//        }, []);
//		/* update emailJson and sectionListReady here*/
//        this.setState({emailJson: emailForSection}, () =>
//          this.setState({sectionListReady: true}),
//        );
//        console.log(this.state.sectionListReady);
//      })
//      .catch(err => {
//        console.log(err);
//      });
//  };

  handleEditComplete = () => {
    console.log('submitted');
    if (this.state.search == '') { /* default search */
      console.log('empty');
      this.setState({search: "?LAST 3 EMAIL 'Michael'"}, () =>
        this.updateSearch(this.state.search),
      );
    } else { /* custom search */
      console.log(this.state.search);
      this.updateSearch(this.state.search);
    }
  };


  render() {
    const {navigation} = this.props;
    const fileName = navigation.getParam('fileName', 'Enron Dataset');
    const success = navigation.getParam('success', false);
    this.state.fileName = fileName;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.box}>
          <SearchBar
            platform="android"
            // inputStyle={{backgroundColor: 'white',borderWidth: 0, borderRadius: 10}}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              borderRadius: 3,
              justifyContent: 'center',
            }}
            // leftIconContainerStyle={{shadowColor: 'white', backgroundColor: 'white',borderWidth: 0, borderRadius: 10}}
            // rightIconContainerStyle={{shadowColor: 'white', backgroundColor: 'black',borderWidth: 0, borderRadius: 0}}
            containerStyle={{
              backgroundColor: '#1b89f7',
              borderWidth: 0,
              borderRadius: 0,
            }}
            placeholder='Say "Last 3 email Michael"'
            onChangeText={this.updateSearchText}
            // lightTheme
            // clearIcon = {{type: 'material-community', color: 'black', name: 'share'}}
            cancelIcon={true}
            clearIcon={false}
            searchIcon={true}
            value={this.state.search}
            returnKeyType="search"
            onSubmitEditing={this.handleEditComplete}
          />
          <View style={styles.behind}>
            <VoiceButton HomeScreen={this} />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/images/m.png')}></Image>
            <Text style={styles.logoText}>MDL Search</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flex: 2,
    flexDirection: 'column',
    // backgroundColor: '#F5FCFF',
  },
  container: {
    height: 260,

    // backgroundColor: '#F5FCFF',
  },
  behind: {
    position: 'absolute',
    // left: 200,
    alignItems: 'flex-end',
    top: 20,
    width: '100%',
    height: '100%',
  },
  confirmButton: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    color: '#673AB7',
  },
  image: {
    tintColor: '#d9d7d7',
  },
  imageContainer: {
    // width: '100%',
    // height: '100%',
    // flex: 2,
    // justifyContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // top: '50%',
    height: '80%',
  },
  logoText: {
    fontSize: 32,
    color: '#d9d7d7',
  },
});

export default HomeScreen;
