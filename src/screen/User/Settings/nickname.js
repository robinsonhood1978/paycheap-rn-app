import React, { Component } from 'react';
import { View, Text, Container, Content, Input, Button, Toast, Item, Label } from 'native-base';
import { getNickname, setNickname } from '../../../utils/auth';
import { changeNickName } from '../../../api/user';
import myGlobalStyleSheet from '../../../utils/myGlobalStyleSheet';
import { connect } from 'react-redux';
import { textRegexFunction } from '../../../utils/utils'
import {Keyboard} from 'react-native'
import action from '../../../store/action';

class UserNickname extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            preventRepeat: false
        };
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleNickname = this.handleNickname.bind(this);
        this.regexUserNickName=this.regexUserNickName.bind(this);
    }

    regexUserNickName(){
        return !textRegexFunction(this.state.username, false, 2, 20, null, mes => {       
            Toast.show({
                text: this.props.language.home.NickName+this.props.language.regex[mes],
                buttonText: 'Okay',
                type: "warning"
              });
        })
    }

    handleNicknameChange() {
        if (this.state.preventRepeat) return;   
        Keyboard.dismiss();   
        if(this.regexUserNickName()) return;
        this.setState({ preventRepeat: true });
        this.props.global_action_loading()
        const {language}=this.props;
        changeNickName(this.state).then(res => {
            this.setState({ preventRepeat: false })
            this.props.global_action_loading(false)
            if (res.data.status === 200) {
                Toast.show({
                    text: language.home.NickNameIsChanged,
                    buttonText: 'Okay',
                    type: "success"
                })
                setNickname(this.state.username).then(res => {
                    this.props.navigation.navigate("Profile",  { name: this.props.language.home.Profile })
                })
            }
            else{
                Toast.show({
                    text: language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning"
                  });
            }
        }).catch(err=>{
            this.setState({ preventRepeat: false })
            this.props.global_action_loading(false)
            Toast.show({
                text: language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
              });
        })
    }
    handleNickname(username) {
        this.setState({ username })
    }

    componentDidMount() {
        getNickname().then(username => {
            this.setState({ username })
        })
    }

    render() {
        const { username } = this.state;
        const {language} = this.props;
        return (
            <Container>
                 <Content style={{ width: "100%" }} scrollEnabled={false}>  
                    <View style={{ marginTop: "12%", width: "94%", marginLeft: "3%" }}>
                        <Item inlineLabel>
                            <Label   style={{ color: "#000", fontSize: 15 }}>{language.home.NickName}</Label>
                            <Input
                              style={{ color: "#000", fontSize: 15 }}
                            placeholder={language.home.NickName}
                            onBlur={this.regexUserNickName}
                                value={username}
                                onChangeText={this.handleNickname}
                            />
                        </Item>
                    </View>
                    <Button block style={{ ...myGlobalStyleSheet.fullButton, marginTop: 40,height:32 }} onPress={this.handleNicknameChange}>
                        <Text style={{...myGlobalStyleSheet.fullButtontext,fontSize:16}}>{language.home.ConfirmChange}</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default connect(state => state.language,action.globalLoading )(UserNickname)