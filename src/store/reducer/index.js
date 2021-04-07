import {combineReducers} from 'redux';
import order from './order';
import restaurant from './restaurant';
import location from './location'
import person from './person';
import language from './language';
import globalLoading from './globalLoading'

const reducerRedux=combineReducers({order,restaurant,person,location,language,globalLoading});

export default reducerRedux;
