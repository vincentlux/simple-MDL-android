/*This screen displays the email result lists returned by the search*/
import React, {Component} from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import EmailSectionList from '../components/EmailSectionList';

class ResultScreen extends Component {
  /* configure header */
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
      headerTitle: (
        <View style={styles.content}>
          <Text adjustsFontSizeToFit numberOfLines={3} style={styles.htitle}>
            ``{navigation.getParam('search')}``
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={4} style={styles.stitle}>
            {navigation.getParam('headerNumEmail')}
          </Text>
        </View>
      ),
    };
  };
  state = {
    search: '',
    fileName: '',
    emailJson: '',
    numEmail: 0,
    sectionListReady: false,
    error: false,
    headerNumEmail: 'searching...',
  };

  componentDidMount() {
    console.log('result screen did mount');
    console.log(this.state.search);
    const {navigation} = this.props;
    const search = navigation.getParam('search', '');
    const fileName = navigation.getParam('fileName', 'Enron Dataset');
    console.log(search);
    this.props.navigation.setParams({headerNumEmail: 'searching...'});
    /* update the 'search' in object state with the 'search' in props.navigation; run getEmail() to update other states*/
    this.setState({search: search}, () => this.getEmail());

    // this.props.navigation.setParams({ numEmail: this.state.numEmail });
    console.log(this.state.emailJson.length);
  }

  getEmail = () => {
    console.log(this.state.search);
    /* call simple here to search */
		const query = 'query=' + encodeURIComponent(this.state.search);
		const api_url = 'https://as8vcs0ct3.execute-api.us-east-1.amazonaws.com/v1/search?';
		const index_uri_comp = '&index=enron';
		const query_url = api_url + query + index_uri_comp;
		
		console.log(query_url);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
				query_url,
			)
      .then(r => r.json())
      .then(r => {
				console.log(r);
				console.log(r.results[0].from);
        const emailForSection = r.reduce((r, s) => {
          // r.push({title: s.subject, data: [s.date, 'From:',s.from, 'To:', s.to, s.content]});
          r.push({
            title: s.results.subject,
            datetime: s.results.datetime, 
            data: ['From:', s.results.from, 'To:', s.results.to, 'Body:', s.results.content, 'Attachment:', s.results.attachment],
          });
          return r;
        }, []);
        /* update emailJson, sectionListReady, and numEmail here*/
        this.setState({emailJson: emailForSection}, () =>
          this.setState({
            sectionListReady: true,
            numEmail: emailForSection.length,
          }),
        );
        console.log(this.state.sectionListReady);
        console.log(this.state.numEmail);
      })
      .then(r => {
        this.props.navigation.setParams({
          headerNumEmail: this.state.numEmail.toString() + ' emails found.',
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({error: true});
        this.props.navigation.setParams({numEmail: 0, headerNumEmail: 'Error'});
//				this.props.navigation.setParams({numEmail: 0, headerNumEmail: err});
      });
  };

  _renderSectionList = () => {
    if (this.state.sectionListReady) {
      // change to email sectionlist
      console.log('show!');
      console.log(this.state.emailJson.length);
      return <EmailSectionList ResultScreen={this} />;
    } else {
      if (!this.state.error) {
				/* if search works normally bur takes long time, display a spinner (activityIndicator)*/
        return (
          <View style={styles.loadingView}>
            <ActivityIndicator animating={true} size="large" color="#d9d7d7" />
          </View>
        );
      }
    }
  };
  render() {
    /* get query from HomeScreen */
//    const {navigation} = this.props;
//    const search = navigation.getParam('search', '');
//    const fileName = navigation.getParam('fileName', 'Enron Dataset');
 //   console.log('resultScreen', search);
    /* render email list*/
	return <View>{this._renderSectionList()}</View>;
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  htitle: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 0.039 * width,
  },
  stitle: {
    textAlign: 'center',
    fontSize: 0.03 * width,
  },
  content: {
    flex: 1,
  },
  loadingView: {
    // flex: 1,
    // flexDirection: 'row',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
});

export default ResultScreen;
