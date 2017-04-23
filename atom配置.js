navigator.getCurrentRoutes();
logoReact Native0.43
文档
入门课程hot
案例
博客
视频
讨论
热更新
关于

搜索文档
GitHub
FlatList
在GitHub上修改这篇文档
支持我们
高性能的简单列表组件，支持下面这些常用的功能：

完全跨平台。
支持水平布局模式。
行组件显示或隐藏时可配置回调事件。
支持单独的头部组件。
支持单独的尾部组件。
支持自定义行间分隔线。
支持下拉刷新。
支持上拉加载。
如果需要分组/类/区（section），请使用<SectionList>.

一个简单的例子：

<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
本组件实质是基于<VirtualizedList>组件的封装，因此也有下面这些需要注意的事项：

当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
本组件继承自PureComponent而非通常的Component，这意味着如果其props在浅比较中是相等的，则不会重新渲染。所以请先检查你的renderItem函数所依赖的props数据（包括data属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下js中的基本类型和引用类型。）
为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个keyExtractor函数来生成key。
属性
ItemSeparatorComponent?: ?ReactClass<any>

行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。

ListFooterComponent?: ?ReactClass<any>

尾部组件

ListHeaderComponent?: ?ReactClass<any>

头部组件

columnWrapperStyle?: StyleObj

如果设置了多列布局（即将numColumns值设为大于1的整数），则可以额外指定此样式作用在每行容器上。

data: ?Array<ItemT>

为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如immutable数组，请直接使用更底层的VirtualizedList组件。

getItem?:

getItemCount?:

getItemLayout?: (data: ?Array<ItemT>, index: number) =>
  {length: number, offset: number, index: number}

getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout用起来就既高效又简单，类似下面这样：

getItemLayout={(data, index) => ( {length: 行高, offset: 行高 * index, index} )}
注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中。

horizontal?: ?boolean

设置为true则变为水平布局模式。

keyExtractor: (item: ItemT, index: number) => string

此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。

legacyImplementation?:  ?boolean


设置为true则使用旧的ListView的实现。

numColumns: number

多列布局只能在非水平模式下使用。此时组件内元素会从左到右从上到下按Z字形排列，类似启用了flexWrap的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。

onEndReached?: ?(info: {distanceFromEnd: number}) => void

当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。

onEndReachedThreshold?:  ?number

onRefresh?: ?() => void

如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。同时你需要正确设置refreshing属性。

onViewableItemsChanged?:  ?(info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => void

Called when the viewability of rows changes, as defined by the viewablePercentThreshold prop.

refreshing?: ?boolean

Set this true while waiting for new data from a refresh.

renderItem: (info: {item: ItemT, index: number}) => ?React.Element<any>

根据行数据data渲染每一行的组件。典型用法：

_renderItem = ({item}) => ( <TouchableOpacity onPress={() => this._onPress(item)}> <Text>{item.title}}</Text> </TouchableOpacity> ); ... <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />
除data外还有第二个参数index可供使用。

viewabilityConfig?: ViewabilityConfig

请参考ViewabilityHelper的源码来了解具体的配置类型。

方法
scrollToEnd(params?: object)

滚动到底部。如果不设置getItemLayout属性的话，可能会比较卡。

scrollToIndex(params: object)

Scrolls to the item at a the specified index such that it is positioned in the viewable area such that viewPosition 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle.

May be janky without getItemLayout prop.

scrollToItem(params: object)

Requires linear scan through data - use scrollToIndex instead if possible. May be janky without getItemLayout prop.

scrollToOffset(params: object)

Scroll to a specific content pixel offset, like a normal ScrollView.

recordInteraction()

Tells the list an interaction has occured, which should trigger viewability calculations, e.g. if waitForInteractions is true and the user has not scrolled. This is typically called by taps on items or by navigation actions.

例子
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  Animated,
  FlatList,
  StyleSheet,
  View,
} = ReactNative;

const UIExplorerPage = require('./UIExplorerPage');

const infoLog = require('infoLog');

