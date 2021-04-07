import React, { Component } from 'react';
import { View, Text, Container, Input, Item, Button, Content, Picker, Form, Toast } from 'native-base';
import { checkUserAuth, setNickname } from '../../utils/auth';
import { userLogin, getUserVerify } from '../../api/user';
import { md5, textRegexFunction } from '../../utils/utils'
import { NavigationEvents } from "react-navigation";
import { connect } from 'react-redux';
import { Keyboard, Dimensions } from 'react-native'
import action from '../../store/action';

class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      stateCode: "+64",
      verify: "",
      preventRepeat: false,
      disVerify: false,
      disTime: 0,
      count: null,
      width: Dimensions.get("window").width
    }
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.handleUserPhone = this.handleUserPhone.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleChangeVerify = this.handleChangeVerify.bind(this);
    this.clickGetVerify = this.clickGetVerify.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.regexUserPhone = this.regexUserPhone.bind(this)
  }

  regexUserPhone() {
    return !textRegexFunction(this.state.phone, false, 0, 1000, this.state.stateCode, mes => {
      Toast.show({
        text: this.props.language.home.Phone + this.props.language.regex[mes],
        buttonText: 'Okay',
        type: "warning"
      });
    })
  }

  handleStateChange(value) {
    this.setState({
      stateCode: value
    });
  }

  handleChangeVerify(value) {
    this.setState({ verify: value })
  }

  handleUserPhone(value) {
    this.setState({ phone: value });
  }

  handleUserPassword(value) {
    this.setState({ password: value });
  }

  clickGetVerify() {
    if (this.state.disVerify) return;
    Keyboard.dismiss();
    if (this.regexUserPhone()) return;
    this.state.disVerify = true;
    this.setState({ disVerify: true, disTime: 60 })
    this.state.count = setInterval(() => {
      if (this.state.disTime < 1) {
        clearInterval(this.state.count);
        this.setState({ disVerify: false, disTime: 0 })
      } else {
        this.setState({ disTime: this.state.disTime - 1 })
      }
    }, 1000);
    const { stateCode, phone } = this.state;
    const { language } = this.props;
    getUserVerify({ phone: this.combineStateAndPhone(stateCode, phone), status: 1 }).then(res => {
      if (res.data.status === 200) {
        Toast.show({
          text: language.alert.VerifySent,
          buttonText: 'Okay',
          type: "success"
        })
      } else {
        clearInterval(this.state.count);
        this.setState({ disVerify: false, disTime: 0 })
        Toast.show({
          text: language.alert.VerifyFailed,
          buttonText: 'Okay',
          type: "warning"
        })
      }
    }).catch(err => {
      clearInterval(this.state.count);
      this.setState({ disVerify: false, disTime: 0 })
      Toast.show({
        text: language.alert.Error,
        buttonText: 'Okay',
        type: "warning"
      })
    })
  }

  checkAuth() {
    checkUserAuth(() => { },
      username => {
        this.props.navigation.navigate('Home')
      })
  }

  componentWillUnmount() {
    clearInterval(this.state.count);
  }

  combineStateAndPhone(stateCode, phone) {
    if (stateCode === '+64' && phone[0] === '0') {
      phone = phone.substring(1)
    }
    return stateCode + phone
  }

  handleUserLogin() {
    if (this.state.preventRepeat) return;
    Keyboard.dismiss();
    if (this.regexUserPhone()) return;
    const { stateCode, phone, password, verify } = this.state;
    const { language } = this.props;
    if (!password || (password && verify)) {
      if (!textRegexFunction(verify, false, 4, 4, 'wholeNumber', mes => {
        Toast.show({
          text: language.home.VerifyCode + language.regex[mes],
          buttonText: 'Okay',
          type: "warning"
        });
      })) return;
    }
    if (!verify || (password && verify)) {
      if (!textRegexFunction(password, false, 0, 1000, 'password', mes => {
        Toast.show({
          text: language.home.Password + language.regex[mes],
          buttonText: 'Okay',
          type: "warning"
        });
      })) return;
    }

    this.setState({ preventRepeat: true });
    this.props.global_action_loading()
    userLogin({ phone: this.combineStateAndPhone(stateCode, phone), password: password ? md5(password) : password, verify }).then(res => {

      this.setState({ preventRepeat: false });
      this.props.global_action_loading(false)
      if (res.data.status === 200) {
        this.props.order_refresh()
        setNickname(res.data.username).then(res => {
          if (this.props.navigation.getParam('router')) {
            this.props.navigation.navigate(this.props.navigation.getParam('router'));
          }
          else {
            this.props.navigation.navigate('Home');
          }
        });
      }
      else if (res.data.status === -1) {
        Toast.show({
          text: language.alert.NoPassword,
          buttonText: 'Okay',
          type: "warning"
        })
      }
      else if (res.data.status === -2) {
        Toast.show({
          text: language.alert.VerifyWrong,
          buttonText: 'Okay',
          type: "warning"
        })
      }
      else if (res.data.status === -3) {
        Toast.show({
          text: language.alert.VerifyExpired,
          buttonText: 'Okay',
          type: "warning"
        })
      }
      else if (res.data.status === -4) {
        Toast.show({
          text: language.alert.RegisterFailed,
          buttonText: 'Okay',
          type: "warning"
        })
      }
      else if (res.data.status === -5) {
        Toast.show({
          text: language.alert.PasswordWrong,
          buttonText: 'Okay',
          type: "warning"
        })
      } else if (res.data.status === -6) {
        Toast.show({
          text: language.alert.LoginFailed,
          buttonText: 'Okay',
          type: "warning"
        })
      } else if (res.data.status === -7) {
        Toast.show({
          text: language.alert.Disabled,
          buttonText: 'Okay',
          type: "warning"
        })
      } else {
        Toast.show({
          text: language.alert.Error,
          buttonText: 'Okay',
          type: "warning"
        })
      }
    }).catch(err => {
      this.setState({ preventRepeat: false });
      this.props.global_action_loading(false)
      Toast.show({
        text: language.alert.Error,
        buttonText: 'Okay',
        type: "warning"
      })
    })
  }

  render() {
    const { stateCode, phone, password, verify, disTime, disVerify, width } = this.state;
    const { language } = this.props
    const Get = language.home.VerifyCode;
    return (
      <Container>
        <NavigationEvents onWillFocus={this.checkAuth} />
        <Content scrollEnabled={false}  >
          <View style={{ marginTop: 25, width: "90%", marginLeft: "5%" }} >
            <Text style={{ fontSize: 18, color: "#ff6933" }}>{language.home.Welcome}</Text>
          </View>
          <Form style={{ marginTop: 15, width: "94%" }}>
            <Item style={{ height: 40 }}>
              <Item style={{ width: width * 0.27, borderBottomColor: "#fff" }}>
                <Picker
                  style={{ width: width * 0.27 }}
                  mode="dropdown"
                  selectedValue={stateCode}
                  onValueChange={this.handleStateChange}
                >
                  <Picker.Item label="+64" value="+64" />
                  <Picker.Item label="+86" value="+86" />
                  <Picker.Item label="+1" value="+1" />
                </Picker>
              </Item>
              <Input style={{ width: width * 0.63, fontSize: 14 }}
                placeholder={language.home.PleasePhone}
                placeholderTextColor={'#e5e5e5'}
                value={phone}
                onChangeText={this.handleUserPhone} />
            </Item>
            <Item style={{ height: 40 }}>
              <Input
                style={{ fontSize: 14 }}
                placeholder={language.home.PleasePassword}
                placeholderTextColor={'#e5e5e5'}
                secureTextEntry={true}
                value={password}
                onChangeText={this.handleUserPassword}
              />
            </Item>
            <Item style={{ height: 40 }}>
              <Item style={{ width: width * 0.7, borderBottomColor: "#fff" }}>
                <Input
                  style={{ fontSize: 14 }}
                  placeholder={language.home.PleaseVerify}
                  placeholderTextColor={'#e5e5e5'}
                  value={verify}
                  onChangeText={this.handleChangeVerify}
                />
              </Item>
              <Button disabled={disVerify} transparent onPress={this.clickGetVerify}>
                <Text style={{ fontSize: 12, color: "#ff3923" }}> {disVerify ? disTime : Get}</Text>
              </Button>
            </Item>
            <Button block style={{
              width: "94%",
              marginLeft: "5%",          
              backgroundColor: '#ff6933',
              marginTop:50,
              height:40,
              marginBottom:6
            }} onPress={this.handleUserLogin}>
              <Text style={{
                fontSize: 18,
                lineHeight: 24,
                textTransform: 'capitalize'
              }}>{language.home.Login}</Text>
            </Button>
            <View style={{ marginLeft: "3%", width: "94%", marginTop: "1%" }}>
              <Text style={{ fontSize: 10, color: "#6f6e6e", textAlign: "center" }}>{language.home.Hint}
              </Text></View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}><View></View>
              <Button style={{ marginRight: "5%" }} transparent onPress={() => { this.props.navigation.navigate("ForgetPassword", { name: language.home.ForgetPassword }) }}>
                <Text style={{ fontSize: 12, color: "#ff3923" }}>{language.home.ForgetPassword}</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(state => state.language, { ...action.order, ...action.globalLoading })(LoginPage)