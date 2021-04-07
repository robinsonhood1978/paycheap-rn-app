import React, { Component } from 'react';
import { Text, Container, Button, Content, View, Icon } from 'native-base';
import myGlobalStyleSheet from '../../utils/myGlobalStyleSheet';
import { NavigationEvents } from "react-navigation";
import { checkUserAuth } from '../../utils/auth';
import action from '../../store/action/index';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, Dimensions } from 'react-native'
// import MyGrayText from '../../components/myGrayText'

// const childIcon = (url, imgSource, text, navigation) => (<TouchableOpacity onPress={() => {
//   navigation.navigate(url, { name: text })
// }}
//   style={{ width: "25%", alignItems: "center" }}
// >
//   <Image source={imgSource} style={{ width: 30, height: 30, marginBottom: 6 }} />
//   <MyGrayText style={{ textAlign: "center", fontSize: 12, lineHeight: 14 }}>{text}</MyGrayText>
// </TouchableOpacity>)

const childPageLine = (url, imgSource, text, navigation, line) => (
  <TouchableOpacity style={{ marginLeft: "3%", justifyContent: "flex-start", flexDirection: "row", alignItems: "center", paddingTop: 8,  }} onPress={() => { navigation.navigate(url, { name: text }) }}>
    <Image source={imgSource} style={{ width: 16, height:16 }}></Image>
    <View style={{ marginTop: "2%", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "91%", marginLeft: "3%", paddingBottom: 13, borderBottomColor: line ? "#eee" : "#fff", borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 13, color: "#6f6e6e", fontWeight: "700" }}>{text}</Text>

      <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6", fontSize: 20 }} />
    </View>
  </TouchableOpacity>
)

const childFlexPage = (url, number, text, navigation, line) => (<TouchableOpacity style={{ width: "33%", alignItems: "center", borderLeftColor: line ? "#ddd" : "#fff", borderLeftWidth: 1 }} onPress={() => { navigation.navigate(url, { name: text }) }}>
  <Text style={{ fontSize: 13, color: "#6e6f6f", lineHeight: 20 }}>{text}</Text>
  <Text style={{ fontSize: 18 }}>{number ? number : 0}</Text>
</TouchableOpacity>)

