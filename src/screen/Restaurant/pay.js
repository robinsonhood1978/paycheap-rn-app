import React, { Component } from 'react';
import { Text, Container, Icon, Button, Content, View, Spinner, CheckBox, Toast, Thumbnail } from 'native-base';
import { postInitPay, getOrderInfo } from '../../api/order'
import { TouchableOpacity, Alert } from "react-native";
import myGlobalStyleSheet from '../../utils/myGlobalStyleSheet'
import Alipay from '../../utils/Alipay';
import SubmitPay from './RComponents/paySubmit'
import MyGrayText from "../../components/myGrayText"
import { connect } from 'react-redux'
import action from '../../store/action';

class PayPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: "Order ID: " + navigation.getParam("order_id"), }
    };
    constructor(props) {
        super(props);
        this.state = {
            //  order_id: 10569,
            order_id: this.props.navigation.getParam("order_id"),
            order_info: null,
            enough: false,
            overtime: false,
            timer: null,
            minutes: "--",
            seconds: "--",
            preventRepeat: false,
            pay_type: "IE0025"
        }
        this.submitPay = this.submitPay.bind(this);
        this.changePayMethodType = this.changePayMethodType.bind(this);
        this.navigateToOrder = this.navigateToOrder.bind(this);
    }

    changePayMethodType(value) {
        this.setState({ pay_type: value })
    }

    submitPay() {
        if (this.state.preventRepeat) return
        this.setState({ preventRepeat: true });
        this.props.global_action_loading()
        const { order_info, pay_type } = this.state;
        const restaurant_id = order_info.restaurant_id;
        const order_id = order_info.id;
        postInitPay({ restaurant_id, order_id, pay_type }).then(res => {
            const { language } = this.props;
            if (res.data.status === -1) {
                this.setState({ preventRepeat: false });             //支付接口出错
                this.props.global_action_loading(false)
                Toast.show({
                    text: language.alert.Failed,
                    buttonText: 'Okay',
                    type: "warning"
                })
                return;
            }
            if (res.data.status === 302) {   //判断该订单是否已经支付完成
                this.setState({ preventRepeat: false });
                this.props.global_action_loading(false)
                Toast.show({
                    text: language.alert.Paid,
                    buttonText: 'Okay',
                    type: "warning"
                })
                this.navigateToOrder()
                return;
            }
            if (res.data.status === 201) {   //判断该订单是否已经支付完成    
                this.setState({ preventRepeat: false });
                this.props.global_action_loading(false)
                Toast.show({
                    text: language.alert.walletPay,
                    buttonText: 'Okay',
                    type: "success"
                })
                this.navigateToOrder()
                return;
            }
            if (res.data.status === 200) {
                const url = res.data.data;
                // Linking.openURL(url).catch((err) => console.error('An error occurred', err));
                if (pay_type === 'IE0025') {
                    setTimeout(() => {
                        this.setState({ preventRepeat: false });
                        this.props.global_action_loading(false)
                    }, 8000);
                    SubmitPay(url, () => { this.navigateToOrder(true) }, language)
                }
                else if (pay_type === 'IE0015') {
                    let pop = true;
                    Alipay.pay(url).then(data => {
                        console.log(data)
                        pop = false;
                        if (data.resultStatus === '9000') {
                            setTimeout(() => {
                                Alert.alert(
                                    language.alert.WarmPrompt,
                                    '',
                                    [
                                        { text: language.alert.payFinished, onPress: () => { this.navigateToOrder(true) } }
                                    ],
                                    { cancelable: false }
                                )
                            }, 1)
                        } else {
                            setTimeout(() => {
                                this.setState({ preventRepeat: false });
                                this.props.global_action_loading(false)
                                Alert.alert(
                                    language.alert.WarmPrompt,
                                    '',
                                    [
                                        { text: language.alert.payNotFinished, onPress: () => console.log('Problem occur.') },
                                    ],
                                    { cancelable: false }
                                )
                            }, 1)
                        }
                    }).catch(err => {
                        console.log(err);
                        this.props.global_action_loading(false)
                        this.setState({ preventRepeat: false });
                    })
                    setTimeout(() => {
                        this.setState({ preventRepeat: false });
                        this.props.global_action_loading(false)
                        if (pop) {
                            Alert.alert(
                                language.alert.WarmPrompt,
                                '',
                                [
                                    { text: language.alert.payNotFinished, onPress: () => console.log('Problem occur.') },
                                    { text: language.alert.payFinished, onPress: () => { this.navigateToOrder(true) } },
                                ],
                                { cancelable: false }
                            )
                        }
                    }, 15000)
                }
            }
        }).catch(err => {
            this.setState({ preventRepeat: false });
            this.props.global_action_loading(false)
            Toast.show({
                text: this.props.language.alert.Failed,
                buttonText: 'Okay',
                type: "warning"
            })
        })
    }

    calculateRemainTime(remain_time) {
        if (remain_time <= 0) {
            clearInterval(this.state.timer);
            this.setState({ overtime: true, minutes: "--", seconds: "--" })
            Toast.show({
                text: this.props.language.alert.OverTime,
                buttonText: 'Okay',
                type: "warning"
            })
            this.props.navigation.goBack();
            return
        }
        this.calMinSec(remain_time)
    }

    calMinSec(remain_time) {
        let minutes = (remain_time / 60 % 60)
        minutes = minutes >= 10 ? Math.floor(minutes) + "" : "0" + Math.floor(minutes);
        let seconds = (remain_time % 60)
        seconds = seconds >= 10 ? Math.floor(seconds) + "" : "0" + Math.floor(seconds);
        this.setState({ minutes, seconds })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }


    navigateToOrder(paid) {
        const { order_info } = this.state;
        this.props.navigation.navigate('StoreList')
        this.props.navigation.navigate('OrderDetail', {
            order_id: order_info.id,
            paid,
            name: this.props.locale === "cn" ? order_info.restaurant.c_name : order_info.restaurant.name
        })
    }

    componentDidMount() {
        const { order_id } = this.state;
        getOrderInfo({ order_id }).then(res => {
            if (res.data.data.total_price - res.data.data.wallet_price <= 0) {
                this.setState({ enough: true });
            }
            this.setState({ order_info: res.data.data });
            let remain_time = res.data.data.pay_remain_time;
            if (remain_time == 0) {
                this.setState({ overtime: true });
                Toast.show({
                    text: this.props.language.alert.OverTime,
                    buttonText: 'Okay',
                    type: "warning"
                })
                this.props.navigation.goBack();
            }
            else {
                this.calMinSec(remain_time);
                this.state.timer = setInterval(() => {
                    remain_time--;
                    this.calculateRemainTime(remain_time)
                }, 1000);
            }
        })
    }

    render() {
        const { minutes, seconds, enough, order_info, pay_type } = this.state;
        const { locale, language } = this.props;
        return (
            <Container>
                {order_info ? <Content>
                    <View style={{ marginTop: 15, alignItems: "center" }}>
                        <MyGrayText style={{ fontSize: 17 }}>{language.pay.PaymentTime}</MyGrayText>
                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}>
                            <View style={{ borderRadius: 3, marginLeft: 2, marginRight: 2, backgroundColor: "#666", width: 20, height: 20, alignItems: "center" }}>
                                <Text style={{ color: "#fff", lineHeight: 20 }}>{minutes.slice(0, 1)}</Text>
                            </View>
                            <View style={{ borderRadius: 3, marginLeft: 2, marginRight: 2, backgroundColor: "#666", width: 20, height: 20, alignItems: "center" }}>
                                <Text style={{ color: "#fff", lineHeight: 20 }}>{minutes.slice(1, 2)}</Text>
                            </View>
                            <Text>:</Text>
                            <View style={{ borderRadius: 3, marginLeft: 2, marginRight: 2, backgroundColor: "#666", width: 20, height: 20, alignItems: "center" }}>
                                <Text style={{ color: "#fff", lineHeight: 20 }}>{seconds.slice(0, 1)}</Text>
                            </View>
                            <View style={{ borderRadius: 3, marginLeft: 2, marginRight: 2, backgroundColor: "#666", width: 20, height: 20, alignItems: "center" }}>
                                <Text style={{ color: "#fff", lineHeight: 20 }}>{seconds.slice(1, 2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 22, width: "90%", marginLeft: "5%" }}>
                        <Thumbnail source={{ uri: order_info.restaurant.pic_url }}></Thumbnail>
                        <View style={{ marginLeft: "8%" }}>
                            <MyGrayText style={{ fontSize: 15 }}>${order_info.total_price}
                                {order_info.wallet_price > 0 ? <MyGrayText style={{ fontSize: 15 }} > - ${order_info.wallet_price} =
                        <MyGrayText style={{ color: 'red', fontSize: 15 }}> ${(order_info.total_price - order_info.wallet_price).toFixed(2).toString()}</MyGrayText>
                                </MyGrayText> : null}
                            </MyGrayText>
                            <MyGrayText style={{ fontSize: 15 }}>{locale === "cn" ? order_info.restaurant.c_name : order_info.restaurant.name} </MyGrayText>
                            <MyGrayText style={{ fontSize: 15 }}>{language.orderDetail.OrderId}: {order_info.id}</MyGrayText>
                        </View>
                    </View>
                    <View style={{ marginTop: 40, justifyContent: "center" }}>
                        {enough ? null :
                            <View>
                                <TouchableOpacity onPress={() => { this.changePayMethodType('IE0025') }}>
                                    <View style={{ width: "85%", paddingTop: 15, flexDirection: "row", height: 60, justifyContent: "space-between", marginLeft: "5%", paddingBottom: 7, borderBottomColor: "#e6e6e6", borderBottomWidth: 1 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Icon style={{ color: "#62b900" }} type="AntDesign" name='wechat' /><MyGrayText style={{ fontSize: 17, lineHeight: 30 }} > {language.pay.Wechat}</MyGrayText>
                                        </View>
                                        <CheckBox style={{ marginTop: 5 }} onPress={() => { this.changePayMethodType('IE0025') }} checked={pay_type === 'IE0025'} color="#ff6933" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.changePayMethodType('IE0015') }} >
                                    <View style={{ width: "85%", paddingTop: 15, flexDirection: "row", height: 60, justifyContent: "space-between", marginLeft: "5%", paddingBottom: 7, borderBottomColor: "#e6e6e6", borderBottomWidth: 1 }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Icon style={{ color: "#108ee9" }} type="AntDesign" name='alipay-circle' /><MyGrayText style={{ fontSize: 17, lineHeight: 30 }}> {language.pay.Alipay}</MyGrayText>
                                        </View>
                                        <CheckBox style={{ marginTop: 5 }} onPress={() => { this.changePayMethodType('IE0015') }} checked={pay_type === 'IE0015'} color="#ff6933" />
                                    </View>
                                </TouchableOpacity>
                            </View>}
                        <Button block style={{ ...myGlobalStyleSheet.fullButton, marginTop: 50 }} onPress={this.submitPay}>
                            <Text style={myGlobalStyleSheet.fullButtontext}>{language.pay.Confirm}</Text>
                        </Button>
                    </View>
                </Content> : <Spinner color="#ff6933" />}
            </Container>
        );
    }
}

export default connect(state => state.language, action.globalLoading)(PayPage)
