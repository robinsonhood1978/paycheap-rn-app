import React, { Component } from 'react';
import { View,   Container, Content, } from 'native-base';
import { Image,Dimensions} from "react-native"


export default class Businesses extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            width:Dimensions.get("window").width,
            height:Dimensions.get("window").width*1.765
        };
       
    }

    render() {
        const {width,height}=this.state
        return (
            <Container><Content showsVerticalScrollIndicator={false}  style={{ width: "100%" ,marginLeft:-1}}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../../static/img/shangjiajiamengyemian.png")} style={{ width, height }}></Image>
                </View>
            </Content></Container>
        );
    }
}