import React, { Component } from 'react';
import { View, Text, Container, Content, Icon, Button } from 'native-base';
import { TouchableOpacity, Image } from 'react-native'
import { userLogout } from '../../../api/user';
import { removeNickname } from '../../../utils/auth';
import action from '../../../store/action/index';
import { connect } from 'react-redux';
import { Platform } from 'react-native'

class SettingPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name"),
            headerLeft: <Button style={{ marginBottom: Platform.OS === 'ios' ? 12 : 6, marginLeft: -7 }} onPress={() => { navigation.navigate('Home') }} transparent><Icon type="FontAwesome" name='angle-left' style={{ color: "#ff6933", fontSize: Platform.OS === 'ios' ? 38 : 30 }} /></Button>,
            headerRight:
                <TouchableOpacity onPress={navigation.getParam("changeGlobalLanguage")} style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between", width: 40 }}>
                    {navigation.getParam("locale") !== 'en' ? <Image source={require("../../../static/img/zhongyingwen.png")} style={{ width: 22, height: 22, marginTop: 4 }}></Image> : <Image source={require("../../../static/img/zhongyingwenqiehuan.png")} style={{ width: 22, height: 22, marginTop: 4 }}></Image>}
                </TouchableOpacity>
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            preventRepeat: false
        };
        this.changeGlobalLanguage = this.changeGlobalLanguage.bind(this);
        this.MyLogout = this.MyLogout.bind(this);
    }

    changeGlobalLanguage() {
        if (this.props.locale === "cn") {
            this.props.set_global_locale("en");
            this.props.set_global_language();
        } else {
            this.props.set_global_locale("cn");
            this.props.set_global_language();
        }
        setTimeout(() => {
            this.props.navigation.setParams({ locale: this.props.locale });
            this.props.navigation.setParams({ name: this.props.language.home.Setting });
        }, 1);
    }

    MyLogout() {
        if (this.state.preventRepeat) return;
        this.setState({ preventRepeat: true })
        this.props.global_action_loading()
        userLogout().then(res => {
            this.setState({ preventRepeat: false })
            this.props.global_action_loading(false)
            return removeNickname();
        }).then(res => {
            this.props.set_photo('https://app.pay-cheap.com/static/img/user.png');
            this.props.navigation.navigate("Home")
        }).catch(err => {
            this.setState({ preventRepeat: false });
            this.props.navigation.navigate("Home")
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ changeGlobalLanguage: this.changeGlobalLanguage });
        this.props.navigation.setParams({ locale: this.props.locale });
    }

    render() {
        const { language } = this.props
        return (
            <Container><Content style={{ width: "94%", marginLeft: "3%" }} scrollEnabled={false}>
                <View style={{ marginTop: 12 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Profile", { name: language.home.Profile }) }}>
                        <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16,  }}>{language.home.Profile}</Text>
                            <Icon type="FontAwesome" name='angle-right' style={{ color: "#ccc", fontSize: 18 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("BindingPhone", { name: language.home.BindingPhone }) }}>
                        <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16,  }}>{language.home.BindingPhone}</Text>
                            <Icon type="FontAwesome" name='angle-right' style={{ color: "#ccc", fontSize: 18 }} />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate("About", { name: language.home.AboutPaycheap }) }}>
                        <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16,  }}>{language.home.AboutPaycheap}</Text>
                            <Icon type="FontAwesome" name='angle-right' style={{ color: "#ccc", fontSize: 18 }} />
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("ChangePassword", { name: language.home.ChangePassword }) }}>
                        <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16,  }}>{language.home.ChangePassword}</Text>
                            <Icon type="FontAwesome" name='angle-right' style={{ color: "#ccc", fontSize: 18 }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.MyLogout}><View style={{ marginTop: "8%", width: "94%", marginLeft: "3%", backgroundColor: "#ff6933", height: 36, textAlign: "center", borderRadius: 10 }} >
                        <Text style={{ fontSize: 16, textAlign: "center", lineHeight: 36, color: "#fff" }}>{language.home.LogOut}</Text>
                    </View></TouchableOpacity>
                </View>
            </Content></Container>
        );
    }
}
export default connect(state => state.language, { ...action.language, ...action.person, ...action.globalLoading })(SettingPage)