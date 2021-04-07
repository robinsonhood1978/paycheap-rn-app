import React, { Component } from 'react';
import { View, Text, Container, Content, Spinner } from 'native-base';
import { Image } from "react-native"
import { userCollectedRestaurants } from '../../../api/user'
import StoreListMap from '../../../components/storeListMap'
import { connect } from 'react-redux';
import { checkUserAuth } from '../../../utils/auth';

class MyCollection extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            shopList: [],
            loading: false,
            hasUser: false,
        };
    }

    componentDidMount() {
        checkUserAuth(() => {
        }, () => {
            this.setState({ loading: true, hasUser: true });
            userCollectedRestaurants().then(res => {
                this.setState({ shopList: res.data.data.restaurants, loading: false })
            });
        })
    }

    render() {
        const { hasUser, loading, shopList } = this.state
        return (
            <Container><Content style={{ width: "100%" }}>
                {(!hasUser || (shopList.length === 0 && !loading)) ? <View style={{ alignItems: "center", marginTop: 150 }}>
                    <Image source={require("../../../static/img/haimeiyoushoucang.png")} style={{ width: 250, height: 240, marginBottom: 40 }}></Image>
                    <Text style={{ fontSize: 18, color: "#6f6e6e" }}>{this.props.language.message.NoBookmarks}</Text>
                </View> : loading ? <Spinner color='#ff6933' /> : <StoreListMap
                    shopList={shopList}
                    navigation={this.props.navigation}
                    language={this.props.language}
                    locale={this.props.locale}
                />}
            </Content></Container>
        );
    }
}

export default connect(state => state.language)(MyCollection)