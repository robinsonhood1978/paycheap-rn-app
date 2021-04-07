import { createStackNavigator } from "react-navigation";
import Setting from './Settings/setting'
import BindingPhone from './Settings/bindingPhone'
import Birthday from './Settings/birthday'
import ChangePassword from './Settings/changePassword'
import Nickname from './Settings/nickname'
import Profile from './Settings/profile'
import { defaultNavigationOptions   } from '../../utils/utils'
const AppNavigator = createStackNavigator(
    {
      Setting,
      BindingPhone,
      Birthday,
      ChangePassword,
      Nickname,
      Profile
    }, {
      initialRouteName: "Setting",
      defaultNavigationOptions
    }
  );
  AppNavigator.navigationOptions = () => {
    return {
      tabBarVisible:false,
      header:null
    };
  };


  export default AppNavigator;