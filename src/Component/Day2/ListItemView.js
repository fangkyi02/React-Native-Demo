/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ListItemData from './ListItemData';
import {observer} from 'mobx-react/native';
import {observable,autorun,computed,action,observe} from 'mobx';

@observer
export default class ListItemView extends Component {

  constructor(props){
    super(props)
    this.itemViewData = this.props.itemData;//这边进行一个浅拷贝 然后修改这边以后 数组那边的值也会同步修改
    // 默认跟随this.props.data.itemData.selectAll
    this.itemViewData.isSelect = this.props.data.itemData.selectAll;
    // 监听itemData中的selectAll变化
    const disposer = observe(this.props.data.itemData,'selectAll',(change) => {
      this.itemViewData.isSelect = change.newValue;
    });
  }

  // 选择按钮被按下
  @action
  _onPress = () =>{

    this.itemViewData.isSelect = !this.itemViewData.isSelect;
    if (this.itemViewData.isSelect) {
      // 添加数值
      this.itemViewData.itemTotalAmount = this.itemViewData.money * this.itemViewData.SelectNumber;
      this.props.data.increase(this.itemViewData.itemTotalAmount);
    }else {
      // 减少数值
      this.itemViewData.itemTotalAmount = this.itemViewData.money * this.itemViewData.SelectNumber;
      this.props.data.reduce(this.itemViewData.itemTotalAmount);
    }

  }

  // 减号被按下
  @action
  _reduce = () =>{

    if (this.itemViewData.SelectNumber -1 >0) {
      this.itemViewData.SelectNumber-=1;
      if (this.itemViewData.isSelect) {
        this.props.data.reduce(this.itemViewData.money);
      }
    }
  }

  // 加号被按下
  @action
  _increase = () =>{

    this.itemViewData.SelectNumber+=1;
    if (this.itemViewData.isSelect) {
      this.props.data.increase(this.itemViewData.money);
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{flexDirection:'row'}}>

          {/* 左边的单选按钮 */}
         <TouchableOpacity
           style={this.itemViewData.isSelect?styles.radioButtonShow:styles.radioButtonHide}
           onPress={this._onPress}>
         </TouchableOpacity>

         {/* 金额大小 */}
         <View style={{marginLeft:20}}>
           <Text>
             金额{this.itemViewData.money}
           </Text>
         </View>

           {/* 减号 */}
           <View style={styles.textView}>
             <TouchableOpacity onPress={this._reduce}>
               <Text style={styles.textStyle}>
                 -
               </Text>
             </TouchableOpacity>
           </View>

           {/* 被选中项 */}
           <View style={{marginLeft:20}}>
             <Text>
               {this.itemViewData.SelectNumber}
             </Text>
           </View>


           {/* 加号 */}
           <View style={styles.textView}>
             <TouchableOpacity onPress={this._increase}>
               <Text style={styles.textStyle}>
                 +
               </Text>
             </TouchableOpacity>
           </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:150,
    justifyContent:'center',
    alignContent:'center',
  },
  radioButtonShow:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor:'red'
  },
  radioButtonHide:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'rgb(147,147,147)'
  },
  textView:{
    borderWidth:1,
    marginLeft:20,
    borderColor:'black',
    height:50,
    width:50,
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle:{
    fontSize:19,
  }

});
