import React, { Component } from 'react';
import { View, Text, Container, Content, Toast } from 'native-base';
import config from '../../../../config'
import { connect } from 'react-redux';
import { getNickname } from '../../../utils/auth';
import { TouchableOpacity, Image } from 'react-native'
import { NavigationEvents } from "react-navigation";
import ImagePicker from 'react-native-image-picker'
import { uploadImage } from '../../../api/upload'
import { changeUserAvatar } from '../../../api/user'
import action from '../../../store/action/index';

class UserProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      file: null,
      pic_url: "",
      source: null,
      loading: false,
    };
    this.checkNickName = this.checkNickName.bind(this);
    this.selectUserPhoto = this.selectUserPhoto.bind(this);
  }


  selectUserPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
      }
    };
    this.setState({ loading: true })
    this.props.global_action_loading()
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        this.setState({ loading: false })
        this.props.global_action_loading(false)
        console.log('User cancelled photo picker');
      } else if (response.error) {
        this.setState({ loading: false })
        this.props.global_action_loading(false)
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({ source });
        if (!response.fileName)
          response.fileName = new Date().getTime() + ".jpeg";
        uploadImage(response)
          .then(upResponse => {
            this.setState({ loading: false })
            this.props.global_action_loading(false)
            const pic_url = config.baseURL + "uploads/" + upResponse.data.filename;
            changeUserAvatar({ pic_url }).then(updateResponse => {
              this.props.set_photo(pic_url);
            });
          })
          .catch(err => {
            this.setState({ loading: false })
            this.props.global_action_loading(false)
            Toast.show({
              text: this.props.language.alert.Error,
              buttonText: 'Okay',
              type: "warning"
            });
          })
      }
    });
  }

  checkNickName() {
    getNickname().then(username => {
      this.setState({ username })
    })
  }

  componentDidMount() {
    this.setState({ source: { uri: this.props.avatar } })
  }


  render() {
    const { username, source } = this.state;
    const { birthday, language } = this.props;
    return (
      <Container>
        <NavigationEvents onWillFocus={this.checkNickName} />
        <Content style={{ width: "96%",marginLeft:"2%" }} scrollEnabled={false}  >
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={this.selectUserPhoto}>
              <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 15, lineHeight:56 }}>{language.home.ChangeAvatar}</Text>
                <Image style={{ width: 56, height:56, borderRadius: 28 }} source={source} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Nickname", { name: language.home.NickName }) }}>
              <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 15 }}>{language.home.NickName}</Text>
                <Text style={{ fontSize: 13, color: "#6f6e6e" }}>{username}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Birthday", { name: language.home.Birthday }) }}>
              <View style={{ marginTop: "2%", justifyContent: "space-between", flexDirection: "row", width: "94%", marginLeft: "3%", paddingBottom: 10,paddingTop:10, borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 15 }}>{language.home.Birthday}</Text>
                <Text style={{ fontSize: 13, color: "#6f6e6e" }}>{birthday}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(state => { return { ...state.person, ...state.language } }, { ...action.person, ...action.globalLoading })(UserProfile)