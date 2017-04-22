/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import TextAlign from '../../Component/Day1/TextAlign';
import ViewAlign from '../../Component/Day1/ViewAlign';
import TabView from '../../Component/Day1/TabView';


class FlexView extends Component {

  constructor(props){
    super(props);
    this.data = [
      {text:'文本居中',onDown:'文本排列'},
      {text:'视图居中',onDown:'视图排列'},
      {text:'Tab控件',onDown:'Tab控件'},
    ]
  }

  _onDowm = (i) => {
    this.props.navigation.navigate(i);
  }

  _initRender = () =>{
    return this.data.map((el,i)=>{
      return (
        <View style={{marginTop:20}}>
          <TouchableOpacity onPress={this._onDowm.bind(this,el.onDown)}>
            <Text style={styles.textView}>{el.text}</Text>
          </TouchableOpacity>
        </View>
      );
    })
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
    alignItems:'center'
  },
  textView:{
    fontSize:16
  }
});

export default FlexRouter = StackNavigator({
  'Flex布局视图':{
    screen:FlexView
  },
  '文本排列':{
    screen:TextAlign
  },
  '视图排列':{
    screen:ViewAlign
  },
  'Tab控件':{
    screen:TabView
  }},
  {
    initialRouteName:'Flex布局视图',
    headerMode:'none',
  });
