/* This screen displays the detailed content of email after clicking on one of the email search results
 */
import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

class DetailScreen extends Component {
  /* configure header */
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
      headerTitle: (
        <View style={styles.content}>
          <Text adjustsFontSizeToFit numberOfLines={3} style={styles.htitle}>
            {navigation.getParam('item').subject}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={4} style={styles.stitle}>
            {navigation.getParam('item').datetime}
          </Text>
        </View>
      ),
    };
  };
  componentDidMount() {
    console.log('detail screen');
  }
  render() {
    const item = this.props.navigation.getParam('item');
		console.log(item);
//		return(
//			<ScrollView style={styles.container}>
//			</ScrollView>
//		)
    /* renders the details of the selected email */
    const email = {
			from: 'From: ', /* "from" keyword */
      fromAddr: item.from,
      to: 'to: ', /* "to" keyword */
      toAddr: item.to,
      contentAndClosing: item.body, /* include main content, sign-off, and probably original emails in replying emails */
    };
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>{email.from}</Text>
        <Text style={styles.text}>{email.fromAddr}</Text>
        <Text style={styles.text}>{email.to}</Text>
        <Text style={styles.text}>{email.toAddr}</Text>
        <Text style={styles.body}>{email.contentAndClosing}</Text>
      </ScrollView>
    );
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    //   justifyContent: 'flex-start',
    padding: 10,
  },
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
  text: {
    padding: 5,
    fontSize: 15,
    color: 'black',
  },
  body: {
    padding: 8,
    fontSize: 20,
    color: 'black',
  },
  title: {
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DetailScreen;
