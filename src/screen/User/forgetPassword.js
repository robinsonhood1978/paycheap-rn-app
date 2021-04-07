import React, { Component } from 'react';
import { Text, Container, Input, Item, Button, Content, Picker, Form, Toast } from 'native-base';
import { getUserVerify, userForget } from '../../api/user';
import { md5, textRegexFunction } from '../../utils/utils'
import { NavigationEvents } from "react-navigation";
import { connect } from 'react-redux';
import { Keyboard, Dimensions } from 'react-native'
import action from '../../store/action';

class ForgetMyPassword extends Component {
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
      isVisible: false,
      width: Dimensions.get("window").width
    }
    this.handleThePassword = this.handleThePassword.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleVerifyCode = this.handleVerifyCode.bind(this);
    this.userGetVerifyCode = this.userGetVerifyCode.bind(this);
    this.submitChangePassword = this.submitChangePassword.bind(this);
    this.regexThePhone = this.regexThePhone.bind(this)
  }
  regexThePhone() {
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

  handleVerifyCode(value) {
    this.setState({ verify: value })
  }

  handlePhoneNumber(value) {
    this.setState({ phone: value });
  }

  handleThePassword(value) {
    this.setState({ password: value });
  }

  userGetVerifyCode() {
    if (this.state.disVerify) return;
    Keyboard.dismiss();
    if (this.regexThePhone()) return;
    this.setState({ disVerify: true, disTime: 60 });
    this.state.count = setInterval(() => {
      if (this.state.disTime < 1) {
        clearInterval(this.state.count);
        this.setState({ disVerify: false, disTime: 0 });
      } else {
        this.setState({ disTime: this.state.disTime - 1 });
      }
    }, 1000);
    const { language } = this.props;
    const { stateCode, phone } = this.state;
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

  componentWillUnmount() {
    clearInterval(this.state.count);
  }

  combineStateAndPhone(stateCode, phone) {
    if (stateCode === '+64' && phone[0] === '0') {
      phone = phone.substring(1)
    }
    return stateCode + phone
  }

  submitChangePassword() {
    if (this.state.preventRepeat) return;
    Keyboard.dismiss();
    if (this.regexThePhone()) return;
    const { stateCode, phone, password, verify } = this.state;
    const { language } = this.props;
    if (!textRegexFunction(verify, false, 4, 4, 'wholeNumber', mes => {
      Toast.show({
        text: language.home.VerifyCode + language.regex[mes],
        buttonText: 'Okay',
        type: "warning"
      });
    })) return;
    if (!textRegexFunction(password, false, 0, 1000, 'password', mes => {
      Toast.show({
        text: language.home.Password + language.regex[mes],
        buttonText: 'Okay',
        type: "warning"
      });
    })) return;
    this.setState({ preventRepeat: true });
    this.props.global_action_loading()
    userForget({
      phone: this.combineStateAndPhone(stateCode, phone),
      password: md5(password),
      verify: verify
    }).then(res => {
      this.setState({ preventRepeat: false });
      this.props.global_action_loading(false)
      if (res.data.status === 200) {
        Toast.show({
          text: language.alert.PasswordChanged,
          buttonText: 'Okay',
          type: "success"
        });
        this.props.navigation.navigate('Login', { name: this.props.language.home.Setting });
      } else if (res.data.status === -1) {
        Toast.show({
          text: language.alert.NoUser,
          buttonText: 'Okay',
          type: "warning"
        });
      }
      else if (res.data.status === -2) {
        Toast.show({
          text: language.alert.VerifyExpired,
          buttonText: 'Okay',
          type: "warning"
        });
      } else if (res.data.status === -3) {
        Toast.show({
          text: language.alert.VerifyWrong,
          buttonText: 'Okay',
          type: "warning"
        });
      }
    }).catch(err => {
      this.props.global_action_loading(false)
      this.setState({ preventRepeat: false });
      Toast.show({
        text: language.alert.Error,
        buttonText: 'Okay',
        type: "warning"
      });
    });
  }

  render() {
    const { language } = this.props
    const { stateCode, phone, password, verify, disTime, disVerify, width } = this.state;
    const Get = language.home.VerifyCode;;
    return (
      <Container>
        <NavigationEvents onWillFocus={this.check} />
        <Content>
          <Form style={{ marginTop: 35, width: "95%" }}>
            <Item style={{ height: 40 }}>
              <Item style={{ width: width * 0.27, borderBottomColor: "#fff" }}>
                <Picker
                  style={{ width: width * 0.27 }}
                  mode="dropdown"
                  selectedValue={stateCode}
                  onValueChange={this.handleStateChange} >
                  <Picker.Item label="+64" value="+64" />
                  <Picker.Item label="+86" value="+86" />
                  <Picker.Item label="+1" value="+1" />
                </Picker>
              </Item>
              <Input style={{ width: width * 0.63, fontSize: 14 }} placeholder={language.home.PleasePhone}
                value={phone}
                placeholderTextColor={'#e5e5e5'}
                onChangeText={this.handlePhoneNumber} />
            </Item>
            <Item style={{ height: 40 }}>
              <Input
                style={{ fontSize: 14 }}
                placeholder={language.home.PleaseVerify}
                value={verify}
                placeholderTextColor={'#e5e5e5'}
                onChangeText={this.handleVerifyCode}
              />
              <Button disabled={disVerify} transparent onPress={this.userGetVerifyCode}>
                <Text style={{ fontSize: 12, color: "#ff3923" }}> {disVerify ? disTime : Get}</Text>
              </Button>
            </Item>
            <Item style={{ height: 40 }}>
              <Item style={{ width: width * 0.7, borderBottomColor: "#fff" }}>
                <Input
                  style={{ fontSize: 14 }}
                  placeholder={language.home.PleasePassword}
                  placeholderTextColor={'#e5e5e5'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={this.handleThePassword}
                />
              </Item>
            </Item>
            <Button
              block
              style={{
                width: "94%",
                marginLeft: "5%",
                backgroundColor: '#ff6933',
                marginTop: 50,
                height: 40,
                marginBottom: 6
              }} onPress={this.submitChangePassword}>
              <Text style={{
                fontSize: 18,
                lineHeight: 24,
                textTransform: 'capitalize'
              }}>{language.home.ConfirmChange}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default connect(state => state.language, action.globalLoading)(ForgetMyPassword)