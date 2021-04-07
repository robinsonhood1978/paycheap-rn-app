import React, { Component } from 'react';
import { Container, View, Content, Input, Icon, Label, Toast } from 'native-base';
import StoreListMap from "../../components/storeListMap"
import { searchTheRestaurant } from '../../api/restaurant'
import { connect } from 'react-redux';
import action from '../../store/action';

class SearchStorPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("name"), }
    };
    constructor(props) {
        super(props);
        this.state = { shopList: [], loading: false }
        this.userSearchRestaurants = this.userSearchRestaurants.bind(this)
    }

    userSearchRestaurants(keyword) {
        if (!keyword) return
        this.setState({ loading: true })
        this.props.global_action_loading()
        searchTheRestaurant({ keyword }).then(res => {
            this.setState({ loading: false })
            this.props.global_action_loading(false)
            if (res.data.status = 200) {
                if (res.data.data.length) {
                    this.setState({ shopList: res.data.data })
                }
                else {
                    this.setState({ shopList: [] })
                    Toast.show({
                        text: this.props.language.alert.CannotFind,
                        buttonText: 'Okay',
                        type: "warning"
                    })
                }
            }
        }).catch(err => {
            this.setState({ loading: false });
            this.props.global_action_loading(false)
        })
    }

    render() {
        const { shopList } = this.state
        return (
            <Container>
                <View style={{ marginTop: "2%", width: "94%", marginLeft: "3%", flexDirection: "row", borderBottomColor: "#fff", backgroundColor: "#eee", borderRadius: 7, height: 46 }}>
                    <Label style={{ color: "#ccc", fontSize: 18, lineHeight: 46 }}> <Icon style={{ color: "#ccc", fontSize: 18 }} type="FontAwesome" name='search' /> </Label>
                    <Input onChangeText={keyword => { this.userSearchRestaurants(keyword) }} style={{ color: "#ccc" }} placeholder={this.props.language.message.InputStore} placeholderTextColor="#ccc" />
                </View>
                <Content>
                    <StoreListMap
                        language={this.props.language}
                        shopList={shopList}
                        locale={this.props.locale}
                        navigation={this.props.navigation}
                    />
                </Content>
            </Container>
        );
    }
}

export default connect(state => state.language, action.globalLoading)(SearchStorPage)