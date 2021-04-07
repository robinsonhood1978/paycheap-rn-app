import * as TYPES from '../action-type';
import { getLocation } from '../../api/location';

const locationRedux = {
    get_user_address(callback) {
        return dispatch => {
            getLocation().then(Data => {
                if (Data.data.result.lat) {
                    callback ? callback() : null;
                    dispatch({
                        type: TYPES.GET_ADDRESS,
                        Data
                    });
                } else {
                    setTimeout(() => {
                        dispatch({
                            type: TYPES.RE_GET
                        });
                    }, 3000)
                }
            }).catch(err => {
                setTimeout(() => {
                    dispatch({
                        type: TYPES.RE_GET
                    });
                }, 3000)
            })
        }
    },
};

export default locationRedux;
