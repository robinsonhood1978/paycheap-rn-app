import React, { Component } from 'react';
import { Text, Container, Spinner, View, Content, Icon } from 'native-base';
import action from '../../store/action/index';
import { connect } from 'react-redux';
import myGlobalStyleSheet from '../../utils/myGlobalStyleSheet';
import StoreList from './RComponents/storeList';
import { TouchableOpacity, Image, Dimensions } from "react-native"
import MyBlackText from '../../components/myBlackText'
import MySwiper from '../../components/mySwiper'
import AsyncStorage from '@react-native-community/async-storage';
import { minusScrollHeight } from '../../utils/utils'
import TopSwiper from '../../components/topSwiper'
import styleSheet from '../../utils/myGlobalStyleSheet';

const StoreCategory = (type, imgSource, iconSize, text, navigation, lat) => (<TouchableOpacity onPress={() => {
    if (!lat) return
    navigation.navigate("Category", { type })
}}
    style={{ width: "20%", alignItems: "center" }}
>
    <Image source={imgSource} style={iconSize}></Image>
    <MyBlackText style={{ fontSize: 10, textAlign: "center", lineHeight: 20, fontWeight: "700" }}>{text}</MyBlackText>
</TouchableOpacity>)
const IconSize = { width: 36, height: 36 };

