import React, { Component } from 'react';
import { View, Text, Container, Button, Content, Spinner, Toast, Icon } from 'native-base';
import { getStore, collectOneRestaurant, uncollectOneRestaurant } from '../../api/restaurant'
import { checkUserAuth } from '../../utils/auth';
import { Platform, TouchableOpacity, Image, Linking } from "react-native"
import { connect } from 'react-redux';
import myGlobalStyleSheet from "../../utils/myGlobalStyleSheet"
import Stars from "../../components/stars"
import MyGrayText from '../../components/myGrayText'
import PhotoSwiper from '../../components/storePhotoSwiper'
import CommentsListMap from '../../components/commentListMap'

class StorePage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name"),
            headerLeft: <Button style={{ marginBottom: Platform.OS === 'ios' ? 12 : 6, marginLeft: -7 }} onPress={() => { navigation.navigate('StoreList') }} transparent><Icon type="FontAwesome" name='angle-left' style={{ color: "#fff", fontSize: Platform.OS === 'ios' ? 38 : 30 }} /></Button>,
            headerStyle: {
                height: 40,
                backgroundColor: '#ff6933',
                color:"#fff"
            },
            headerTintColor: '#fff',
            headerRight: <Button onPress={navigation.getParam("collect")} transparent>{navigation.getParam("collected") ?
                <Image source={require('../../static/img/shoucanghuang.png')} style={{ width: 23, height: 23, marginRight: 14 }}></Image> :
                <Image source={require('../../static/img/shoucang.png')} style={{ width: 23, height: 23, marginRight: 14 }}></Image>
            }</Button>
        }
    };
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
        this.state = {
            store_id: this.props.navigation.getParam('store_id'),
            // store_id: 4,
            restaurant: {},
            foods: [],
            comments: [],
            loading: true,
            sort: 1,
            photos: [],
            detailY: 0,
            commentY: 0,
            buyY: 0,
            collected: false,
            preventDefault: false
        };
        this.checkAuth = this.checkAuth.bind(this)
        this.pressPhoneNumber = this.pressPhoneNumber.bind(this)
        this.pressStoreAddress = this.pressStoreAddress.bind(this)
        this.changePart = this.changePart.bind(this)
        this.handlePartScroll = this.handlePartScroll.bind(this);
        this.collectStore = this.collectStore.bind(this)
    }

    collectStore() {
        const { collected, loading, preventDefault, store_id } = this.state;
        const { language } = this.props;
        if (loading || preventDefault) return;
        this.state.preventDefault = true
        checkUserAuth(() => {
            Toast.show({
                text: language.alert.PleaseLogin,
                buttonText: 'Okay',
                type: "warning"
            })
            this.setState({ preventDefault: false });
        },
            () => {
                if (collected) {
                    uncollectOneRestaurant({ restaurant_id: store_id }).then(res => {
                        this.setState({ preventDefault: false });
                        if (res.data.status === 200) {
                            this.setState({ collected: false });
                            this.props.navigation.setParams({ collected: false });
                        }
                    }).catch(res => {
                        this.setState({ preventDefault: false });
                    })
                }
                else {
                    collectOneRestaurant({ restaurant_id: store_id }).then(res => {
                        this.setState({ preventDefault: false });
                        if (res.data.status === 200) {
                            this.setState({ collected: true });
                            this.props.navigation.setParams({ collected: true });
                        }
                    }).catch(res => {
                        this.setState({ preventDefault: false });
                    })
                }
            }
        )
    }

    componentDidMount() {
        this.props.navigation.setParams({ collect: this.collectStore, collected: false });
        const { store_id, photos } = this.state;
        getStore({ restaurant_id: store_id }).then(res => {
            photos.push(res.data.restaurant.pic_url);
            res.data.restaurant.photos.forEach(item => { photos.push(item) });
            this.setState({
                photos,
                restaurant: res.data.restaurant,
                foods: res.data.foods,
                comments: res.data.comments,
                loading: false
            })
            if (res.data.isCollected) {
                this.setState({
                    collected: true
                })
                this.props.navigation.setParams({ collected: true });
            }
        })
    }

    changePart(sort) {
        const { buyY, detailY, commentY } = this.state;
        switch (sort) {
            case 2:
                {
                    this.contentRef.current.wrappedInstance.scrollToPosition(0, commentY)
                }
                break;
            case 3:
                {
                    this.contentRef.current.wrappedInstance.scrollToPosition(0, detailY)
                }
                break;
            default:
                {
                    this.contentRef.current.wrappedInstance.scrollToPosition(0, buyY)
                }
                break;
        }
        //something
    }


    handlePartScroll(event) {
        if (this.state.sort !== 2 && event.nativeEvent.contentOffset.y + 20 >= this.state.commentY && event.nativeEvent.contentOffset.y + 20 < this.state.detailY) {
            this.setState({ sort: 2 });
        }
        else if (this.state.sort !== 3 && event.nativeEvent.contentOffset.y + 20 > this.state.detailY) {
            this.setState({ sort: 3 });
        }
        else if (this.state.sort !== 1 && event.nativeEvent.contentOffset.y + 20 < this.state.commentY) {
            this.setState({ sort: 1 });
        }
    }

    pressPhoneNumber() {
        const { restaurant } = this.state;
        const url = "tel://" + restaurant.call_center
        Linking.openURL(url).catch(err => {
            Toast.show({
                text: this.props.language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            })
            console.log(err)
        })
    }

    pressStoreAddress() {
        const { restaurant } = this.state;
        const url = Platform.OS === 'ios' ? `http://maps.apple.com/?ll=${restaurant.lat},${restaurant.lng}` : `geo:${restaurant.lat},${restaurant.lng}`;
        Linking.openURL(url).catch(err => {
            Toast.show({
                text: this.props.language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            })
        })
    }

    checkAuth() {
        const { store_id, restaurant } = this.state;
        const { locale, language } = this.props;
        checkUserAuth(
            () => {
                this.props.navigation.navigate('Login', { router: "Store", query: { store_id }, name: language.home.Login });
            },
            () => {
                this.props.navigation.navigate('Confirm', { restaurant, name: locale === "cn" ? restaurant.c_name : restaurant.name })
            }
        )
    }

    render() {
        const { restaurant, foods, comments, loading, sort, photos } = this.state
        const { language, locale } = this.props
        return (
            <Container>
                {loading ? <Spinner color="#ff6933" /> : <Container style={{ width: "94%", marginLeft: "3%" }}>
                    <View style={{ width: "100%", flexDirection: 'row', marginTop: 8, marginBottom: 13 }}>
                        <View style={{ width: "70%" }}>
                            <View><Text style={{ fontSize: 17,fontWeight:"700" }}>{locale === "cn" ? restaurant.c_name : restaurant.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                <Stars score={restaurant.wm_poi_score} iconStyle={{ fontSize: 14, color: "#ff9d00", lineHeight: 20 }} />
                                <MyGrayText>  </MyGrayText>
                                <MyGrayText style={{fontSize:11.5}}> {language.store.CommentNumber}: {restaurant.comment_number}</MyGrayText>
                            </View>
                            {/* <MyGrayText>{language.store.OpenTime}: {restaurant.shopping_time_start}-{restaurant.shopping_time_end}</MyGrayText> */}
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginTop: 3 }} onPress={this.pressPhoneNumber}>
                                <Image source={require('../../static/img/shangpudianhua.png')} style={{ width: 11, height: 11, paddingRight: 10,marginRight:10 }}></Image>
                                <MyGrayText style={{ color: "#000" ,fontSize:11.5}}>{restaurant.call_center}</MyGrayText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, width: "77%" }} onPress={this.pressStoreAddress}>
                                <Image source={require('../../static/img/shangpudingwei.png')} style={{ width: 11, height:14, paddingRight: 10,marginRight:10 }}></Image>
                                <MyGrayText style={{ color: "#000" ,fontSize:11.5}}>{restaurant.address}</MyGrayText>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Image source={{ uri: restaurant.pic_url }} style={{ width: 82, height: 63, borderRadius: 4 }} />
                        </View>
                    </View>
                    <View style={myGlobalStyleSheet.tabOrder}>
                        <TouchableOpacity transparent style={sort === 1 ? myGlobalStyleSheet.tabActiveButton : myGlobalStyleSheet.tabButton} onPress={() => this.changePart(1)}  >
                            <Text uppercase={false} style={{ color: sort === 1 ? "#ff6933" : "#000", fontSize: 14, textAlign: "center" }}>{language.store.DiscountInfo}</Text></TouchableOpacity>
                        <TouchableOpacity transparent style={sort === 2 ? myGlobalStyleSheet.tabActiveButton : myGlobalStyleSheet.tabButton} onPress={() => this.changePart(2)} >
                            <Text uppercase={false} style={{ color: sort === 2 ? "#ff6933" : "#000", fontSize: 14, textAlign: "center" }}>{language.store.UserComments}</Text></TouchableOpacity>
                        <TouchableOpacity transparent style={sort === 3 ? myGlobalStyleSheet.tabActiveButton : myGlobalStyleSheet.tabButton} onPress={() => this.changePart(3)}   >
                            <Text uppercase={false} style={{ color: sort === 3 ? "#ff6933" : "#000", fontSize: 14, textAlign: "center" }}>{language.store.StoreInfo}</Text></TouchableOpacity>
                    </View>
                    <Content showsVerticalScrollIndicator={false} onScroll={this.handlePartScroll} ref={this.contentRef}>
                        <View onLayout={e => { this.setState({ buyY: e.nativeEvent.layout.y }) }}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: "700" }}>{language.store.PayInStore}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                    <MyGrayText style={{ lineHeight: 28,fontSize:10.5 }}>{language.store.DisPayIn}：{(1 - restaurant.discount).toFixed(2) * 100 + "% "}{language.store.Off}</MyGrayText>
                                    <View style={{ width: "16%" }}>
                                        <TouchableOpacity onPress={this.checkAuth}>
                                            <View style={{ width: 52, backgroundColor: "#ff6933", height: 22, textAlign: "center", borderRadius: 3 }} >
                                                <Text style={{ textAlign: "center", color: "#fff", lineHeight: 22, fontSize: 11 }}>{language.store.Pay}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: "700" }}>{language.store.PayCheap}</Text>
                                {foods.map(data =>
                                    <View key={data.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                        <View style={{ width: "10%" }} >
                                            <Image source={{ uri: data.pic_url }} style={{ width: 40, height: 40, borderRadius: 3 }} />
                                        </View>
                                        <View style={{ width: "84%", flexDirection: 'row', marginTop: 15, paddingBottom: "4%", borderBottomColor: '#eee', borderBottomWidth: 1 }} >
                                            <View style={{ width: "81%", justifyContent: "center" }} >
                                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                                    <View style={{ justifyContent: "center" ,width:"50%"}}>
                                                        <Text style={{ fontSize: 12 }}>{locale === "cn" ? data.c_name : data.name}</Text>
                                                        <MyGrayText style={{ lineHeight: 15,fontSize:10.5 }}>{language.store.Description}: {locale === "cn" ? data.c_description : data.description}</MyGrayText>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginRight: 10, alignItems: "center" }}>
                                                        <Text style={{ textDecorationLine: 'line-through', fontSize: 13, color: "#6f6e6e" }}> ${data.original_price}</Text>
                                                        <Text style={{ fontSize: 14, color: "#ff6933" }}>${data.price}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: "19%", justifyContent: "center" }} >
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', { food_id: data.id, name: locale === "cn" ? restaurant.c_name : restaurant.name })}>
                                                    <View style={{ width: 52, backgroundColor: "#ff6933", height: 22, borderRadius: 3 }} >
                                                        <Text style={{ textAlign: "center", color: "#fff", lineHeight: 22, fontSize: 11 }}>{language.store.Buy}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View></View>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View onLayout={e => { this.setState({ commentY: e.nativeEvent.layout.y }) }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 20, alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700" }} >{language.store.UserComments} </Text>
                                    <MyGrayText style={{ fontSize: 9 }}> ({restaurant.comment_number})</MyGrayText>
                                </View>
                                {comments && comments.length === 5 ? <TouchableOpacity onPress={() => { this.props.navigation.navigate("AllComments", { restaurant_id: restaurant.id, name: locale === "cn" ? restaurant.c_name : restaurant.name }) }}>
                                    <Text style={{ fontSize: 9, color: "#ff6933" }}>{language.store.MoreComments}</Text>
                                </TouchableOpacity> : null}
                            </View>
                            <CommentsListMap
                                comments={comments}
                                language={language}
                            />
                        </View>
                        <View onLayout={e => { this.setState({ detailY: e.nativeEvent.layout.y }) }}>
                            <View style={{ marginTop: 20, marginBottom: 15 }}>
                                <Text style={{ fontSize: 14, fontWeight: "700" }} >{language.store.StoreInfo}</Text>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Business}:</Text>
                                <MyGrayText>{locale === "cn" ? restaurant.c_business_days : restaurant.business_days}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.OpenTime}:</Text>
                                <MyGrayText>{restaurant.shopping_time_start}-{restaurant.shopping_time_end}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 4, paddingTop: 4, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Total}:</Text>
                                <MyGrayText>{restaurant.month_sales}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Bulletin}:</Text>
                                <MyGrayText>{locale === "cn" ? restaurant.c_bulletin : restaurant.bulletin}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.CommentScore}:</Text>
                                <Stars score={restaurant.wm_poi_score} iconStyle={{ fontSize: 13, color: "#ff9d00" }} />
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Address}:</Text>
                                <MyGrayText >{restaurant.address}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Phone}:</Text>
                                <MyGrayText>{restaurant.call_center}</MyGrayText>
                            </View>
                            <View style={{ paddingBottom: 6, borderBottomColor: "#eee", borderBottomWidth: 1, marginTop: 6 }}>
                                <Text style={{ fontSize: 12, lineHeight: 18 }}>{language.store.Photos}:</Text>
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ width: 300 }}>
                                        <PhotoSwiper photos={photos} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>}
            </Container>
        );
    }
}

export default connect(state => state.language)(StorePage)