import React, { Component } from 'react'
import { Image } from 'react-native'
import ReactNativeSwiper  from 'react-native-swiper'

export default class SwiperPhotoComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { photos } = this.props;
        return (
            <ReactNativeSwiper  style={{ height: 260, marginTop: 5 }} autoplay={true} showsPagination={true}>
                {photos.map((uri, index) => <Image key={index} style={{ alignItems: "center", width: 300, height: 240, borderRadius: 5 }} source={{ uri }} />)}
            </ReactNativeSwiper>
        )
    }
}