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
    // var a = @observable(0);
    // var a = observable(0);
    // @observable a = 0;
    this.a = observable(0);
  }

  _onDowm = () =>{
    console.warn(1);
  }
  //
  // autorun(()=>
  //   console.warn(a.get);
  // )

  render() {
    return (
      <View style={styles.container}>
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
