import * as TYPES from '../action-type';
import enLanguage from './en'
import cnLanguage from './cn'

export default function languageReducer(
    state = {
        language: cnLanguage,
        locale:"cn"
    },
    action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.CHANGE_LANGUAGE: {
            if (state.locale === "en") {
                state.language=enLanguage;
            }
            else {
                state.language = cnLanguage;
            }
        }
            break;
        case TYPES.CHANGE_LOCALE: {
            state.locale =action.lan;
        }
            break;
        default:
            break;
    }
    return state;
}