import React, { Component } from 'react';
import { View, Container, Content, Text } from 'native-base';
import { Image, Dimensions } from "react-native"


export default class UseApp extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width
        };
    }

    render() {
        const { width } = this.state
        return (
            <Container>
                <Content showsVerticalScrollIndicator={false} style={{ width: "90%", marginLeft: "5%" }}>
                    <View style={{ alignItems: "center", marginTop: 5, marginBottom: 6 }}>
                        <Text>
                            1): 点击底部导航Home按钮，点击“直接登陆”，进入登陆页面登陆或注册新用户。
                        </Text>
                        <Image source={require('../../static/img/ilogin.jpg')} style={{ width: width * 0.9, height: width * 0.5, margin: 10 }}>
                        </Image>
                        <Text>
                            2):  在个人主页中点击用户头像或者用户昵称，进入设置页面。
                        </Text>
                        <Image source={require('../../static/img/ihome.jpg')} style={{ width: width * 0.9, height: width * 0.5, margin: 10 }}>
                        </Image>
                        <Text>
                            3): 更换头像，更换昵称，设置自己喜欢的图片，昵称。
                        </Text>
                        <Image source={require('../../static/img/iprofile.jpg')} style={{ width: width * 0.9, height: width * 0.5, margin: 10 }}>
                        </Image>
                        <Text>
                            4): 点击底部导航Store按钮，选择自己要消费的商铺
                        </Text>
                        <Image source={require('../../static/img/istorelist.jpg')} style={{ width: width * 0.9, height: width, margin: 10 }}>
                        </Image>
                        <Text>
                            5): 进入商铺后，可以选择当面支付，即在店铺先消费，然后使用当面支付功能，可以给予一定的折扣，也可以选择购买团购套餐，即支付之后，任意营业时间，去店铺消费。
                        </Text>
                        <Image source={require('../../static/img/istore.jpg')} style={{ width: width * 0.9, height: width * 1.5, margin: 10 }}>
                        </Image>
                        <Text>
                            6): 进入商铺后，也可以选择线下支付功能，在商家收银台处扫描二维码，进入店铺优惠信息页面。
                        </Text>
                        <Image source={require('../../static/img/iqr.jpeg')} style={{ width: width * 0.9, height: width *0.9, margin: 10 }}>
                        </Image>
                        <Text>
                            7): 点击底部导航Order按钮，已支付的团购商品的订单可以在此找到，到店之后，点击激活后告诉商户订单号，享受服务。
                        </Text>
                        <Image source={require('../../static/img/iorder.jpg')} style={{ width: width * 0.9, height: width * 0.625, marginTop: 10, marginBottom: 100 }}>
                        </Image>

                    </View>
                </Content></Container>
        );
    }
}