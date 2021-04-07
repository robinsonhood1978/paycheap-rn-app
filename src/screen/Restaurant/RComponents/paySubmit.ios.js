import * as WeChat from 'react-native-wechat';
import { Alert } from "react-native";

function getJson(arr) {
    var theRequest = new Object();
    for (var i = 0; i < arr.length; i++) {
        var kye = arr[i].split("=")[0];
        var value = arr[i].split("=")[1];
        // 给对象赋值
        theRequest[kye] = value;
    }
    return theRequest;
}

const submitIOS = (url, navigateOrder, language) => {
    var arr1 = url.split('?')[1].split('&');
    const order = getJson(arr1);
    // console.log(order); // {a: "1", b: "2", c: ""}
    // console.log("json order: " + JSON.stringify(order))  // {"a":"1","b":"2","c":""}
    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.pay({
                    partnerId: order['partnerId'],  // 商家向财付通申请的商家id
                    prepayId: order['prepayId'],   // 预支付订单
                    nonceStr: order['nonceStr'],   // 随机串，防重发
                    timeStamp: order['timeStamp'],  // 时间戳，防重发.
                    package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                    sign: order['sign']       // 商家根据微信开放平台文档对数据做的签名
                }).then(requestJson => {
                    // Alert.alert(JSON.stringify(requestJson))                     
                    if (requestJson.errCode == "0") {
                        //回调成功处理
                        setTimeout(() => {
                            Alert.alert(
                                language.alert.WarmPrompt,
                                language.alert.PaySuccess,
                                [
                                    { text: language.order.Confirm, onPress: () => { navigateOrder() } },
                                ],
                                { cancelable: false }
                            );
                        }, 50)
                    }
                    else {
                        //ToastAndroid.show("支付失败", ToastAndroid.SHORT)
                        setTimeout(() => {
                            Alert.alert(
                                language.alert.WarmPrompt,
                                language.alert.PayFailed,
                                [
                                    { text: language.order.Confirm },
                                ],
                                { cancelable: false }
                            );
                        }, 50)
                    }
                }).catch(err => {
                    Alert.alert(language.alert.Failed)
                })
            } else {
                console.log("else")
                Alert.alert(language.alert.WarmPrompt, language.alert.NoWechat);
            }
        });
}


export default submitIOS 