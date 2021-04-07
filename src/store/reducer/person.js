import * as TYPES from '../action-type';
import { setNickname } from '../../utils/auth'

export default function personReducer(
    state = {
        phone: "",
        avatar: "",
        wallet: 0,
        birthday: "",
        needGetUser: true,
        cNumber:"",
        rNumber:"",
    },
    action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.GET_INFO: {
            const { status, data, cNumber, rNumber } = action.Data.data;
            if (status === 200) {
                state.phone = data.phone;
                state.birthday = data.birthday;
                state.avatar = data.avatar;
                state.wallet = data.wallet;
                state.needGetUser = false;
                state.cNumber = cNumber;
                state.rNumber = rNumber;
                setNickname(data.username);
            }
        }
            break;
        case TYPES.SET_PHOTO: {
            state.avatar = action.avatar;
        }
            break;
        case TYPES.SET_BIRTHDAY: {
            state.birthday = action.birthday;
        }
            break;
        default:
            break;
    }
    return state;
}
