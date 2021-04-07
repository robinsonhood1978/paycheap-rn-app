import React, { Component } from 'react';
import { View, Text, Container, Content, } from 'native-base';
import { connect } from 'react-redux';
import {Image} from 'react-native'

class CustomService extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container><Content style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}  scrollEnabled={false}>
                <View style={{ width: "100%", alignItems: "center", marginTop: 100 }}>
                    <Image  source={require("../../../static/img/playstore-icon.png")}  style={{width:86,height:86,marginBottom: 40}} ></Image>
                    <Text style={{ fontSize: 14, color: "#6f6e6e" }}>{this.props.language.homeList.CustomerServiceNumber}：+64211815195</Text>
                    <Text style={{ fontSize: 14, color: "#6f6e6e" }}>{this.props.language.homeList.WechatService}：NZ-PCAPP</Text>
                </View>
            </Content></Container>
        );
    }
}
export default connect(state => state.language)(CustomService)