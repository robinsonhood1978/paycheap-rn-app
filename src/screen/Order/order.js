import React, { Component } from 'react';
import { ActionSheet, View, Text, Container, Button, Content, Spinner, Footer, Toast } from 'native-base';
import { Image } from "react-native";
import { connect } from 'react-redux';
import { getOrderInfo, activeTheOrder, refundMyOrder } from '../../api/order'
import MyGrayText from '../../components/myGrayText'
import action from '../../store/action';



class OneOrder extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("name"), }
    };
    constructor(props) {
        super(props);
        this.state = {
            order_id: this.props.navigation.getParam('order_id'),
            //   order_id: 10317,
            order: null,
            preventRepeat: false
        };
        this.activeMyOrder = this.activeMyOrder.bind(this);
        this.refundTheOrder = this.refundTheOrder.bind(this);
        this.getOneOrder = this.getOneOrder.bind(this);
    }

    refundTheOrder(order_id) {
        ActionSheet.show(
            {
                options: [
                    { text: "Refund to Wallet after 24 hours" },
                    { text: "Cancel" }
                ],
                cancelButtonIndex: 1,
                title: "Refund"
            },
            buttonIndex => {
                if (buttonIndex === 0 && !this.state.preventRepeat) {
                    const { language } = this.props;
                    this.props.global_action_loading()
                    this.setState({ preventRepeat: true });
                    refundMyOrder({ order_id }).then(res => {
                        this.props.order_refresh();
                        if (res.data.status === 200) {
                            Toast.show({
                                text: language.alert.isRefund,
                                buttonText: 'Okay',
                                type: "success"
                            });
                            this.props.navigation.navigate('OrderList');
                        } else {
                            Toast.show({
                                text: language.alert.Error,
                                buttonText: 'Okay',
                                type: "warning"
                            });
                        }
                        this.props.global_action_loading(false)
                        this.setState({ preventRepeat: false })
                    }).catch(err => {
                        this.props.global_action_loading(false)
                        this.setState({ preventRepeat: false })
                        Toast.show({
                            text: language.alert.Error,
                            buttonText: 'Okay',
                            type: "warning"
                        });
                    })
                }
            }
        )
    }

    activeMyOrder(id) {
        if (this.state.preventRepeat) return
        this.setState({ preventRepeat: true });
        this.props.global_action_loading()
        const { language } = this.props;
        activeTheOrder({ order_id: id }).then(res => {
            this.props.order_refresh();
            if (res.data.status === 200) {
                Toast.show({
                    text: language.alert.isActivated,
                    buttonText: 'Okay',
                    type: "success"
                })
            } else {
                Toast.show({
                    text: language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning"
                })
            }
            this.props.global_action_loading(false)
            this.setState({ preventRepeat: false });
            this.props.navigation.navigate('OrderList');
        }).catch(err => {
            this.props.global_action_loading(false)
            this.setState({ preventRepeat: false })
            Toast.show({
                text: language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            });
        })
    }

    getOneOrder(bool) {
        const { order_id } = this.state;
        getOrderInfo({ order_id }).then(res => {
            if (res.data.status === 200) {
                const order = res.data.data;
                if (order.code !== 200 && order.code !== 150 && order.code !== 250 && order.code !== 300) {
                    if (this.props.navigation.getParam("paid") || bool) {
                        if (!bool) {
                            this.props.order_refresh();
                            this.props.navigation.state.params.paid = false;
                            Toast.show({
                                text: this.props.language.alert.pleaseWaiting,
                                buttonText: 'Okay',
                                type: "success",
                                duration: 5000
                            });
                            this.setState({ order });
                            setTimeout(() => { this.getOneOrder(true) }, 2000)
                        }
                        else {
                            setTimeout(() => { this.getOneOrder(false) }, 4000)
                        }
                    } else {
                        this.props.navigation.navigate('OrderList');
                        Toast.show({
                            text: this.props.language.alert.Error,
                            buttonText: 'Okay',
                            type: "warning"
                        });
                    }
                }
                else {
                    if (this.props.navigation.getParam("paid")) {
                        this.props.navigation.state.params.paid = false;
                        this.props.order_refresh();
                    }
                    this.setState({ order })
                }
            } else {
                Toast.show({
                    text: this.props.language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning"
                });
            }
        }).catch(err => {
            console.log(err)
            Toast.show({
                text: this.props.language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            });
        })
    }

    componentDidMount() {
        this.getOneOrder();
    }

    render() {
        const { order } = this.state
        const { language, locale } = this.props
        return (
            <Container>
                {order ? <Container><Content style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }}>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingBottom: 8, borderBottomColor: '#eeeeee', borderBottomWidth: 1, alignItems: "center" }}>
                        <View style={{ width: "20%" }}>
                            <Image source={{ uri: order.restaurant.pic_url }} style={{ width: 60, height: 60, borderRadius: 5 }} />
                        </View>
                        <View style={{ width: "52%", }}>
                            {order.food ? 
                            <Text style={{ fontWeight: "700", fontSize: 17 }} > {locale === "cn" ? order.food.c_name : order.food.name} </Text> 
                            : <Text style={{ fontWeight: "700", fontSize: 17 }}> {language.order.PayInStore} </Text>}
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={{ fontSize: 17 }}>${order.total_price}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 22, paddingBottom: 8, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: "700", lineHeight: 30 }}>{language.order.OrderInfo}</Text>
                        <MyGrayText style={{fontSize:12}}>{language.order.OrderId}: {order.id}</MyGrayText>
                        <MyGrayText style={{fontSize:12}}>{language.order.OrderDate}: {(new Date(order.create_time)).toLocaleString('en', { hour12: false, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} </MyGrayText>
                    </View>
                    <View style={{ marginTop: 22, paddingBottom: 8, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: "700", lineHeight: 30 }}>{language.order.StoreInfo}</Text>
                        <MyGrayText style={{fontSize:12}}>{locale === "cn" ? order.restaurant.c_name : order.restaurant.name}</MyGrayText>
                        <MyGrayText style={{fontSize:12}}>{order.restaurant.address}</MyGrayText>
                    </View>
                    <View style={{ marginTop: 22, paddingBottom: 8, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: "700", lineHeight: 30 }}>{language.order.Detail}</Text>
                        {order.food ?
                             <MyGrayText style={{fontSize:12}}>{locale === "cn" ? order.food.c_description : order.food.description}</MyGrayText>
                              : <MyGrayText style={{fontSize:12}}>{language.order.PayInStore}</MyGrayText>}
                    </View>
                </Content><Footer style={{ height: 50, flexDirection: "column", justifyContent: "space-between", backgroundColor: "#fff" }}>
                        <View style={{ height: 40, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 10, alignItems: "flex-start", justifyContent: "center" }}>
                            </View>
                            <View style={{ marginRight: 15, marginTop: 10 }}>
                                {order.code === 200 ? <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
                                    <Button onPress={() => { this.refundTheOrder(order.id) }} style={{ marginRight: 10,height: 24, borderColor: "#ff6933", borderWidth: 1, backgroundColor: "#fff", borderRadius: 12, alignItems: "center" }}>
                                        <Text style={{ color: "#6f6e6e", fontSize: 11 }}>{language.order.Refund}</Text>
                                    </Button>
                                    <Button onPress={() => { this.activeMyOrder(order.id) }} style={{ marginLeft: 15, height: 24, backgroundColor: "#ff6933", borderRadius: 12, alignItems: "center" }}>
                                        <Text style={{ fontSize: 11 }}>{language.order.WaitingToActivate}</Text>
                                    </Button></View>
                                    : order.code === 150 ?
                                        <Button style={{ height: 24, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                            <Text style={{ fontSize: 11 }}>{language.order.Waiting}</Text>
                                        </Button>
                                        : order.code === 300 ?
                                            <Button style={{ height: 24, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                                <Text style={{ fontSize: 11 }}>{language.order.Refunded}</Text>
                                            </Button>
                                            : order.code === 250 && order.has_comment ?
                                                <Button style={{ height: 24, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                                    <Text style={{ fontSize: 11 }}>{language.order.Finished}</Text>
                                                </Button>
                                                : order.code === 250 && !order.has_comment ?
                                                    <Button onPress={() => { this.props.navigation.navigate("Comment", { order_id: order.id, name: order.restaurant.name }) }} 
                                                    style={{ height: 24, backgroundColor: "#ff6933", borderRadius: 12, alignItems: "center" }}>
                                                        <Text style={{ fontSize: 11 }}>{language.order.GoComment}</Text>
                                                    </Button> : null
                                }
                            </View>
                        </View>
                    </Footer></Container> : <Spinner color='#ff6933' />}
            </Container>
        );
    }
}

export default connect(state => state.language, { ...action.order, ...action.globalLoading })(OneOrder)