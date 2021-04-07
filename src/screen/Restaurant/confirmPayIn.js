import React, { Component } from 'react';
import { Text, Container, Input, Item,   Content, View, Label, Spinner, Icon,  Toast } from 'native-base';
import action from '../../store/action/index';
import { connect } from 'react-redux';
import { NavigationEvents } from "react-navigation";
import { checkUserAuth } from '../../utils/auth';
import { postPayStore } from '../../api/order';
import { TouchableOpacity,Keyboard } from "react-native"

class ConfrimPayInStore extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.getParam("name"), }
  };
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.navigation.getParam('restaurant'),
      total_price: "",
      useWallet: false,
      wallet_price: "",
      preventRepeat: false,
      timer: null,
      color: "#ff6933"
    }
    this.enterTotalAmount = this.enterTotalAmount.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
    this.submitPayInOrder = this.submitPayInOrder.bind(this)
    this.userMyWallet = this.userMyWallet.bind(this)
    this.calculateAmount = this.calculateAmount.bind(this)
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
}
  componentDidMount() {
    this.state.timer = setInterval(() => {
      if (this.state.color === "#ff6933") {
        this.setState({ color: "#6f6e6e" })
      } 
      else if(this.state.color==="#6f6e6e"){
        this.setState({color:"#ff6933"})
      }
      else {
        this.setState({ color: "#ff6933" })
      }
    }, 1000);
  }

  userMyWallet() {
    const { useWallet } = this.state;
    this.setState({ useWallet: !useWallet })
  }


  calculateAmount(v) {
    const { total_price, restaurant } = this.state;
    const { wallet } = this.props;
    if (isNaN(v)) {
      v = v.replace(/\D+/, '').toString();
    }
    if (v.toString().indexOf('.') > 0 && v.toString().split('.')[1].length > 2) {
      v = Number(v).toFixed(2).toString();
    }
    if (v > wallet) v = wallet.toFixed(2).toString();
    if (v > (total_price * restaurant.discount)) v = (total_price * restaurant.discount).toFixed(2).toString();
    this.setState({ wallet_price: v })
  }


  enterTotalAmount(v) {
    const { wallet_price, restaurant } = this.state;
    if (isNaN(v)) {
      v = v.replace(/\D+/, '');
    }
    if (v.indexOf('.') > 0 && v.split('.')[1].length > 2) {
      v = Number(v).toFixed(2).toString();
    }
    if (v > 10000) v = 10000;
    if (v < (wallet_price / restaurant.discount)) this.setState({ wallet_price: (v * restaurant.discount).toString() });
    this.setState({ total_price: v.toString() })

  }

  submitPayInOrder() {
    if (this.state.preventRepeat) return;
    Keyboard.dismiss();
    const { total_price } = this.state;
    const { language } = this.props;
    if (!total_price || total_price < 1) {
      Toast.show({
        text: language.alert.TooLess,
        buttonText: 'Okay',
        type: "warning"
      });
      return;
    }
    this.state.preventRepeat = true;
    const { restaurant, wallet_price } = this.state;
    postPayStore({ restaurant_id: restaurant.id, discountPrice: total_price * restaurant.discount, wallet_price })
      .then(res => {
        this.state.preventRepeat = false;
        if (res.data.status === 200) {
          console.log(res.data)
          this.props.navigation.navigate("Pay", { order_id: res.data.order_id })
        }
        else if (res.data.status === 401) {
          this.props.navigation.navigate('Login', { name: language.home.Login })
          console.log(res.data)
          removeNickname()
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
  }

  checkAuth() {
    checkUserAuth(() => {
      this.props.navigation.goBack();
      this.props.navigation.navigate('Login', { name: this.props.language.home.Login });
    },
      () => {
        this.props.get_user_info();
      })
  }

  render() {
    const { color,restaurant, total_price, useWallet, wallet_price } = this.state
    const { wallet, language } = this.props;
    return (<Container>
      <NavigationEvents onWillFocus={this.checkAuth} />
      {restaurant ? <Container><Content showsVerticalScrollIndicator={false}>
        <View style={{ width: "96%", marginLeft: "2%" }}>
          <Item inlineLabel>
            <Label >{language.store.TotalPrice}: </Label>
            <Input autoFocus value={total_price} onChangeText={v => { this.enterTotalAmount(v) }} />
          </Item>
          <Item inlineLabel>
            <Label >{language.store.DiscountInfo}: </Label>
            <Input disabled value={((1 - restaurant.discount).toFixed(2) * 100).toString() + "% " + language.store.Off} />
          </Item>
          <Item inlineLabel>
            <Label >{language.store.ActuallyPay}: </Label>
            <Input disabled value={"$" + (total_price * restaurant.discount).toFixed(2).toString()} />
          </Item>
          <View style={useWallet ? { height: 150, flexDirection: "column", justifyContent: "flex-start", backgroundColor: "#fff",marginTop:"3%" } : { height: 50,marginTop:"3%", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#fff" }}>
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
              <View style={{ flexDirection: "row",  marginTop: 10, alignItems: "flex-start", justifyContent: "center" }}>
              <TouchableOpacity onPress={this.userMyWallet}><View style={{ height: 30, marginTop: -8,marginRight:8 }} >
                  <Icon type="FontAwesome5" name="wallet" style={useWallet ? { lineHeight: 30, color: "#ddd" } : { lineHeight: 30, color  }} />
                </View></TouchableOpacity>
                <Text style={{ fontSize: 18, color: "#ff6933", lineHeight:20 }}>{language.order.ActuallyPay} {"$" + ((total_price * restaurant.discount) - wallet_price).toFixed(2).toString()} </Text>
              </View>
              <View style={{  marginTop: 6 }}>
                <TouchableOpacity onPress={this.submitPayInOrder} >
                  <View style={{ width: 110, backgroundColor: "#ff6933", height: 26, textAlign: "center", borderRadius: 12 }} >
                    <Text style={{ textAlign: "center", color: "#fff", lineHeight: 26 }}>{language.order.MakeOrder}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{borderTopWidth:1,borderTopColor:"#eee" }}>
        </View>
        </View>
      
      </Content>

      </Container> : <Spinner />}
    </Container>
    );
  }
}


export default connect(state => { return { ...state.person, ...state.language } }, action.person)(ConfrimPayInStore)