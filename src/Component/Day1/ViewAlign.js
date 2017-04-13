/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ViewAlign extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'red',height:20,width:54}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
});
