import React, { Component } from 'react';
import { View,  Text, Container, Content,  } from 'native-base';
import { Image } from "react-native"
import { connect } from 'react-redux';

class MyCoupons extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("name")
    }
    };
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
   
  
    render() {
        return (
            <Container><Content  showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
            <View style={{ alignItems: "center",marginTop:150 }}>
                <Image source={require("../../../static/img/haimeiyouyouhuiquan.png")} style={{ width: 250, height: 240 ,marginBottom:40}}></Image>
                <Text style={{fontSize:18,color:"#6f6e6e"}}>{this.props.language.message.NoCoupon}</Text>
            </View>
        </Content></Container>
        );
    }
}
export default connect(state => state.language)(MyCoupons)