const {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} = require('./ListExampleShared');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class FlatListExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    debug: false,
    horizontal: false,
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    virtualized: true,
  };

  _onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };

  _onChangeScrollToIndex = (text) => {
    this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)});
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event(
    [{nativeEvent: { contentOffset: { x: this._scrollPos } }}],
    {useNativeDriver: true},
  );
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.text) || filterRegex.test(item.title)
    );
    const filteredData = this.state.data.filter(filter);
    return (
      <UIExplorerPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput
              onChangeText={this._onChangeScrollToIndex}
              placeholder="scrollToIndex..."
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'debug')}
            <Animated.View style={[styles.spindicator, {
              transform: [
                {rotate: this._scrollPos.interpolate({
                  inputRange: [0, 5000],
                  outputRange: ['0deg', '360deg'],
                  extrapolate: 'extend',
                })}
              ]
            }]} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ?
            this._getItemLayout :
            undefined
          }
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          legacyImplementation={false}
          numColumns={1}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          shouldItemUpdate={this._shouldItemUpdate}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </UIExplorerPage>
    );
  }
  _captureRef = (ref) => { this._listRef = ref; };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onRefresh = () => alert('onRefresh: nothing to refresh :P');
  _renderItemComponent = ({item}) => {
    return (
      <ItemComponent
        item={item}
        horizontal={this.state.horizontal}
        fixedHeight={this.state.fixedHeight}
        onPress={this._pressItem}
      />
    );
  };
  _shouldItemUpdate(prev, next) {
    /**
     * Note that this does not check state.horizontal or state.fixedheight
     * because we blow away the whole list by changing the key in those cases.
     * Make sure that you do the same in your code, or incorporate all relevant
     * data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }
  // This is called when items change viewability by scrolling into or out of
  // the viewable area.
  _onViewableItemsChanged = (info: {
      changed: Array<{
        key: string,
        isViewable: boolean,
        item: any,
        index: ?number,
        section?: any,
      }>
    }
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({...v, item: '...'})),
      );
    }
  };
  _pressItem = (key: number) => {
    this._listRef.getNode().recordInteraction();
    pressItem(this, key);
  };
  _listRef: FlatList<*>;
}


const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  spindicator: {
    marginLeft: 'auto',
    width: 2,
    height: 16,
    backgroundColor: 'darkgray',
  },
});

module.exports = FlatListExample;
前一篇：DrawerLayoutAndroid后一篇：Image
听晴明老师从头讲React Native
被顶起来的评论
Robin
Robin
onReachEnd 只会调用一次啊，而且调用的时机不对

4月7日回复顶(2)转发举报
最新最早最热
5条评论
小譁
小譁
FlatList和VirtualizedList
無限列表依然存在內存沒有釋放的問題.....

4月6日回复顶转发举报
Robin
Robin
onReachEnd 只会调用一次啊，而且调用的时机不对

4月7日回复顶(2)转发举报
david
david
回复 Robin: 我也遇到这个问题 请问怎么解决额

4月9日回复顶转发举报
david
david
回复 Robin: onReachEnd 只会调用一次 这个问题怎么解决？

4月9日回复顶转发举报
孙鳌
孙鳌
onReachEnd 确实调用时间不对，从第二次触发开始就不再是到底部才加载了

4月13日回复顶转发举报
社交帐号登录:

微信
微博
QQ
人人
更多»
豆瓣
开心
百度
谷歌


说点什么吧…
发布
ReactNative中文网正在使用多说

入门基础
搭建开发环境
编写Hello World
Props（属性）
State（状态）
样式
高度与宽度
使用Flexbox布局
处理文本输入
如何使用ScrollView
如何使用ListView
网络
其他参考资源
进阶指南
嵌入到现有原生应用
颜色
图片
处理触摸事件
动画
无障碍功能
定时器
直接操作
调试
自动化测试
JavaScript环境
导航器对比
性能
升级
特定平台代码
手势响应系统
社区资源
中文视频教程
js.coach第三方组件库
中文论坛组件分享区
中文论坛问题求助区
使用指南(iOS)
原生模块
原生UI组件
链接原生库
在设备上运行
在模拟器上运行
在原生和React Native间通信
使用指南(Android)
原生模块
原生UI组件
Headless JS（后台任务）
在设备上运行
打包APK
调试Android UI性能
从源代码编译React Native
组件
ActivityIndicator
Button
DatePickerIOS
DrawerLayoutAndroid
FlatList
Image
KeyboardAvoidingView
ListView
ListView.DataSource
Modal
Navigator
NavigatorIOS
Picker
PickerIOS
ProgressBarAndroid
ProgressViewIOS
RefreshControl
ScrollView
SectionList
SegmentedControlIOS
Slider
StatusBar
Switch
TabBarIOS
TabBarIOS.Item
Text
TextInput
ToolbarAndroid
TouchableHighlight
TouchableNativeFeedback
TouchableOpacity
TouchableWithoutFeedback
View
ViewPagerAndroid
VirtualizedList
WebView
API
ActionSheetIOS
AdSupportIOS
Alert
AlertIOS
Animated
AppRegistry
AppState
AsyncStorage
BackAndroid
CameraRoll
Clipboard
DatePickerAndroid
Dimensions
Easing
Geolocation
ImageEditor
ImagePickerIOS
ImageStore
InteractionManager
Keyboard
LayoutAnimation
Linking
NativeMethodsMixin
NetInfo
PanResponder
PermissionsAndroid
PixelRatio
PushNotificationIOS
Share
StyleSheet
Systrace
TimePickerAndroid
ToastAndroid
Vibration
布局样式属性
阴影样式属性
React Native中文网.

© 2017 杭州欧石南网络科技有限公司

浙ICP备15023664号-3

浙公网安备 33010602005511号浙公网安备 33010602005511号
observable
computed
useStrict
autorun
observer
action
Dimensions,
measure,
chilren,
forceUpdate,
AndroidPermissions
StackNavigator
ActivityIndicatorIOS - ReactActivityIndicator
ActivityIndicator - ReactActivityIndicator
DatePickerIOS - ReactDatePicker TODO
DrawerLayoutAndroid - ReactDrawerLayout
Image - ReactImage
ListView - ReactListView
Modal - ReactModal
Navigator - ReactNavigator
PickerIOS ReactPicker
ProgressViewIOS - ReactProgressView
ScrollView - ReactScrollView
SegmentedControlIOS - ReactSegmentedControl
SliderIOS - ReactSlider
Switch - ReactSwitch
SwitchAndroid - ReactSwitch
SwitchIOS - ReactSwitch
RefreshControl - ReactRefreshControl
TabBarIOS - ReactTabBar
Text - ReactText
TextInput - ReactTextInput
ToastAndroid - ReactToast
Touchable - ReactTouchable
TouchableHighlight - ReactTouchableHighlight
TouchableOpacity - ReactTouchableOpacity
TouchableWithoutFeedback - ReactTouchableWithoutFeedback
View - ReactView
ViewPagerAndroid - ReactViewPager

Alert - ReactAlert
AlertIOS - ReactAlert
Animated - ReactAnimated
AppRegistry - ReactAppRegistry
AsyncStorage - ReactAsyncStorage
Dimensions - ReactDimensions
Easing - ReactEasing
InteractionManager - ReactInteractionManager
LayoutAnimation - ReactLayoutAnimation
PanResponder - ReactPanResponder
PixelRatio - ReactPixelRatio
StyleSheet - ReactStyleSheet

NativeModules - ReactNativeModules
Platform - ReactPlatform
processColor - ReactProcessColor

READ_CALENDAR: 'android.permission.READ_CALENDAR',
WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
CAMERA: 'android.permission.CAMERA',
READ_CONTACTS: 'android.permission.READ_CONTACTS',
WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
GET_ACCOUNTS:  'android.permission.GET_ACCOUNTS',
ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
CALL_PHONE: 'android.permission.CALL_PHONE',
READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL',
USE_SIP: 'android.permission.USE_SIP',
PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
BODY_SENSORS:  'android.permission.BODY_SENSORS',
SEND_SMS: 'android.permission.SEND_SMS',
RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
READ_SMS: 'android.permission.READ_SMS',
RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',

alignItems:'flex-start,center,flex-end,stretch',
constructor:'1',
alignSelf:'12',
backfaceVisibility:'124',
borderBottomColor:'123413',
borderBottomLeftRadius:'123',
borderBottomRightRadius:'123',
borderBottomWidth:'123',
borderColor:'1234',
borderLeftColor:'12',
borderLeftWidth:'123',
borderRadius:'123',
borderRightColor:'123',
borderStyle:'124',
borderTopColor:'124',
borderTopLeftRadius:'123',
borderTopRightRadius:'123',
borderTopWidth:'124',
borderWidth:1,
backgroundColor:1,
bottom:1,
color:1,
decomposedMatrix:1,
elevation:1,
flex:1,
flexBasis:1,
flexDirection:'row,column,row-reverse,column-reverse',
flexGrow:1,
flexShrink:1,
flexWrap:1,
fontFamily:1,
fontSize:1,
fontStyle:1,
fontVariant:1,
fontWeight:1
height:1,
justifyContent:'center,flex-start,flex-end,space-around,space-between',
left:1,
letterSpacing:1,
lineHeight:1,
margin:1,
marginBottom:1,
marginHorizontal:1,
marginLeft:1,
marginRight:1,
marginTop:1,
maxHeight:1,
maxWidth:1,
minWidth:1,
opacity:1,
overflow:1,
overlayColor:1,
padding:1,
paddingBottom:1,
paddingTop:1,
paddingVertical:1,
position:'absolute',
resizeMode:1,
right:1,
rotation:1,
scaleX:1,
scaleY:1,
shadowColor:1,
shadowOffset:1,
shadowOpacity:1,
shadowRadius:1,
textAlign:'auto', 'left', 'right', 'center', 'justify',
textAlignVertical:'auto', 'top', 'bottom', 'center',
textDecorationColor:1,
textDecorationLine:1,
textDecorationStyle:1,
textShadowColor:1,
textShadowOffset:1,
textShadowRadius:1,
tintColor:1,
top:1,
transform:1,
transformMatrix:1,
translateX:1,
translatrY:1,
width:1,
writingDirection:1,
zIndex:1,
