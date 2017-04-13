/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const {width} = Dimensions.get('window');

export default class TabView extends Component {
  constructor(props){
    super(props);
    this.data = [
      {text:'首页'},
      {text:'附近'},
      {text:'好友'},
      {text:'我的'},
      {text:'内容'},
    ];
    this.state = {
      id:0
    }
  }

// item如果只有text的话
// 在item居中那边不使用view也可以
// 但是如果你想实现一个具有icon的图标的话
// 还是建议写在一起 然后通过外部的view实现整体居中

  _itemDown = (i) =>{
    this.setState({
      id:i
    });
  }
  _initRender = () =>{
    return this.data.map((el,i)=>{
      return (
        // 单个的item控件
        <View style={styles.itemView}>
          {/* item主体内容 */}
            <View>
              <TouchableOpacity onPress={this._itemDown.bind(this,i)}>
                <Text style={this.state.id==i?styles.itemTextFocus:styles.itemTextNoFocus}>{el.text}</Text>
              </TouchableOpacity>

            </View>
        </View>
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* tab容器自身 */}
        <View style={styles.tabView}>
          {/* tab内容部分 */}
          <View style={styles.tabMainView}>
            {/* tabItem主体 */}
            {this._initRender()}
          </View>
          {/* tab滑动视图 用来处理tab按下以后的滑动 */}
          <View style={styles.slide}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView:{
    height:50,
  },
  tabMainView:{
    height:50-3,
    flexDirection:'row',
  },
  slide:{
    height:5,
    width:width/5,
    backgroundColor:'red'
  },
  itemView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  itemMainView:{
    flex:1,
  },
  itemTextFocus:{
    color:'red',
    fontSize:20
  },
  itemTextNoFocus:{
    color:'black',
    fontSize:16
  }
});
