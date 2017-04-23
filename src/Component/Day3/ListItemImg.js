/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder,
  TouchableHighlight
} from 'react-native';

import ListItem from './ListItem';
import {observable} from 'mobx';
import {observer} from 'mobx-react/native'
import ChatStore from './ChatStore';


const {width,height} = Dimensions.get('window');

@observer
export default class ListItemImg extends Component {

  @observable
  modalVisible = false

  // 图片被点击
  _imgDown = () =>{
    this.modalVisible = !this.modalVisible
  }

  // 初始化图片
  _imgRender = () =>{
    return ChatStore.getImgData().map((el,i)=>{
      return (
        <TouchableHighlight style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this._modalDown}>
          <Image source={el.img} style={{width,height:200}}/>
        </TouchableHighlight>
      )
    });
  }

  // modal被按下
  _modalDown = () =>{
    this.modalVisible = !this.modalVisible
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modal}
          transparent={true}
          visible={this.modalVisible}>
            <View style={styles.modalView}>
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true}>
                  {this._imgRender()}
                </ScrollView>
              </View>


        </Modal>

        <ListItem/>

        <View style={styles.imgView}>
          <TouchableOpacity onPress={this._imgDown}>
            <Image source={this.props.img} style={{width:100,height:100}}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    marginLeft:10,
    marginTop:20
  },
  imgView:{
    marginLeft:15
  },
  modal:{
    backgroundColor:'red'
  },
  modalView:{
    flex:1,
    backgroundColor:'black',
  },
  scrollView:{
    width,
    height:200
  }
});
