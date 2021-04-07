import Wxpay from "../../../utils/Wxpay";
import { Alert } from "react-native";


const submitAndroid = async (url, navigateOrder, language) => {
    const { isSupported } = await Wxpay.isSupported();
    if (!isSupported) {
        Alert.alert('', language.alert.NoWechat);
        return;
    }
    try {
        const result = await Wxpay.pay(url);
        if (result.errCode == '0') {
            setTimeout(() => {
                Alert.alert(
                    language.alert.WarmPrompt,
                    language.alert.PaySuccess,
                    [
                        { text: language.order.Confirm, onPress: () => { navigateOrder() } },
                    ],
                    { cancelable: false })
            }, 1)
        }
        else {
            setTimeout(() => {
                Alert.alert(
                    language.alert.WarmPrompt,
                    language.alert.PayFailed,
                    [
                        { text: language.order.Confirm },
                    ],
                    { cancelable: false })
            }, 1)
        }
    } catch (err) {
        console.log(err)
    }
}


export default submitAndroid
