import * as TYPES from '../action-type';

const orderRedux={
    order_refresh(bool=true) {
        return {
            type: TYPES.NEED_REFRESH,
            data:bool
        }
    }, 
};

export default orderRedux;
