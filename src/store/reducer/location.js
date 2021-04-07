import * as TYPES from '../action-type';

export default function locationReducer(
    state = {
        gotLocation: false,
        lat: -36.72079849243164,
        lng: 174.94790649414062,
        address: "locating",
        need_reget: 0
    },
    action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.GET_ADDRESS: {
                state.gotLocation = true;
                state.address = action.Data.data.result.city;
                state.lat = action.Data.data.result.lat;
                state.lng = action.Data.data.result.lng;
        }
            break;
        case TYPES.RE_GET: {
            state.need_reget++;
        }
            break;
        default:
            break;
    }
    return state;
}

