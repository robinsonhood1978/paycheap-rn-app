import React, { Component } from 'react';
import { View, Text, Container, Content, Item, Input, Label, Form, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native'
import { changeUserPassword } from '../../../api/user'
import { md5, textRegexFunction } from '../../../utils/utils'
import { connect } from 'react-redux';
import { Keyboard } from 'react-native'
import action from '../../../store/action';

class UserChangePassword extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      preventRepeat: false
    };
    this.handleUserOldPassword = this.handleUserOldPassword.bind(this);
    this.handleUserNewPassword = this.handleUserNewPassword.bind(this);
    this.handleUserConfirmPassword = this.handleUserConfirmPassword.bind(this);
    this.submitChange = this.submitChange.bind(this)
  }

  handleUserOldPassword(v) {
    this.setState({ oldPassword: v })
  }

  handleUserNewPassword(v) {
    this.setState({ newPassword: v })
  }

  handleUserConfirmPassword(v) {
    this.setState({ confirmPassword: v })
  }
  submitChange() {
    if (this.state.preventRepeat) return;
    Keyboard.dismiss();
    let { oldPassword, newPassword, confirmPassword } = this.state;
    const { language } = this.props;
    if (newPassword !== confirmPassword) {
      Toast.show({
        text: language.home.ShouldSame,
        buttonText: 'Okay',
        type: "warning"
      });
      return;
    }

    if (!textRegexFunction(oldPassword, false, 0, 1000, 'password', mes => {
      Toast.show({
        text: language.home.OldPassword + language.regex[mes],
        buttonText: 'Okay',
        type: "warning"
      });
    })) return;

    if (!textRegexFunction(newPassword, false, 0, 1000, 'password', mes => {
      Toast.show({
        text: language.home.NewPassword + language.regex[mes],
        buttonText: 'Okay',
        type: "warning"
      });
    })) return;
    this.setState({ preventRepeat: true })
    this.props.global_action_loading()
    newPassword = md5(newPassword);
    oldPassword = md5(oldPassword);
    changeUserPassword({ newPassword, oldPassword }).then(res => {
      this.setState({ preventRepeat: false })
      this.props.global_action_loading(false)
      if (res.data.status === 200) {
        Toast.show({
          text: language.home.ChangeSuccessfully,
          buttonText: 'Okay',
          type: "success"
        });
        this.props.navigation.navigate("Setting", { name: this.props.language.home.Setting });
      }
      else if (res.data.status === -1) {
        Toast.show({
          text: language.home.WrongOld,
          buttonText: 'Okay',
          type: "warning"
        });
      }
      else {
        Toast.show({
          text: language.home.ChangeFailed,
          buttonText: 'Okay',
          type: "warning"
        });
      }
    }).catch(err => {
      this.setState({ preventRepeat: false });
      this.props.global_action_loading(false)
      Toast.show({
        text: language.home.ChangeFailed,
        buttonText: 'Okay',
        type: "warning"
      });
    })
  }

  render() {
    const { language } = this.props
    const { oldPassword, newPassword, confirmPassword } = this.state
    return (
      <Container><Content style={{ width: "100%" }} scrollEnabled={false}>
        <Form style={{ marginTop: 4, marginLeft: "3%", width: "94%" }}>
          <Item style={{ width: "92%" }} stackedLabel>
            <Label style={{ color: "#000", fontSize: 12 }}>{language.home.OldPassword}</Label>
            <Input
              style={{ color: "#000", fontSize: 12 }}
              placeholder={language.home.OldPassword}
              placeholderTextColor={'#e5e5e5'}
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={this.handleUserOldPassword}
            />
          </Item>
          <Item style={{ width: "92%" }} stackedLabel>
            <Label style={{ color: "#000", fontSize: 12 }}>{language.home.NewPassword}</Label>
            <Input
              style={{ color: "#000", fontSize: 12 }}
              placeholder={language.home.NewPassword}
              placeholderTextColor={'#e5e5e5'}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={this.handleUserNewPassword}
            />
          </Item>
          <Item style={{ width: "92%" }} stackedLabel>
            <Label style={{ color: "#000", fontSize: 12 }}>{language.home.ConfirmPassword}</Label>
            <Input
              style={{ color: "#000", fontSize: 12 }}
              placeholder={language.home.ConfirmPassword}
              placeholderTextColor={'#e5e5e5'}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={this.handleUserConfirmPassword}
            />
          </Item>
          <TouchableOpacity onPress={this.submitChange}><View style={{ marginTop: "8%", width: "92%", marginLeft: "4%", backgroundColor: "#ff6933", height: 40, textAlign: "center", borderRadius: 10 }} >
            <Text style={{ textAlign: "center", lineHeight: 40, fontSize: 16, color: "#fff" }}>{language.home.ConfirmChange}</Text>
          </View></TouchableOpacity>
        </Form>
      </Content></Container>
    );
  }
}
export default connect(state => state.language, action.globalLoading)(UserChangePassword)