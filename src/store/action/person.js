import * as TYPES from '../action-type';
import {getUserInfo} from '../../api/user';

const userRedux = {
    get_user_info() {
        return async dispatch => {
            const Data = await getUserInfo();
            dispatch({
                type: TYPES.GET_INFO,
                Data
            });
        }
    },
    set_photo(avatar){
        return {
            type:TYPES.SET_PHOTO,
            avatar
        }
    },
    set_birthday(birthday){
        return {
            type:TYPES.SET_BIRTHDAY,
            birthday
        }
    }
};

export default userRedux;
