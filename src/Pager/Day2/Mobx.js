/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated
} from 'react-native';

import {ListItemData,Test} from '../../Component/Day2/ListItemData';
import ListItemView from '../../Component/Day2/ListItemView';
import {observer} from 'mobx-react/native';
import {action,autorun} from 'mobx';

const viewabilityConfig = {
  minimumViewTime: 0,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

@observer
export default class MobxListView extends Component {
  constructor(props){
    super(props);
    this.data = new ListItemData();
  }

  _renderItem = ({item,index}) =>{
    return (
      <ListItemView itemData={item} id={index} data={this.data}/>
    );
  }

  @action
  _onPress = (i) =>{
    this.data.itemData.TotalAmount = 0;
    this.data.toggerSelectAll();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._onPress}>
          全选
        </Text>

        {/* 总金额 */}
        <Text>
          {this.data.itemData.TotalAmount}
        </Text>

        <FlatList
          // viewabilityConfig={viewabilityConfig}
          data={this.data.itemData.itemMoney}
          renderItem={this._renderItem}
          debug={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
});
