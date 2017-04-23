/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import ListItem from './ListItem';

export default class ListItemText extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ListItem/>
        <View style={[styles.textView,{width:this.props.text.length*18<150?this.props.text.length*18:150}]}>
          <Text style={styles.textStyle}>
            {this.props.text}
          </Text>
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
    borderColor:'rgba(147,147,147,0.6)',
    borderRadius:5,
    borderWidth:1,
    marginLeft:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
  },
  textStyle:{
    color:'black',
    fontSize:18
  }
});
