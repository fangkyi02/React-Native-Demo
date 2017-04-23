/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class ListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* 圆形头像 */}
          <Image source={require('../../assets/icon.jpeg')} style={styles.img}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:50,height:50,
    justifyContent:'center',
    alignItems:'center',
  },
  img:{
    borderRadius:25,
    borderColor:'black',
    borderWidth:1,
    width:50,height:50
  }
});
