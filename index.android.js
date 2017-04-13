/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Flex from './src/Pager/Day1/Flex';

export default class Demo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Flex></Flex>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Demo', () => Demo);
