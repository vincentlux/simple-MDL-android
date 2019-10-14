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
  static navigationOptions = ({navigation}) => {
    return {
      headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
      headerTitle: (
        <View style={styles.content}>
          <Text adjustsFontSizeToFit numberOfLines={3} style={styles.htitle}>
            {navigation.getParam('item').title}
          </Text>
          <Text adjustsFontSizeToFit numberOfLines={4} style={styles.stitle}>
            {navigation.getParam('item').date}
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
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>{item.data[0]}</Text>
        <Text style={styles.text}>{item.data[1]}</Text>
        <Text style={styles.text}>{item.data[2]}</Text>
        <Text style={styles.text}>{item.data[3]}</Text>
        <Text style={styles.body}>{item.data[4]}</Text>
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
