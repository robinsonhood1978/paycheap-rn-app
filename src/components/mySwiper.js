import React, { Component } from 'react'
import { Image, Dimensions, TouchableOpacity } from 'react-native'
import ReactNativeSwiper from 'react-native-swiper'


export default class MySwiperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width * 0.9,
      height: Dimensions.get("window").width * 0.2
    };
  }
  render() {
    const { width, height } = this.state;
    const { navigation } = this.props;
    return (
      <ReactNativeSwiper autoplay={true}  autoplayTimeout={8} showsPagination={false}>
        <TouchableOpacity onPress={() => { 
          // navigation.navigate('StoreDetail', { store_id: 38 }) 
          }}>
          <Image style={{ width, height, borderRadius: 5 }} source={require("../static/img/p04.jpg")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { 
          // navigation.navigate('StoreDetail', { store_id: 16 })
           }}>
          <Image style={{ width, height, borderRadius: 5 }} source={require("../static/img/p01.jpg")} /></TouchableOpacity>
        <TouchableOpacity onPress={() => { 
          // navigation.navigate('StoreDetail', { store_id: 25 }) 
          }}>
          <Image style={{ width, height, borderRadius: 5 }} source={require("../static/img/p03.jpg")} />
        </TouchableOpacity>
      </ReactNativeSwiper >
    )
  }
}
