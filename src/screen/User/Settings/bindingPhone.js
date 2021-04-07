import React, { Component } from 'react';
import { View,  Text, Container, Content,  } from 'native-base';
import { connect } from 'react-redux';

class BindingPhoneNumber extends Component {
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
            <Container><Content style={{ width: "100%" }} scrollEnabled={false} >
            <View style={{ justifyContent:"space-between",flexDirection:"row",width:"92%",marginLeft:"4%",marginTop:30, paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                <Text style={{fontSize:16}}>{this.props.language.home.Phone}</Text>
                <Text style={{fontSize:16,color:"#6f6e6e"}}>{this.props.phone}</Text>
            </View>
        </Content></Container>
        );
    }
}
export default connect(state => {return {...state.language,...state.person}})(BindingPhoneNumber)