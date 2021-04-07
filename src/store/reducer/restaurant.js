import * as TYPES from '../action-type';

export default function restaurantReducer(
    state = {
        restaurants: [],
    },
    action) {
    // state = JSON.parse(JSON.stringify(state));
    // switch (action.type) {
    //     case TYPES.GET_RESTAURANTS : {
    //         let {status, data} = action.Data.data;
    //         if (status === 200) {
    //             state.restaurants = data;    
    //         }
    //     }
    //         break;
    //     default:
    //         break;
    // }
    return state;
}
