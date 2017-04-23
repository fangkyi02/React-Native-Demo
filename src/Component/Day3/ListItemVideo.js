/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import ListItem from './ListItem';
import Video from 'react-native-video';


export default class ListItemVideo extends Component {
  constructor(props){
    super(props)
    this.state = {
      initVideo:false,
      videoPlay:false
    }
    setTimeout(()=>{
      this.setState({
        initVideo:true
      })
    },500)
  }
  // 播放按钮被按下
  _playDwon = () =>{
    this.setState({
      play:!this.state.play
    })
  }

  // 初始化视频
  initRenderVideo = () =>{
    if (this.state.initVideo) {
      return (
        <Video
         style={{width:150,height:100}}
         source={{uri:'http://111.1.16.204/youku/6976B5B0F154772058AA65E7E/030008010058F44A0A04C004DC943F1F74695B-9F40-8A99-D626-C635BCD41A9D.mp4?sid=0492924455939870cf875_00&sign=32f8e278fc570ed9c618bf1adc78956f&ctype=87'}}   // Can be a URL or a local file.                                  // Store reference
         rate={1.0}                              // 0 is paused, 1 is normal.
         volume={1.0}                            // 0 is muted, 1 is normal.
         muted={false}                           // Mutes the audio entirely.
         paused={this.state.play}                          // Pauses playback entirely.
         resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
         onProgress={this._onProgress}
         onLoad={this._onLoad}
         />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListItem/>
        <View style={[styles.textView,{width:150,height:100}]}>
          <TouchableOpacity onPress={this._playDwon} style={{width:150,height:100}}>
             {this.initRenderVideo()}
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
    marginTop:20,
  },
  textView:{
    borderColor:'black',
    borderRadius:5,
    borderWidth:1,
    marginLeft:20,
    alignItems:'center',
    justifyContent:'center',
  },
});
