import React, { Component } from 'react';
import { Text, Container, Content, View, Spinner, Toast, Icon, Item, Label, Input } from 'native-base';
import { getOneFood } from '../../api/restaurant'
import { getFoodComment } from '../../api/product'
import { Image, TouchableOpacity } from 'react-native';
import { removeNickname, checkUserAuth } from '../../utils/auth';
import action from '../../store/action/index';
import { connect } from 'react-redux';
import { postSubmitOrder } from '../../api/order'
import { NavigationEvents } from "react-navigation";
import MyGrayText from '../../components/myGrayText'
import CommentsListMap from '../../components/commentListMap'
import Stars from "../../components/stars"
import {minusScrollHeight} from '../../utils/utils'
class ProductPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.getParam("name"), }
  };
  constructor(props) {
    super(props);
    this.state = {
      food_id: this.props.navigation.getParam('food_id'),
      food: {},
      restaurant: {},
      loading: true,
      hasUser: false,
      useWallet: false,
      wallet_price: "",
      commentLoading: false,
      noMore: false,
      page: 1,
      limit: 5,
      commentList: [],
      preventRepeat: false,
      timer: null,
      color: "#ff6933"
    }
    this.userMyWallet = this.userMyWallet.bind(this)
    this.submitProductOrder = this.submitProductOrder.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
    this.calculateAmount = this.calculateAmount.bind(this)
    this.handleCommentScroll = this.handleCommentScroll.bind(this);
    this.getProductComments = this.getProductComments.bind(this)
  }

  checkAuth() {
    checkUserAuth(() => { this.setState({ hasUser: false }); },
      () => {
        this.setState({ hasUser: true });
        this.props.get_user_info();
      })
  }


  handleCommentScroll(event) {

    if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
      if (this.state.commentLoading || this.state.noMore) return
      this.state.commentLoading = true;
      this.getProductComments(this.state.page, this.state.limit, data => {
        this.state.page = this.state.page + 1;
        data.forEach(el => {
          this.state.commentList.push(el);
        })
        this.setState({ commentList: this.state.commentList })
      })
    }
  }

  getProductComments(page, limit, callback) {
    if (this.state.noMore || this.state.preventRepeat) return;
    this.state.preventRepeat = true;
    this.setState({ commentLoading: true })
    const offset = page - 1;
    const food_id = this.props.navigation.getParam('food_id');
    getFoodComment({ offset, limit, food_id }).then(res => {
      const data = res.data.data;
      this.state.preventRepeat = false;
      this.state.noMore = data.length < this.state.limit;
      this.setState({ commentLoading: false })
      callback(data);
    })
  }

  submitProductOrder() {
    if (this.state.preventRepeat) return;

    if (this.state.hasUser) {
      this.state.preventRepeat = true;
      const { restaurant, wallet_price, food } = this.state;
      const { language } = this.props;
      postSubmitOrder({ restaurant_id: restaurant.id, food, wallet_price }).then(res => {
        this.state.preventRepeat = false;
        if (res.data.status === 200) {
          this.props.navigation.navigate("Pay", { order_id: res.data.order_id });
        }
        else if (res.data.status === 401) {
          this.props.navigation.navigate('Login', { name: language.home.Setting });
          removeNickname();
        } else {
          Toast.show({
            text: language.alert.Error,
            buttonText: 'Okay',
            type: "warning"
          });
        }
      }).catch(err => {
        this.state.preventRepeat = false;
        Toast.show({
          text: language.alert.Error,
          buttonText: 'Okay',
          type: "warning"
        });
      })
    } else {
      this.props.navigation.navigate('Login', { router: "Product", name: this.props.language.home.Login });
    }
  }

  calculateAmount(v) {
    const { food } = this.state;
    const { wallet } = this.props;
    if (food.price) {
      if (isNaN(v + '1')) { v = v.replace(/\D+/, ''); }
      if (v.indexOf('.') > 0 && v.split('.')[1].length > 2) {
        v = Number(v).toFixed(2).toString();
      }
      if (v > wallet) v = wallet;
      if (v > food.price) v = food.price;
      this.setState({ wallet_price: v.toString() })
    }
  }

  userMyWallet() {
    const { useWallet } = this.state;
    this.setState({ useWallet: !useWallet })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  componentDidMount() {
    this.state.timer = setInterval(() => {
      if (this.state.color === "#ff6933") {
        this.setState({ color: "#6f6e6e" })
      }
      else if (this.state.color === "#6f6e6e") {
        this.setState({ color: "#ff6933" })
      }
      else {
        this.setState({ color: "#ff6933" })
      }
    }, 1000);
    const { food_id } = this.state;

    getOneFood({ food_id }).then(res => {
      this.setState({ loading: false, food: res.data.food, restaurant: res.data.restaurant })
    })
    this.getProductComments(this.state.page, this.state.limit, data => {
      this.state.page = this.state.page + 1;
      this.setState({ commentList: data });
    })
  }

  render() {
    const { color, food, restaurant, loading, hasUser, useWallet, wallet_price, commentList, noMore, commentLoading } = this.state;
    const { wallet, language, locale } = this.props;
    return (
      <Container>
        <NavigationEvents onWillFocus={this.checkAuth} />
        {loading ? <Spinner color='#ff6933' /> : <Container><Content onScroll={this.handleCommentScroll} showsVerticalScrollIndicator={false} style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{locale === "cn" ? food.c_name : food.name}</Text>
            <Text>${food.price}</Text>
          </View>
          <View style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Image style={{ width: 180, height: 180, borderRadius: 15 }} source={{ uri: food.pic_url }} />
          </View>
          <View style={useWallet ? { height: 126, flexDirection: "column", justifyContent: "flex-start", backgroundColor: "#fff" } : { height: 26, flexDirection: "column", justifyContent: "space-between", backgroundColor: "#fff" }}>
            {useWallet ? <View style={{ width: "100%" }}>
              <View style={{ height: 100, width: "100%" }}>
                <Item inlineLabel>
                  <Label >{language.pay.MyWallet}: ${wallet}</Label>
                  <Input disabled />
                </Item>
                <Item inlineLabel>
                  <Label >{language.pay.UseWallet}</Label>
                  <Input autoFocus value={wallet_price} onChangeText={v => { this.calculateAmount(v) }} />
                </Item>
              </View>
            </View> : null}
            <View style={{ height: 40, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", marginTop: 10, alignItems: "flex-start", justifyContent: "center" }}>
                {hasUser ?
                  <TouchableOpacity onPress={this.userMyWallet}><View style={{ height: 30, marginTop: -8, marginRight: 8 }} >
                    <Icon type="FontAwesome5" name="wallet" style={useWallet ? { lineHeight: 30, color: "#ddd" } : { lineHeight: 30, color }} />
                  </View></TouchableOpacity> : null}
                <Text style={{ fontSize: 18, color: "#ff6933", lineHeight: 20 }}>${(food.price - wallet_price).toFixed(2).toString()} </Text>
                <Text style={{ fontSize: 16, textDecorationLine: "line-through", lineHeight: 18 }}> ${food.original_price}</Text>
              </View>
              <View style={{ marginTop: 6 }}>
                <TouchableOpacity onPress={this.submitProductOrder} >
                  <View style={{ width: 110, backgroundColor: "#ff6933", height: 24, textAlign: "center", borderRadius: 12 }} >
                    <Text style={{ textAlign: "center", color: "#fff", lineHeight: 24 }}>{language.product.BuyNow}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: "5%", paddingTop: "3%", borderTopWidth: 1, borderTopColor: "#eee" }}>
            {/* <MyGrayText>{language.product.Score}: {food.comment_score}</MyGrayText> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Stars score={food.comment_score} iconStyle={{ fontSize: 15, color: "#ff6933", lineHeight: 20 }} />
              <MyGrayText> </MyGrayText><MyGrayText>{food.comment_score}</MyGrayText>
            </View>
            <Text style={{ fontSize: 14, lineHeight: 28 }}>{language.product.Details}</Text>
            <MyGrayText>{language.product.StockNumber}: {food.stock_number}</MyGrayText>
            <MyGrayText>{language.product.Description}: {locale === "cn" ? food.c_description : food.description}</MyGrayText>
          </View>
          <View style={{ marginTop: "5%" }}>
            <Text style={{ fontSize: 14, lineHeight: 28 }}>{language.product.Reminder}</Text>
            <MyGrayText>{language.product.AvailableDate}: {food.start_date.split("T")[0]}- {food.end_date.split("T")[0]}</MyGrayText>
            <MyGrayText>{language.product.Business}: {locale === "cn" ? restaurant.c_description : restaurant.description}</MyGrayText>
            <MyGrayText>{language.product.OpenTime}: {restaurant.shopping_time_start}-{restaurant.shopping_time_end}</MyGrayText>
            <MyGrayText>{language.product.Policy}: {locale === "cn" ? food.c_policy : food.policy}</MyGrayText>
            <MyGrayText style={{ fontSize: 10 }}>{language.product.Rules}:{"\n"}{locale === "cn" ? food.c_rules.map((item, index) => <MyGrayText key={index}  >{item}{"\n"} </MyGrayText>) : food.rules.map((item, index) => <MyGrayText key={index}  >{item}{"\n"} </MyGrayText>)} </MyGrayText>
          </View><View style={{ marginTop: "5%" }}>
            <Text style={{ fontSize: 14, lineHeight: 28 }}>{language.product.Comments}</Text>
            <CommentsListMap comments={commentList}
              language={this.props.language}
            />
            {!loading && commentLoading ? <Spinner color='#ff6933' /> : noMore && commentList.length > 0 ? <Text style={{ textAlign: "center", color: "#afaeae", lineHeight: 50, fontSize: 12 }}>{language.message.Bottom}</Text> : null}
          </View></Content>
        </Container>}
      </Container>
    );
  }
}
export default connect(state => { return { ...state.person, ...state.language } }, action.person)(ProductPage)