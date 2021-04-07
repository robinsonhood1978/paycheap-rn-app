import { Platform, View } from 'react-native'
import React  from 'react';

const CryptoJSMd5 = require("crypto-js");

export function md5(password) {
    const hash = CryptoJSMd5.MD5(password);
    return hash.toString(CryptoJSMd5.enc.Base64);
}


export function getFormatDate(date) {
    if (Platform.OS === 'ios')
        return (date).toLocaleString(fa ? 'fa-IR' : 'en-US', { maximumFractionDigits: 0 });
    else
        return (date).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const minusScrollHeight=Platform.OS === 'ios'?0:60

export const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: '#ff6933',
    headerTitleStyle: {
        flex: 1, textAlign: 'center',
        fontWeight: "500",
        fontSize: Platform.OS === 'ios' ? 20 : 17
    },
    headerStyle: {
        height: 40,
    },
    headerBackTitle: null,
    headerRight: <View />
};


export function textRegexFunction(str, range, min, max, type, callback) {
    let message = '';
    let result = true;
    let regex = null;
    if (range) {
        regex = /^(\d+)(\.\d+)?$/;
        result = regex.test(str);
        message = "noNumber";
        if (result) {
            if (str < min) {
                message = "small";
                result = false;
            } else if (str > max) {
                message = "large";
                result = false;
            }
        }
    }
    else {
        if (str.length < min) {
            if (str.length === 0) {
                message = "isRequired";
                result = false;
            } else {
                message = "short";
                result = false;
            }
        } else if (str.length > max) {
            message = "long";
            result = false;
        }
    }
    if (!result) {
        callback(message);
        return result;
    }
    if (type) {
        switch (type) {
            case "wholeNumber":
                regex = /^\d+$/;
                result = regex.test(str);
                message = "noWholeNumber";
                break;
            case "phone":
                regex = /^[+]?(\d+)(-\d+)*$/;
                result = regex.test(str);
                message = "noPhone";
                break;
            case "password":
                regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,20}$/;
                result = regex.test(str);
                message = "noPassword";
                break;
            case "+86":
                regex = /^1\d{10}$/;
                result = regex.test(str);
                message = "noCPhone";
                break;
            case "+64":
                regex = /^0?2\d{5,9}$/;
                result = regex.test(str);
                message = "noNPhone";
                break;
            case "+1":
                regex = /^\d{10}$/;
                result = regex.test(str);
                message = "noUPhone";
                break;
        }
    }
    if (!result) {
        callback(message);
    }
    return result;
}
