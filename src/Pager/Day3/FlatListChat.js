/* @flow */

/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import ChatStore from '../../Component/Day3/ChatStore';
import ListItemText from '../../Component/Day3/ListItemText';
import ListItemImg from '../../Component/Day3/ListItemImg';
import ListItemUrl from '../../Component/Day3/ListItemUrl';
import ListItemVideo from '../../Component/Day3/ListItemVideo';
import Video from 'react-native-video';

const {width,height} = Dimensions.get('window');

@observer
export default class FlatListChat extends Component {

  @observable
  footValue = new Animated.Value(50)

  constructor(props){
    super(props)
    this.ChatStore = ChatStore;
    this.data = {
      text:'',
      choose:['文本','图片','url','视频']
    }
    this.imgData = [
      require('../../assets/1.jpg'),
      require('../../assets/2.jpg'),
      require('../../assets/3.jpg'),
      require('../../assets/4.jpg')
    ]
  }

  // 初始化文本item
  _initItemText = (data) =>{
    return (
      <ListItemText text={data}/>
    )
  }

  // 初始化Image
  _initItemImg = (data) =>{
    return (
      <ListItemImg img={data}/>
    )
  }

  // 初始化url组件
  _initItemUrl = (data) =>{
    return (
      <ListItemUrl url={data}/>
    )
  }

  // 初始化video组件
  _initItemVideo = () =>{
    return (
      <ListItemVideo />
    )
  }
  // list刷新
  _renderItem = ({item}) =>{
    switch (item.type) {
      case 0:
        return this._initItemText(item.text)
        break;
      case 1:
        return this._initItemImg(item.img)
        break;
      case 2:
        return this._initItemUrl(item.url)
        break;
      case 3:
        return this._initItemVideo()
        break;
      default:
    }
  }

  // 键盘确认键按下
  _onSubmitEditing = () =>{
    if (this.data.text !=null && this.data.text.length>0) {
      this.ChatStore.addElement({
        text:this.data.text,
        type:0,
      });
      this._list.scrollToEnd({animated: false});
      // this.forceUpdate();
    }
  }

  // 底部加号按钮被按下
  _footDown = () =>{

    if (this.footValue._value == -10) {
      Animated.timing(this.footValue,{
        toValue:50,
        duration:200
      }).start();
    }else {
      Animated.timing(this.footValue,{
        toValue:-10,
        duration:200
      }).start();
    }

  }

  // 底部选择按钮被按下
  _footChooseDown = (i) =>{
    switch (i) {
      case 0:
        this._list.scrollToEnd({animated: false});
        return this.ChatStore.addElement({type:0,text:'只是为了测试'});
        break;
      case 1:
        this._list.scrollToEnd({animated: false});
        return this.ChatStore.addElement({type:1,img:this.imgData[Math.round(Math.random()*3)]})
        break;
      case 2:
        this._list.scrollToEnd({animated: false});
        return this.ChatStore.addElement({type:2,url:'http://www.baidu.com'})
      case 3:
        this._list.scrollToEnd({animated: false});
        return this.ChatStore.addElement({type:3,});
        break;
      default:
    }

  }
  // 初始化底部选择界面
  _Choose = () =>{
    return this.data.choose.map((el,i)=>{
      return (
        <TouchableOpacity style={styles.chooseView} onPress={this._footChooseDown.bind(this,i)}>
          <Text>
            {el}
          </Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>

        {/* <Video
         style={{backgroundColor:'red',flex:1,}}
         source={{uri:'http://111.1.16.204/youku/6976B5B0F154772058AA65E7E/030008010058F44A0A04C004DC943F1F74695B-9F40-8A99-D626-C635BCD41A9D.mp4?sid=0492924455939870cf875_00&sign=32f8e278fc570ed9c618bf1adc78956f&ctype=87'}}   // Can be a URL or a local file.                                  // Store reference
         rate={1.0}                              // 0 is paused, 1 is normal.
         volume={1.0}                            // 0 is muted, 1 is normal.
         muted={false}                           // Mutes the audio entirely.
         paused={true}                          // Pauses playback entirely.
         resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
         /> */}
        {/* list数据 */}
        <View style={styles.list}>
          <FlatList
            ref={(e)=>{this._list=e}}
            data={this.ChatStore.storeData}
            renderItem={this._renderItem}/>
        </View>


        {/* 底部视图 */}
        <Animated.View
          style={[styles.foot,{
            transform:[{
              translateY:this.footValue
            }]
          }]}>
          {/* 底部编辑框栏主视图 */}
          <View style={styles.footMain}>
            <TextInput
              style={styles.footInput}
              onSubmitEditing={this._onSubmitEditing}
              onChangeText={(e)=>{this.data.text=e}}
              placeholder='请输入你想发送的内容'/>
            <TouchableOpacity
              style={styles.footText}
              onPress={this._footDown}>
              <Text>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {/* 多样化选择界面 */}
          <View style={styles.choose}>
            {this._Choose()}
          </View>

        </Animated.View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list:{
    height:height-120,
  },
  foot:{
    flex:1,
    width,
    height:120,
  },
  footMain:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  footInput:{
    width:width-60
  },
  footText:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:20,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  choose:{
    flexDirection:'row'
  },
  chooseView:{
    width:50,height:50,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    borderWidth:1,
    borderColor:'black'
  }
});
