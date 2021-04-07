import Login from './User/login'
import Home from './User/home'
import ForgetPassword from './User/forgetPassword'
import { createStackNavigator } from "react-navigation";
import Collection from './User/homeChildren/collection';
import Coupons from './User/homeChildren/coupons';
import Business from './User/homeChildren/business';
import Activity from './User/homeChildren/activity';
import About from './User/homeChildren/about';
import Invite from './User/homeChildren/invite';
import Service from './User/homeChildren/service';
import Comments from './User/homeChildren/comments';
import Setting from './User/setting';
// import UseApp from './User/homeChildren/useApp'
import { defaultNavigationOptions   } from '../utils/utils'

const AppNavigator = createStackNavigator(
  {
    Setting,
    Home,
    Login,
    ForgetPassword,
    Collection,
    Coupons,
    Business,
    Activity,
    About,
    Invite,
    Service,
    Comments,
   
  }, {
    initialRouteName: "Home",
    defaultNavigationOptions
  }
);
AppNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
export default AppNavigator;