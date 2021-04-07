package com.paycheaprnapp.wxapi;

import android.util.Log;
import android.widget.Toast;

import java.net.URLDecoder;
import java.util.Map;
import java.util.HashMap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
/**
 * 类文件：
 * 作者：zhuyong on 2018/5/10 14:04
 * 邮箱：99305919@qq.com
 * 希望每天叫醒你的不是闹钟而是梦想
 */
public class WxpayModule extends ReactContextBaseJavaModule {

    private IWXAPI api;
    public static String APP_ID = "wx660ef07ece9f73b3";//这里填写你的APPID
    public static Promise promise = null;

    WxpayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        api = WXAPIFactory.createWXAPI(reactContext, APP_ID);
        api.registerApp(APP_ID);    // 将该app注册到微信
    }

    @Override
    public String getName() {
        return "Wxpay";
    }
    /**
     * 解析出url参数中的键值对
     * 如 "index.jsp?Action=del&id=123"，解析出Action:del,id:123存入map中
     * @param url  url地址
     * @return  url请求参数部分
     */
    public static Map<String, String> URLRequest(String url)
    {
        Map<String, String> mapRequest = new HashMap<String, String>();

        String[] arrSplit=null;
        String str = "";
        try {
            str = URLDecoder.decode(url, "UTF-8");
        }
        catch (Exception e){

        }
        arrSplit=str.split("[&]");
        for(String strSplit:arrSplit)
        {
            String[] arrSplitEqual=null;
            arrSplitEqual= strSplit.split("[=]");

            //解析出键值
            if(arrSplitEqual.length>1)
            {
                //正确解析
                mapRequest.put(arrSplitEqual[0], arrSplitEqual[1]);

            }
            else
            {
                if(arrSplitEqual[0]!="")
                {
                    //只有参数没有值，不加入
                    mapRequest.put(arrSplitEqual[0], "");
                }
            }
        }
        return mapRequest;
    }
    @ReactMethod
    public void pay(String text, Promise promise) {
        //此处的text为调用后台的统一下单接口返回的字符串，我放在此处解析的。
        WxpayModule.promise = promise;
        Log.e("WXPayEntryActivity", "支付参数：" + text);

//   weixin://app/wx660ef07ece9f73b3/pay/?nonceStr=Esr2heUDLNcvjY5n&package=Sign%3DWXPay
//   &partnerId=233598892&prepayId=wx18115315494287c208643d321127521000&timeStamp=1563421995
//   &sign=1217305C9F129ABE2A5925DC05291041&signType=SHA1
        String str = text.substring("weixin://app/wx660ef07ece9f73b3/pay/?".length());
        Map<String, String> mapRequest = URLRequest(str);

            String appid = APP_ID;
            String sign = mapRequest.get("sign");
            String partnerid = mapRequest.get("partnerId");
            String prepayid = mapRequest.get("prepayId");
            String mPackage = "Sign=WXPay";
            String noncestr = mapRequest.get("nonceStr");
            String timestamp = mapRequest.get("timeStamp");

        Log.e("WxpayModule", "appid：" + appid+",sign:"+sign+",partnerid:"
                +partnerid+",package:"+mPackage+",nonceStr:"+noncestr+",timestamp:"+timestamp);

            PayReq request = new PayReq();
            request.appId = appid;
            request.partnerId = partnerid;
            request.prepayId = prepayid;
            request.packageValue = mPackage;
            request.nonceStr = noncestr;
            request.timeStamp = timestamp;
            request.sign = sign;
            api.sendReq(request);

    }

    @ReactMethod
    public void isSupported(Promise promise) { // 判断是否安装了微信客户端
        boolean isSupported = api.isWXAppInstalled();
        try {
            WritableMap map = Arguments.createMap();
            map.putBoolean("isSupported", isSupported);
            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(e);
        }
    }
}