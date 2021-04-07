import React, { Component } from 'react'
import { Image, Dimensions, TouchableOpacity } from 'react-native'
import ReactNativeSwiper from 'react-native-swiper'
// 
export default class MySwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").width * 0.4
        };
    }
    render() {
        const { width, height } = this.state;
        const { language, navigation } = this.props
        return (
            <ReactNativeSwiper autoplay={true} showsPagination={false} autoplayTimeout={3}>
                <TouchableOpacity onPress={() => { navigation.navigate('UseApp', { name: language.homeList.Instruction }) }}>
                    <Image style={{ width, height, borderRadius: 5 }} source={require('../static/img/h1.jpeg')} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { navigation.navigate('Category', { type : "More"}) }}>
                    <Image style={{ width, height, borderRadius: 5 }} source={require("../static/img/t1.jpeg")} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => { navigation.navigate('Category', { type: "More" }) }}>
                    <Image style={{ width, height, borderRadius: 5 }} source={require("../static/img/t2.png")} />
                </TouchableOpacity>
            </ReactNativeSwiper>
        )
    }
}