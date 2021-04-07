import * as TYPES from '../action-type';

export default function orderReducer(
    state = {
       refresh:false
    },
    action) {
        state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
            case TYPES.NEED_REFRESH : {
                    state.refresh = action.data;       
            }
                break;
        default:
            break;
    }
        return state;
}
