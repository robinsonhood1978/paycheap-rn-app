import * as TYPES from '../action-type';
import AsyncStorage from '@react-native-community/async-storage';

const languageRedux={
    set_global_language(){
        return  {
                type: TYPES.CHANGE_LANGUAGE
            }
    },
    set_global_locale(lan){
        AsyncStorage.setItem("lang", lan);
        return  {
            type: TYPES.CHANGE_LOCALE,
            lan
        }
    }
};

export default languageRedux;