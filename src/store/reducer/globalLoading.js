import * as TYPES from '../action-type';

export default function loadingReducer(
    state = {
        globalLoading: false
    },
    action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.GLOBAL_LOADING: {
            state.globalLoading = action.data;
        }
            break;
        default:
            break;
    }
    return state;
}
