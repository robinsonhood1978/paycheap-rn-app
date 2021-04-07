import * as TYPES from '../action-type';

const loadingRedux={
    global_action_loading(bool=true) {
        return {
            type: TYPES.GLOBAL_LOADING,
            data:bool
        }
    },
    
};

export default loadingRedux;