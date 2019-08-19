import React, {Component} from 'react';
import {ScrollView, Platform, StyleSheet, Text, View, Button,Image, TouchableOpacity, TouchableHighlight} from 'react-native';

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
        <ScrollView>
        <Text style={styles.body}>
        ?ON "Soccer"{"\n"}
        => All emails containing "soccer" at either header or subject{"\n\n"}
        ?ON "Soccer" full{"\n"}
        => Same as ?ON "Soccer"{"\n\n"}
        ?ON "Soccer" subject{"\n"}
         => All emails containing "soccer" only at subject{"\n\n"}
        ?"mike"{"\n"}
         => All emails from Mike{"\n\n"}
        ?'Mike' 'Drake' 'Jim'{"\n"}
         => All emails from Mike, Drake, or Jim{"\n\n"}
        ?LAST{"\n"}
         => Latest one email{"\n\n"}
        ?LAST 1{"\n"}
         => Latest one email{"\n\n"}
        ?LAST 1 month EMAIL 'Drake'{"\n"}
         => Email in last month from Drake{"\n\n"}
        ?LAST EMAIL 'Drake' 'Jim'{"\n"}
         => Latest email from either Drake or Jim{"\n\n"}
        ?LAST 1 EMAIL 'Drake'{"\n"}
         => Latest email from Drake{"\n\n"}
        ?DATE '06-20-2000'{"\n"}
         => All emails on date June 20th, 2000{"\n\n"}
        ?DATE FROM '06-20-2000' TO '06-21-2000'{"\n"}
         => All emails between June 20th-21st, 2000{"\n\n"}
        ?TOTAL{"\n"}
         => All emails{"\n\n"}
        ?'Mike' ON 'Soccer' MSWORD LAST{"\n"}
         => Latest email from Mike with soccer at header and MSWORD appeared in the email{"\n\n"}
        </Text>
        </ScrollView>
        
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