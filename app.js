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
  View,
  TouchableOpacity
} from 'react-native';

import FlexView from './src/Pager/Day1/Flex';
import MobxView from './src/Pager/Day2/Mobx';

import {StackNavigator} from 'react-navigation';

export default class DemoView extends Component {
  constructor(props){
    super(props);
    this.data = [
      {text:'Flex视图',onDown:'Flex视图'},
      {text:'Mobx视图',onDown:'Mobx视图'},
    ]
  }
  _initRender = () =>{
    return this.data.map((el,i)=>{
      return (
        <View style={{marginTop:30}}>
          <TouchableOpacity onPress={this._onDowm.bind(this,el.onDown)}>
              <Text style={styles.itemViewText}>{el.text}</Text>
          </TouchableOpacity>
        </View>
      );
    })
  }

  _onDowm = (i) =>{
    this.props.navigation.navigate(i);
  }
  render() {
    return (
      <View style={styles.container}>
        {this._initRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  itemViewText:{
    fontSize:18,
  }
});

const Demo = StackNavigator({
  DemoView:{
    screen:DemoView
  },
  'Flex视图':{
    screen:FlexView
  },
  'Mobx视图':{
    screen:MobxView
  }},
  {
    initialRouteName:'DemoView',
    headerMode:'none'
  })

AppRegistry.registerComponent('Demo', () => Demo);
