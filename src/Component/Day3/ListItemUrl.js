/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking
} from 'react-native';

import ListItem from './ListItem';

export default class ListItemUrl extends Component {

  // url被按下
  _urlDwon = () =>{
    Linking.canOpenURL(this.props.url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + this.props.url);
    } else {
      return Linking.openURL(this.props.url);
    }
    }).catch(err => console.error('An error occurred', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <ListItem/>
        <View style={[styles.textView,{width:this.props.url.length*18<150?this.props.url.length*18:150}]}>
          <TouchableOpacity onPress={this._urlDwon}>
            <Text style={styles.textStyle}>
              {this.props.url}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    marginLeft:10,
    marginTop:20,
  },
  textView:{
    marginLeft:20,
    alignItems:'center',
    justifyContent:'center',
  },
  textStyle:{
    color:'blue',
    fontSize:18,
    textDecorationLine:'underline'
  }
});
