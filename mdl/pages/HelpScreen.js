import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import { WebView } from 'react-native-webview';
// import {WebView} from 'react-native';


class HelpScreen extends React.Component {
    static navigationOptions = { header: null,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/images/help.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
    render() {
      return (
        <Text style={styles.body}>?ON "Soccer" => All emails containing "soccer" at either header or subject{"\n\n"}
        ?ON "Soccer" full => Same as ?ON "Soccer"{"\n\n"}
        ?ON "Soccer" subject => All emails containing "soccer" only at subject{"\n\n"}
        ?"mike" => All emails from Mike{"\n\n"}
        ?'Mike' 'Drake' 'Jim' => All emails from Mike, Drake, or Jim{"\n\n"}
        ?LAST => Latest one email{"\n\n"}
        ?LAST 1 => Latest one email{"\n\n"}
        ?LAST 1 month EMAIL 'Drake' => Email in last month from Drake{"\n\n"}
        ?LAST EMAIL 'Drake' 'Jim' => Latest email from either Drake or Jim{"\n\n"}
        ?LAST 1 EMAIL 'Drake' => Latest email from Drake{"\n\n"}
        ?TOTAL => All emails{"\n\n"}
        ?'Mike' ON 'Soccer' MSWORD LAST => Latest email from Mike with soccer at header and MSWORD appeared in the email{"\n\n"}
        </Text>
        
      );
    }
  }



  //           <WebView
  // source={{ uri: 'https://mdl.unc.edu' }}
  // originWhitelist={['https://*', 'git://*']}
  // javaScriptEnabled={true}
  // domStorageEnabled={true} 
  // startInLoadingState={false}
  // />

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
},
title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
},
body: {
  color: 'black',
},
icon: {
  width: 30,
  height: 26,
},
});
  
export default HelpScreen;
