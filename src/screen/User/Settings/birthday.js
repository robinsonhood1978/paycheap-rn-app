import React, { Component } from 'react';
import { View, Text, Container, Content, DatePicker, Button, Toast } from 'native-base';
import action from '../../../store/action/index';
import { connect } from 'react-redux';
import myGlobalStyleSheet from '../../../utils/myGlobalStyleSheet';
import { changeUserBirthday } from '../../../api/user';

class MyBirthday extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };
    
    constructor(props) {
        super(props);
        this.state = {
            birthday: new Date(2000, 1, 1),
            preventRepeat: false
        };
        this.setBirthdayDate = this.setBirthdayDate.bind(this)
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
    }

    setBirthdayDate(birthday) {
        this.setState({ birthday })
    }

    handleBirthdayChange() {
        if (this.state.preventRepeat)
            return;
        this.state.preventRepeat = true;
        const { language } = this.props;
        const birthday = this.state.birthday.toLocaleString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
        changeUserBirthday({ birthday }).then(res => {
            this.state.preventRepeat = false;
            if (res.data.status === 200) {
                Toast.show({
                    text: language.home.BirthdayIsChanged,
                    buttonText: 'Okay',
                    type: "success"
                })
                this.props.set_birthday(birthday);
                setTimeout(() => { this.props.navigation.navigate("Profile", { name: this.props.language.home.Profile }) }, 1)
            } else {
                Toast.show({
                    text: language.home.BirthdayChangedFailed,
                    buttonText: 'Okay',
                    type: "warning"
                })
            }
        }).catch(err => {
            this.state.preventRepeat = false;
            Toast.show({
                text: language.home.BirthdayChangedFailed,
                buttonText: 'Okay',
                type: "warning"
            })
        })
    }

    componentDidMount() {
        const { birthday } = this.props;
        this.setState({ birthday: birthday[0] === '-' ? this.state.birthday : new Date(birthday) })
    }

    render() {
        const { birthday: birthdayString, language } = this.props;
        const { birthday } = this.state;
        return (
            <Container><Content style={{ width: "100%" }}>
                <View style={{ alignItems: "center", marginTop: 100 }}>
                    <DatePicker
                        defaultDate={birthday}
                        minimumDate={new Date(1900, 1, 1)}
                        maximumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={birthdayString}
                        textStyle={{ color: "#ff6933", fontSize: 28 }}
                        placeHolderTextStyle={{ color: "#6f6e6e", fontSize: 28 }}
                        onDateChange={this.setBirthdayDate}
                        disabled={false}
                    />
                    <Button block style={{ ...myGlobalStyleSheet.fullButton, marginTop: 50 }} onPress={this.handleBirthdayChange}>
                        <Text style={myGlobalStyleSheet.fullButtontext}>{language.home.ConfirmChange}</Text>
                    </Button>
                </View>
            </Content></Container>
        );
    }
}

export default connect(state => { return { ...state.person, ...state.language } }, action.person)(MyBirthday)