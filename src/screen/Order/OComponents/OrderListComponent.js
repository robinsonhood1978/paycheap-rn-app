import React, { Component } from 'react';
import { Text, View,  Content, Spinner, Toast } from 'native-base';
import { connect } from 'react-redux';
import { getMyOrders, activeTheOrder } from '../../../api/order'
import { Image, TouchableOpacity } from 'react-native';
import MyGrayText from '../../../components/myGrayText'
import {minusScrollHeight} from '../../../utils/utils'
class OrderListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noMore: false,
            preventRepeat: false,
            loading: false,
            page: 1,
            limit: 6,
            orderList: []
        }
        this.firstOrderFetch = this.firstOrderFetch.bind(this);
        this.handleOrderScroll = this.handleOrderScroll.bind(this);
        this.activeMyOrder = this.activeMyOrder.bind(this);
    }

    componentDidMount() {
        this.props.onRefList(this);
    }

    handleOrderScroll(event) {
        if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
            if (this.state.loading || this.state.noMore) return
            this.state.loading = true;
            this.setState({ loading: true })
            this.getTheOrders(this.state.page, this.state.limit, data => {
                this.state.page = this.state.page + 1;
                data.forEach(el => {
                    this.state.orderList.push(el);
                })
                this.setState({ orderList: this.state.orderList })
            })
        }
    }

    activeMyOrder(id) {
        if (this.state.preventRepeat) return
        this.state.preventRepeat = true;
        const { orderList } = this.state;
        const { language } = this.props;
        activeTheOrder({ order_id: id }).then(res => {
            this.state.preventRepeat = false;
            if (res.data.status === 200) {
                orderList.map(item => item.id === id ? item.code = 150 : item)
                orderList.sort((a, b) => a.code - b.code)
                this.setState({ orderList });
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
        }).catch(err => {
            Toast.show({
                text: language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            })
            this.state.preventRepeat = false;
        })
    }

    getTheOrders = (page, limit, callback) => {
        if (this.state.noMore || this.state.preventRepeat) return;
        this.state.preventRepeat = true;
        const offset = page - 1;
        setTimeout(() => {
            getMyOrders({ theSort: this.props.sort, offset, limit }).then(res => {
                this.setState({ loading: false });
                this.state.preventRepeat = false;
                this.props.changeLoading(false);
                //parentLoadingfalse
                const data = res.data.data;
                this.state.noMore = data.length < this.state.limit;
                callback(data);
            }).catch(err => {
                this.state.preventRepeat = false;
                this.setState({ loading: false });
                this.props.changeLoading(false);
                Toast.show({
                    text: language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning"
                });
            })
        }, 10)
    }
    
    firstOrderFetch() {
        this.props.changeLoading(true)
        this.setState({ orderList: [] })
        //parentLoadingTrue
        this.state.page = 1;
        this.state.noMore = false;
        this.state.preventRepeat = false;
        this.setState({ loading: false });
        this.getTheOrders(this.state.page, this.state.limit, data => {
            this.state.page = this.state.page + 1;
            this.setState({ orderList: data });
            //listen scroll
        })
    }
    render() {
        const { orderList, loading, noMore } = this.state
        const { language, locale } = this.props;
        return (
            <Content style={{ width: "92%", marginLeft: "4%", marginTop: "1%" }} showsVerticalScrollIndicator={false} onScroll={this.handleOrderScroll}>
                {orderList.map(data =>
                    <TouchableOpacity style={{ paddingBottom: "2%", marginTop: 12, borderBottomColor: '#efefef', borderBottomWidth: 0.5 }} onPress={() => this.props.navigation.navigate('OrderDetail', { order_id: data.id, name: locale === "cn" ? data.restaurant.c_name : data.restaurant.name })} key={data.id}  >
                        <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", paddingBottom: 5, marginBottom: 8, borderBottomColor: '#f7f7f7', borderBottomWidth: 1, alignItems: "center" }}>
                                <View style={{ width: "79%" }}>
                                    <Text style={{ fontSize: 13 }}>{locale === "cn" ? data.restaurant.c_name : data.restaurant.name}</Text>
                                </View>
                                <View style={{ width: "17%" }}>
                                    <MyGrayText right >
                                        {data.code === 200 ? language.order.PayFinished : data.code === 150 ? language.order.Waiting : data.code === 300 ? language.order.Refunded : data.has_comment ? language.order.Finished : language.order.WaitComment}
                                    </MyGrayText>
                                </View>
                            </View>
                            <View style={{ width: "100%", flexDirection: "row" }}>
                                <View style={{ width: "20%" }}>
                                    <Image source={{ uri: data.restaurant.pic_url }} style={{ width: 55, height: 55, borderRadius: 5 }} />
                                </View>
                                <View style={{ width: "56%" }}>
                                    <MyGrayText style={{fontSize:10,lineHeight:18}}> {language.order.OrderId}: {data.id} </MyGrayText>
                                    {data.food ? <MyGrayText style={{fontSize:10,lineHeight:18}}> {locale === "cn" ?
                                        data.food.c_name : data.food.name}: <MyGrayText style={{fontSize:11,lineHeight:18,fontWeight:"700"}}>${data.food.price} </MyGrayText></MyGrayText>
                                        : <MyGrayText  style={{fontSize:10,lineHeight:18}}> {language.order.PayInStore}: ${data.total_price} </MyGrayText>}
                                    <MyGrayText style={{fontSize:10,lineHeight:18}}> {language.order.OrderDate}:   {(new Date(data.create_time)).toLocaleString('en', { hour12: false, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} </MyGrayText>
                                </View>
                                <View style={{ width: "21%", marginTop: 35 }}>
                                    {data.code === 200 ?
                                        <TouchableOpacity onPress={() => { this.activeMyOrder(data.id) }} >
                                            <View style={{ height: 22, width: 62, backgroundColor: "#ff6933", borderRadius: 12, alignItems: "center" }}>
                                                <Text uppercase={false} style={{ fontSize: 9, lineHeight: 22, color: "#fff" }}>{language.order.WaitingToActivate}</Text>
                                            </View></TouchableOpacity>
                                        : data.code === 150 ?
                                            <TouchableOpacity>
                                                <View style={{ height: 22, width: 62, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                                    <Text uppercase={false} style={{ fontSize: 9, lineHeight: 22, color: "#fff" }}>{language.order.Waiting}</Text>
                                                </View></TouchableOpacity>
                                            : data.code === 300 ?
                                                <TouchableOpacity>
                                                    <View style={{ height: 22, width: 62, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                                        <Text uppercase={false} style={{ fontSize: 9, lineHeight: 22, color: "#fff" }}>{language.order.Refunded}</Text>
                                                    </View></TouchableOpacity>
                                                : data.has_comment ?
                                                    <TouchableOpacity>
                                                        <View style={{ height: 22, width: 62, backgroundColor: "#c0c0c0", borderRadius: 12, alignItems: "center" }}>
                                                            <Text uppercase={false} style={{ fontSize: 9, lineHeight: 22, color: "#fff" }}>{language.order.Finished}</Text>
                                                        </View></TouchableOpacity>
                                                    : <TouchableOpacity onPress={() => { this.props.navigation.navigate("Comment", { order_id: data.id, name: locale === "cn" ? data.restaurant.c_name : data.restaurant.name }) }}>
                                                        <View style={{ height: 22, width: 62, backgroundColor: "#ff6933", borderRadius: 12, alignItems: "center" }}>
                                                            <Text uppercase={false} style={{ fontSize: 9, lineHeight: 22, color: "#fff" }}>{language.order.GoComment}</Text>
                                                        </View></TouchableOpacity>}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                <View >
                    {orderList.length > 0 && loading ? <Spinner color='#ff6933' /> : noMore ? <Text style={{ textAlign: "center", color: "#afaeae", lineHeight: 40, fontSize: 12 }}>{language.message.Bottom}</Text> : orderList.length > 0 ? <Text style={{ textAlign: "center", color: "#bfbebe", lineHeight: 40, fontSize: 12 }}>{language.message.PullToRefresh}</Text> : null}
                </View>

            </Content>
        );
    }
}
export default connect(state => state.language)(OrderListComponent)