class StoreListIndex extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            sort: "default",
            loading: true,
            getLocation: 0,
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").width * 0.2087,
            fixed: false
        }
        this.refStoreList = this.refStoreList.bind(this)
        this.changeStoreSort = this.changeStoreSort.bind(this)
        // this.changeGlobalLanguage = this.changeGlobalLanguage.bind(this)
        this.changeStoreLoading = this.changeStoreLoading.bind(this)
        this.clickGetLocation = this.clickGetLocation.bind(this)
        this.runGetLocation = this.runGetLocation.bind(this)
        this.handleStoreListScroll = this.handleStoreListScroll.bind(this)
    }

    handleStoreListScroll(event) {
        if (this.state.height * 5 -10 < event.nativeEvent.contentOffset.y && this.state.fixed === false)
            this.setState({ fixed: true })
        if (this.state.height * 5 -10 > event.nativeEvent.contentOffset.y && this.state.fixed === true)
            this.setState({ fixed: false })
        if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
            this.childList.scrollRender()
        }
    }

    // changeGlobalLanguage() {
    //     if (this.props.locale === "cn") {
    //         this.props.set_global_locale("en");
    //         this.props.set_global_language();
    //     } else {
    //         this.props.set_global_locale("cn");
    //         this.props.set_global_language();
    //     }
    // }

    clickGetLocation() {
        this.setState({ loading: true })
        if (!this.state.loading)
            this.runGetLocation()
    }

    runGetLocation() {
        this.setState({ loading: true })
        if (this.childList) {
            this.childList.clearStoreList()
        }
        this.props.get_user_address(this.childList.firstStoreFetch)
    }

    refStoreList(ref) {
        this.childList = ref
    }

    changeStoreSort(sort) {
        if (!this.state.loading && this.childList) {
            this.setState({ sort });
            this.childList.firstStoreFetch();
        }
    }

    changeStoreLoading(value) {
        this.setState({ loading: value });
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.need_reget) {
            return { getLocation: nextProps.need_reget }
        } else {
            return { getLocation: 0 }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.getLocation > prevState.getLocation) {
            this.props.get_user_address(this.childList.firstStoreFetch)
        }
    }

    componentDidMount() {
        this.props.get_user_address(this.childList.firstStoreFetch);
        AsyncStorage.getItem("lang").then(lang => {
            if (lang === 'en') {
                this.props.set_global_locale("en");
                this.props.set_global_language();
            } else {
                this.props.set_global_locale("cn");
                this.props.set_global_language();
            }
        });
    }

    render() {
        const { address, lat, lng, navigation, language  } = this.props;
        const { sort, loading, width, height, fixed } = this.state;
        return (
            <Container style={{ ...myGlobalStyleSheet.root, paddingTop: 10 }}>
                <View style={{ paddingTop: 5, borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 15, marginLeft: "4%", height: 30, width: "94%", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={this.clickGetLocation} style={{ width: "20%", height: 30 }}>
                        <View style={{ flexDirection: "row", width: "100%", height: 28 }}>
                            <Image source={require("../../static/img/dingwei.png")} style={{ width: 12, height: 14, marginTop: 7, marginRight: 5 }}></Image>
                            <Text numberOfLines={1} style={{ lineHeight: 30, overflow: "visible", fontSize: 11 }}>{address}</Text>
                        </View></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("SearchStore", { name: language.message.Search }) }}
                        style={{ width: "55%", height: 26 }}>
                        <View style={{ flexDirection: "row", width: "100%", borderWidth: 1, borderColor: "#eee", borderRadius: 7, height: 26 }}>
                            {/* <Text style={{ color: "#ccc", fontSize: 18, lineHeight: 26 }}><Icon style={{ color: "#ccc", fontSize: 18, lineHeight: 26 }} type="FontAwesome" name='search' /></Text> */}
                            <Image source={require("../../static/img/sousuo.png")} style={{ width: 25, height: 25 }}></Image>
                            <Text style={{ color: "#ccc", lineHeight: 25, fontSize: 12 }}>{language.message.InputStore}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.changeGlobalLanguage} style={{ width: "11%", height: 30, flexDirection: "row", justifyContent: "space-between" }}>
                        {locale !== 'en' ? <Image source={require("../../static/img/zhongyingwen.png")} style={{ width: 22, height: 22, marginTop: 4 }}></Image> : <Image source={require("../../static/img/zhongyingwenqiehuan.png")} style={{ width: 22, height: 22, marginTop: 4 }}></Image>}
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => { navigation.navigate("Scan", { name: language.message.Scan }) }} style={{ width: "11%", height: 26, justifyContent: "space-between" }}>
                        <Icon style={{ fontSize: 20, color: "#666", lineHeight: 26 }} type="FontAwesome" name='qrcode' />
                    </TouchableOpacity>
                </View>
                {fixed ? <View
                    style={styleSheet.tabFix}>
                    <TouchableOpacity key='default' onPress={() => this.changeStoreSort('default')}  >
                        <Text style={sort === 'default' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortDefault}</Text></TouchableOpacity>
                    <TouchableOpacity key='sales' onPress={() => this.changeStoreSort('sales')} >
                        <Text style={sort === 'sales' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortSales}</Text></TouchableOpacity>
                    <TouchableOpacity key='distance' onPress={() => this.changeStoreSort('distance')}   >
                        <Text style={sort === 'distance' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortDistance}</Text></TouchableOpacity>
                    <TouchableOpacity key='score' onPress={() => this.changeStoreSort('score')} >
                        <Text style={sort === 'score' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortScore}</Text></TouchableOpacity>
                </View> : null}

                <Content showsVerticalScrollIndicator={false} onScroll={this.handleStoreListScroll} scrollEnabled={!loading}>
                    <View style={{ height: height * 2.1, marginTop: 5, alignItems: "center", borderRadius: 5 }}>
                        <View style={{ width, height: height * 2, borderRadius: 5, }}>
                            <TopSwiper navigation={navigation} language={language} />
                        </View>
                    </View>
                    <View style={{ marginLeft: "3%", marginTop: height * 0.05, width: "94%", height: height * 1.65 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {StoreCategory("Food", require("../../static/img/meishi.png"), IconSize, language.message.Food, navigation, lat)}
                            {StoreCategory("Sweet", require("../../static/img/tiandian.png"), IconSize, language.message.Sweet, navigation, lat)}
                            {StoreCategory("Entertainment", require("../../static/img/yulexiuxian.png"), IconSize, language.message.Entertainment, navigation, lat)}
                            {StoreCategory("Photos", require("../../static/img/hunshasheying.png"), IconSize, language.message.Photos, navigation, lat)}
                            {StoreCategory("Medicines", require("../../static/img/baojianyaopin.png"), IconSize, language.message.Medicines, navigation, lat)}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%" }}>
                            {StoreCategory("Beauty", require("../../static/img/meironglifa.png"), IconSize, language.message.Beauty, navigation, lat)}
                            {StoreCategory("Service", require("../../static/img/shenghuofuwu.png"), IconSize, language.message.Service, navigation, lat)}
                            {StoreCategory("Sport", require("../../static/img/quanminyundong.png"), IconSize, language.message.Sport, navigation, lat)}
                            {StoreCategory("Trips", require("../../static/img/lvyoushenghuo.png"), IconSize, language.message.Trips, navigation, lat)}
                            {StoreCategory("More", require("../../static/img/faxiangengduo.png"), IconSize, language.message.More, navigation, lat)}
                        </View>
                    </View>
                    <View style={{ height: height * 1.15, borderRadius: 5, alignItems: "center" }}>
                        <View style={{ width, height, borderRadius: 5 }}>
                            <MySwiper navigation={navigation} />
                        </View>
                    </View>
                    {fixed ? null : <View
                        style={styleSheet.tab}>
                        <TouchableOpacity key='default' onPress={() => this.changeStoreSort('default')}  >
                            <Text style={sort === 'default' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortDefault}</Text>
                            </TouchableOpacity>
                        <TouchableOpacity key='sales' onPress={() => this.changeStoreSort('sales')} >
                            <Text style={sort === 'sales' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortSales}</Text>
                            </TouchableOpacity>
                        <TouchableOpacity key='distance' onPress={() => this.changeStoreSort('distance')}   >
    <Text style={sort === 'distance' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortDistance}</Text>
    </TouchableOpacity>
                        <TouchableOpacity key='score' onPress={() => this.changeStoreSort('score')} >
                            <Text style={sort === 'score' ? styleSheet.tabActiveButtonText : styleSheet.tabButtonText}>{language.sort.SortScore}</Text>
                            </TouchableOpacity>
                    </View>}

                    {loading ? <View style={{ width: "100%", marginTop: "12%" }}><Spinner color="#ff6933" /></View> : null}
                    <StoreList
                        onRefList={this.refStoreList}
                        changeLoading={this.changeStoreLoading}
                        navigation={navigation}
                        sort={sort}
                        lat={lat}
                        lng={lng}
                        notScroll={true}
                    ><View style={{ height: 800 }}></View></StoreList></Content>
            </Container >
        );
    }
}



