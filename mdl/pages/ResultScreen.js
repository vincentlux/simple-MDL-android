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
		dataset: 'enron',
		index: 'enron',
		pageSize: '5',
		pageNumber: '1',
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
    /* call aws api here to search */
		const api_base_url = 'https://as8vcs0ct3.execute-api.us-east-1.amazonaws.com/v1/search?';
		const query = 'query=' + encodeURIComponent(this.state.search);
		const dataset_uri_comp = '&dataset=' + this.state.dataset;
		const index_uri_comp = '&index=' + this.state.index;
		const size_uri_comp = '&size=' + this.state.pageSize;
		const page_uri_comp = '&page=' + this.state.pageNumber;
		const query_url = api_base_url + query + dataset_uri_comp + index_uri_comp + size_uri_comp + page_uri_comp;
		
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
//				console.log(r.results[0].from);
//				r.results.uid = Math.random().toString();
				const resp = r.results;
//				const emailForSection = {...resp, uid:Math.random().toString()};
//				const emailForSection = r.results;
//				const emailForSection = r.results.push(...r.results, {uid:Math.random().toString()});
        const emailForSection = resp.reduce((resp, s) => {
          // r.push({title: s.subject, data: [s.date, 'From:',s.from, 'To:', s.to, s.content]});
          resp.push({
            subject: s.subject,
            datetime: s.datetime.substring(0, s.datetime.indexOf('T')), 
						from: s.from,
						to: s.to,
						body: s.body,
						attachment: s.attachment,
						bucket: s.bucket,
						uid: Math.random().toString(),
          });
          return resp;
        }, []);
				console.log(emailForSection);
        /* update emailJson, sectionListReady, and numEmail here*/
        this.setState({emailJson: emailForSection}, () =>
          this.setState({
            sectionListReady: true,
            numEmail: r.total,
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
