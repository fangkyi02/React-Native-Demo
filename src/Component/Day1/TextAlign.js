/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class TextAlign extends Component {
  render() {
    return (
      <View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
        <Text >asdasd</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
