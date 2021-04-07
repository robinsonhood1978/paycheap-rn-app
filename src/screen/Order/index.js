import React, { Component } from 'react';
import { Text, Container, Button, Spinner, View, } from 'native-base';
import { connect } from 'react-redux';
import myGlobalStyleSheet from '../../utils/myGlobalStyleSheet';
import OrderListComponent from './OComponents/OrderListComponent'
import { NavigationEvents } from "react-navigation";
import { checkUserAuth } from '../../utils/auth';
import { TouchableOpacity } from 'react-native'
import action from '../../store/action';

class OrderIndex extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            sort: "all",
            loading: false,
            hasUser: false,
        }
        this.checkAuth = this.checkAuth.bind(this)
        this.refOrderList = this.refOrderList.bind(this)
        this.changeOrderSort = this.changeOrderSort.bind(this)
        this.changeOrderLoading = this.changeOrderLoading.bind(this)
    }

    checkAuth() {
        checkUserAuth(
            () => {
                this.setState({ hasUser: false })
            },
            () => {
                console.log(this.props.navigation, this.state.hasUser, this.props.refresh)
                if ((!this.state.hasUser) || this.props.refresh) {
                    this.setState({ hasUser: true });
                    if (this.childList) {
                        this.childList.firstOrderFetch()
                    } else {
                        setTimeout(() => { this.childList.firstOrderFetch() }, 100)
                    }
                    this.props.order_refresh(false);
                }
            })
    }

    refOrderList(ref) {
        this.childList = ref
    }

    changeOrderSort(sort) {
        if (this.state.hasUser && !this.state.loading && this.childList) {
            this.setState({ sort });
            this.childList.firstOrderFetch();
        }
    }

    changeOrderLoading(value) {
        this.setState({ loading: value });
    }

    componentDidMount() {
        checkUserAuth(
            () => {
            },
            () => {
                this.setState({ hasUser: true })
                if (this.childList) {
                    this.childList.firstOrderFetch()
                }
            }
        )
    }

    render() {
        const { sort, loading, hasUser } = this.state;
        const { language } = this.props;
        return (
            <Container style={myGlobalStyleSheet.root}>
                <NavigationEvents onWillFocus={this.checkAuth} />
                <View style={myGlobalStyleSheet.tabOrderIndex}>
                    <TouchableOpacity onPress={() => this.changeOrderSort('all')} >
                        <View style={sort === 'all' ? myGlobalStyleSheet.tabOrderActiveButton : myGlobalStyleSheet.tabOrderButton} >
                            <Text style={{ textAlign: "center", color: sort === 'all' ? "#ff6933" : "#000", fontSize: 12, lineHeight: 28 }}>{language.order.All}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeOrderSort('unused')} >
                        <View style={sort === 'unused' ? myGlobalStyleSheet.tabOrderActiveButton : myGlobalStyleSheet.tabOrderButton} >
                            <Text style={{ textAlign: "center", color: sort === 'unused' ? "#ff6933" : "#000", fontSize: 12, lineHeight: 28 }}>{language.order.Unused}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeOrderSort('finished')} >
                        <View style={sort === 'finished' ? myGlobalStyleSheet.tabOrderActiveButton : myGlobalStyleSheet.tabOrderButton} >
                            <Text style={{ textAlign: "center", color: sort === 'finished' ? "#ff6933" : "#000", fontSize: 12, lineHeight: 28 }}>{language.order.Finished}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeOrderSort('uncomment')} >
                        <View style={sort === 'uncomment' ? myGlobalStyleSheet.tabOrderActiveButton : myGlobalStyleSheet.tabOrderButton} >
                            <Text style={{ textAlign: "center", color: sort === 'uncomment' ? "#ff6933" : "#000", fontSize: 12, lineHeight: 28 }}>{language.order.UnComment}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeOrderSort('refunded')} >
                        <View style={sort === 'refunded' ? myGlobalStyleSheet.tabOrderActiveButton : myGlobalStyleSheet.tabOrderButton} >
                            <Text style={{ textAlign: "center", color: sort === 'refunded' ? "#ff6933" : "#000", fontSize: 12, lineHeight: 28 }}>{language.order.Refunded}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {loading ? <View style={{ width: "100%", marginTop: "20%" }}><Spinner color="#ff6933" /></View> : null}
                {hasUser ? <OrderListComponent
                    onRefList={this.refOrderList}
                    changeLoading={this.changeOrderLoading}
                    navigation={this.props.navigation}
                    sort={sort}
                /> : loading ? null : <View style={{ width: "90%", marginTop: 150, alignItems: "center", marginLeft: "5%", justifyContent: "center" }}>
                    <View ><Text style={{ color: "#ccc", fontSize: 14, lineHeight: 50 }}>{language.home.NoLogin}</Text></View>
                    <Button onPress={() => { this.props.navigation.navigate('Login', { router: "OrderList", name: language.home.Login }) }} block style={{ backgroundColor: "#ff6933", borderRadius: 10 }}>
                        <Text>{language.home.LoginRegister}</Text>
                    </Button></View>}
            </Container>
        );
    }
}

export default connect(state => { return { ...state.language, ...state.order } }, action.order)(OrderIndex)