class HomePage extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      preventRepeat: false,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width * 0.552
    }

    this.checkAuth = this.checkAuth.bind(this);
  }



  checkAuth() {
    checkUserAuth(() => { this.setState({ username: "" }); },
      username => {
        this.props.get_user_info();
        this.setState({ username });
      })
  }

  render() {
    const { username, width, height } = this.state
    const { avatar, wallet, navigation, language, cNumber, rNumber } = this.props
    const source = avatar ? { uri: avatar } : require("../../static/img/boy.png")

    return (
      <Container style={{ backgroundColor: "#ededed" }}>
        <Image source={require('../../static/img/back.png')} style={{
          position: "absolute",
          width,
          height,
          left: 0,
          top: 0,
          backgroundColor: 'rgba(0,0,0,0)',
        }}></Image>
        <Content style={{ ...myGlobalStyleSheet.root }} scrollEnabled={false}>
          <NavigationEvents onWillFocus={this.checkAuth} />
          <View style={{ marginTop: 8 }}><Text style={{ textAlign: "center", fontWeight: "700" }}>{language.home.HomePage}</Text></View>
          {username ?
            <View style={{ height: 80, flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate("Setting", { name: language.home.Setting }) }}
                style={{ alignItems: "center", flexDirection: "row", marginLeft: "4%", flex: 5 }}  >
                <Image source={source} style={{ width: 44, height: 44, borderRadius: 22 }}></Image>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 13, fontWeight: "700" }}> {username} </Text>
                  <Text style={{ fontSize: 13, fontWeight: "700" }}> {language.home.Wallet}: ${wallet} </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                navigation.navigate('Activity', { name: language.homeList.Activity })
              }}
                style={{ alignItems: "center", paddingLeft: "15%", flexDirection: "row", flex: 1 }}  >
                <Image source={require('../../static/img/xiaoxi.png')} style={{ width: 16, height: 16 }}></Image></TouchableOpacity>
            </View>
            :
            <View style={{ height: 80, flexDirection: "row", justifyContent: "center" }}>
              {/* <Image source={source} style={{ width: 44, height: 44, borderRadius: 22 }}></Image> */}
              <Button
                style={{ marginTop: 10 }}
                transparent
                onPress={() => this.props.navigation.navigate('Login', { name: language.home.Login })}>
                <Text style={{ color: "#000", fontWeight: "700", fontSize: 18 }}>{language.home.LoginRegister}</Text>
              </Button></View>}
          <View style={{ height: 74, justifyContent: "center", backgroundColor: "#fff", width: "92%", marginLeft: "4%", borderRadius: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", height: 40 }}>
              {childFlexPage("Coupons", 0, language.homeList.Coupons, navigation)}
              {childFlexPage("Collection", rNumber, language.homeList.MyCollections, navigation, true)}
              {childFlexPage("Comments", cNumber, language.homeList.MyComments, navigation, true)}
              <TouchableOpacity style={{ width: "33%", alignItems: "center" }} onPress={() => { navigation.navigate("Coupons", { name: language.homeList.Coupons }) }}>
                <Text style={{ fontSize: 11, color: "#6e6f6f", lineHeight: 20 }}>{language.homeList.Coupons}</Text>
                <Text style={{ fontSize: 20 }}>0</Text>
              </TouchableOpacity>
              <View style={{ borderLeftColor: "#ddd", borderLeftWidth: 1, width: "33%", alignItems: "center" }}>
                <Text style={{ fontSize: 11, color: "#6e6f6f", lineHeight: 20 }}>收藝</Text>
                <Text style={{ fontSize: 20 }}>{rNumber}</Text>
              </View>
              <View style={{ borderLeftColor: "#ddd", borderLeftWidth: 1, width: "33%", alignItems: "center" }}>
                <Text style={{ fontSize: 11, color: "#6e6f6f", lineHeight: 20 }}>评论</Text>
                <Text style={{ fontSize: 20 }}>{cNumber}</Text>
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {childIcon("Collection", require("../../static/img/shoucang.png"), language.homeList.MyCollections, navigation)}
            {childIcon("Coupons", require("../../static/img/hongbaokaquan.png"), language.homeList.Coupons, navigation)}
            {childIcon("Comments", require("../../static/img/pingjia.png"), language.homeList.MyComments, navigation)}
            {childIcon("Activity", require("../../static/img/xiaoxihuodong.png"), language.homeList.Activity, navigation)}
          </View> */}
          <View style={{ justifyContent: "space-between", backgroundColor: "#fff", marginTop: 20 }}>
            {/* {childPageLine("Invite", require("../../static/img/yaoqing.png"), language.homeList.MyFriends, navigation, true)} */}
            {childPageLine("OrderList", require("../../static/img/yaoqing.png"), language.homeList.MyOrder, navigation, false, true)}
            {/* {childPageLine("About", require("../../static/img/guanyu.png"), language.homeList.Listen, navigation)} */}
            {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6" }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6" }} />
                </View>
              </TouchableOpacity> */}

            {/* {childIcon("About", require("../../static/img/banbenxinxi.png"), language.homeList.About, navigation)}
              {childIcon("Business", require("../../static/img/shangjiajiameng.png"), language.homeList.BusinessJoin, navigation)}
              {childIcon("Service", require("../../static/img/fuwuzhongxin.png"), language.homeList.CustomerService, navigation)}
              {childIcon("Invite", require("../../static/img/yaoqinghaoyou.png"), language.homeList.MyFriends, navigation)} */}
          </View>
          <View style={{ marginTop: 25 }}>
            <View style={{ justifyContent: "space-between", backgroundColor: "#fff" }}>
              {childPageLine("Service", require("../../static/img/fuwu.png"), language.homeList.CustomerService, navigation, true)}
              {childPageLine("Business", require("../../static/img/hezuo.png"), language.homeList.BusinessJoin, navigation)}
              {/* <TouchableOpacity style={{ marginLeft: "3%", justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }} onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <Image source={require('../../static/img/fuwu.png')} style={{ width: 14, height: 14 }}></Image>
                <View style={{ marginTop: "2%", alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "91%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 12, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6", fontSize: 20 }} />
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6" }} />
                </View>
              </TouchableOpacity> */}

              {/* {childIcon("About", require("../../static/img/banbenxinxi.png"), language.homeList.About, navigation)}
              {childIcon("Business", require("../../static/img/shangjiajiameng.png"), language.homeList.BusinessJoin, navigation)}
              {childIcon("Service", require("../../static/img/fuwuzhongxin.png"), language.homeList.CustomerService, navigation)}
              {childIcon("Invite", require("../../static/img/yaoqinghaoyou.png"), language.homeList.MyFriends, navigation)} */}
            </View>
            <View style={{ justifyContent: "space-between", backgroundColor: "#fff", marginTop: 20 }}>
              {/* {childPageLine("Invite", require("../../static/img/yaoqing.png"), language.homeList.MyFriends, navigation, true)} */}
              {/* {childPageLine("OrderList", require("../../static/img/yaoqing.png"), language.homeList.MyOrder, navigation, true)} */}
              {childPageLine("About", require("../../static/img/guanyu.png"), language.homeList.Listen, navigation)}
              {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6" }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 8, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                  <Text style={{ fontSize: 20, color: "#6f6e6e" }}>{language.home.Profile}</Text>
                  <Icon type="FontAwesome" name='angle-right' style={{ color: "#e6e6e6" }} />
                </View>
              </TouchableOpacity> */}

              {/* {childIcon("About", require("../../static/img/banbenxinxi.png"), language.homeList.About, navigation)}
              {childIcon("Business", require("../../static/img/shangjiajiameng.png"), language.homeList.BusinessJoin, navigation)}
              {childIcon("Service", require("../../static/img/fuwuzhongxin.png"), language.homeList.CustomerService, navigation)}
              {childIcon("Invite", require("../../static/img/yaoqinghaoyou.png"), language.homeList.MyFriends, navigation)} */}
            </View>
          </View>
          {/* <View style={{ paddingTop: "8%", height: height * 1.3, borderRadius: 5, alignItems: "center" }}>
            <View style={{ width, height, borderRadius: 5 }}>
              <Swiper />
            </View>
          </View> */}
          {/* <TouchableOpacity style={{ paddingTop:20, height: height * 1.3, borderRadius: 5, alignItems: "center" }} onPress={() => { navigation.navigate('UseApp', { name: language.homeList.Instruction }) }}>
            <View style={{ width, height, borderRadius: 5, alignItems: "center" }}>
              <Image source={require('../../static/img/h1.jpeg')} style={{ width, height: width * 0.41 }}>
              </Image>
            </View>
          </TouchableOpacity> */}
        </Content>
      </Container>
    );
  }
}

export default connect(state => { return { ...state.person, ...state.language } }, { ...action.person, ...action.globalLoading })(HomePage)