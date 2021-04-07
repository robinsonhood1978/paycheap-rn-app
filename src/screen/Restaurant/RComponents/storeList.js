import React, { Component } from 'react';
import { Text, View, Content, Spinner, Toast } from 'native-base';
import { connect } from 'react-redux';
import { getAllRestaurants } from '../../../api/restaurant'
import StoreListMap from '../../../components/storeListMap'
import {minusScrollHeight} from '../../../utils/utils'
class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noMore: false,
            preventRepeat: false,
            loading: false,
            page: 1,
            limit: 6,
            shopList: [],
            clearing: false
        }
        this.firstStoreFetch = this.firstStoreFetch.bind(this);
        this.handleStoreScroll = this.handleStoreScroll.bind(this);
        this.clearStoreList = this.clearStoreList.bind(this);
        this.getTheRestaurants = this.getTheRestaurants.bind(this)
        this.scrollRender = this.scrollRender.bind(this)
    }

    clearStoreList() {
        this.setState({ shopList: [], clearing: true })
    }

    componentDidMount() {
        this.props.onRefList(this);
    }

    handleStoreScroll(event) {
        if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
            this.scrollRender()
        }
    }

    scrollRender() {
        if (this.state.loading || this.state.noMore) return;
        this.state.loading = true;
        this.setState({ loading: true });
        this.getTheRestaurants(this.state.page, this.state.limit, data => {
            this.state.page = this.state.page + 1;
            data.forEach(el => {
                this.state.shopList.push(el);
            })
            this.setState({ shopList: this.state.shopList });
        })
    }

    getTheRestaurants(page, limit, callback) {
        if (this.state.noMore || this.state.preventRepeat) return;
        this.state.preventRepeat = true;
        const offset = (page - 1) * limit;
        setTimeout(() => {
            const { lat, lng, type, sort } = this.props;
            getAllRestaurants({ offset, limit, type, lat, lng, sort }).then(res => {
                this.props.changeLoading(false);
                //parentLoadingfalse
                if (res.data.status === 200) {
                    const data = res.data.data;
                    this.state.preventRepeat = false;
                    this.state.noMore = data.length < this.state.limit;
                    this.setState({ loading: false });
                    callback(data);
                } else {
                    this.getTheRestaurants(page, limit, callback)
                }

            }).catch(err => {
                Toast.show({
                    text: this.props.language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning",
                    duration: 2500
                });
                this.state.preventRepeat = false;
                this.setState({ loading: false });
            })
        }, 10)
    }

    firstStoreFetch() {
        this.props.changeLoading(true);
        this.clearStoreList();
        //parentLoadingTrue
        this.state.page = 1;
        this.state.noMore = false;
        this.state.preventRepeat = false;
        this.state.loading = false;
        this.getTheRestaurants(this.state.page, this.state.limit, data => {
            this.state.page = this.state.page + 1;
            this.setState({ shopList: data, clearing: false });
            //listen scroll
        });
    }

    render() {
        const { shopList, loading, noMore, clearing } = this.state
        const { language, navigation, locale, notScroll } = this.props;
        return (
            <Content style={{ paddingTop: 3, paddingBottom: 20 }} showsVerticalScrollIndicator={false} scrollEnabled={!notScroll} onScroll={this.handleStoreScroll}>
                <StoreListMap
                    shopList={shopList}
                    navigation={navigation}
                    locale={locale}
                    language={language}
                />
                <View >
                    {shopList.length > 0 && loading ? <Spinner color='#ff6933' /> : noMore ? <Text style={{ textAlign: "center", color: "#afaeae", lineHeight: 40, fontSize: 12 }}>{language.message.Bottom}</Text> : shopList.length > 0 ? <Text style={{ textAlign: "center", color: "#bfbebe", lineHeight: 40, fontSize: 12 }}>{language.message.PullToRefresh}</Text> : null}
                </View>
                {clearing ? <View style={{ height: 1000 }}></View> : null}
            </Content>

        );
    }
}
export default connect(state => state.language)(StoreList)