// {fixed ? null : <View
//     style={myGlobalStyleSheet.tab}>
//     <TouchableOpacity onPress={() => this.changeStoreSort('default')}  >
//         <Text style={sort === 'default' ? myGlobalStyleSheet.tabActiveButtonText : myGlobalStyleSheet.tabButtonText}>{language.sort.SortDefault}</Text></TouchableOpacity>
//     <TouchableOpacity onPress={() => this.changeStoreSort('sales')} >
//         <Text style={sort === 'sales' ? myGlobalStyleSheet.tabActiveButtonText : myGlobalStyleSheet.tabButtonText}>{language.sort.SortSales}</Text></TouchableOpacity>
//     {/* <TouchableOpacity key='distance' onPress={() => this.changeStoreSort('distance')}   >
//     <Text style={sort === 'distance' ? myGlobalStyleSheet.tabActiveButtonText : myGlobalStyleSheet.tabButtonText}>{language.sort.SortDistance}</Text></TouchableOpacity> */}
//     <TouchableOpacity onPress={() => this.changeStoreSort('score')} >
//         <Text style={sort === 'score' ? myGlobalStyleSheet.tabActiveButtonText : myGlobalStyleSheet.tabButtonText}>{language.sort.SortScore}</Text></TouchableOpacity>
// </View>}

export default connect(state => { return { ...state.location, ...state.language } }, { ...action.location, ...action.language })(StoreListIndex)
