/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {observable,autorun} from 'mobx';
import {observer} from 'mobx-react/native';

@observer
export default class MobxView extends Component {
  constructor(props){
    super(props);
    a = observable(0);
    console.warn(a.get());
  }

  _onDowm = () =>{
    a ++;
    console.warn(a);
  }
  //
  autorun = () =>{
    console.warn(1);
  }

  render() {
    console.warn('更新');
    return (
      <View style={styles.container}>
        <Text style={styles.textView} onPress={this._onDowm.bind(this)}>124125</Text>
        <Text style={styles.textView} onPress={this._onDowm.bind(this)}>{this.a}</Text>
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
  textView:{
    fontSize:20
  }
});
