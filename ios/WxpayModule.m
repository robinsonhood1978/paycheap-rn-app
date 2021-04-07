//
//  WxpayModule.m
//  PayCheapRnApp
//
//  Created by 罗斌 on 2019/7/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "WxpayModule.h"

@implementation WxpayModule
  
  RCTPromiseResolveBlock resolveBlock = nil;
  
- (instancetype)init
  {
    self = [super init];
    if (self) {
      [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleWXPay:) name:@"WXPay" object:nil];
    }
    return self;
  }
  
- (void)dealloc
  {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
  }
  
- (void)handleWXPay:(NSNotification *)aNotification
  {
    NSString * errCode =  [aNotification userInfo][@"errCode"];
    resolveBlock(@{@"errCode": errCode});
  }

//解析url字符串对

- (NSDictionary *)parametersWithSeparator:(NSString *)separator delimiter:(NSString *)delimiter url:(NSString *)str{
  
    NSArray *parameterPairs =[str componentsSeparatedByString:delimiter];
    NSMutableDictionary *parameters = [NSMutableDictionary dictionaryWithCapacity:[parameterPairs count]];
      for (NSString *currentPair in parameterPairs) {
        NSRange range = [currentPair rangeOfString:separator];
        if(range.location == NSNotFound)
          continue;
          NSString *key = [currentPair substringToIndex:range.location];
          NSString *value =[currentPair substringFromIndex:range.location + 1];
          [parameters setObject:value forKey:key];
      }
      return parameters;
  }

  RCT_EXPORT_METHOD(registerApp:(NSString *)APP_ID){
    [WXApi registerApp: APP_ID];//向微信注册
  }
  
  RCT_EXPORT_METHOD(pay:(NSString *)sorder
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject){
    resolveBlock = resolve;
    
    // 查找参数
    NSRange range = [sorder rangeOfString:@"?"];
    // 截取参数
    NSString *parametersString = [sorder substringFromIndex:range.location + 1];

    NSDictionary *order = [self parametersWithSeparator:@"＝" delimiter:@"&" url:parametersString];
    //调起微信支付
    //注意order取的值对应的key要和自己服务器提供的一致
    PayReq *req = [[PayReq alloc] init];
    req.partnerId = [order objectForKey:@"partnerid"];
    req.prepayId = [order objectForKey:@"prepayid"];
    req.nonceStr = [order objectForKey:@"noncestr"];
    req.timeStamp = [[order objectForKey:@"timestamp"] intValue];
    req.package = [order objectForKey:@"package"];
    
    req.sign = [order objectForKey:@"sign"];
    [WXApi sendReq:req];
  }
  
  RCT_REMAP_METHOD(isSupported, // 判断是否支持调用微信SDK
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject){
    if (![WXApi isWXAppInstalled]){
      resolve(@NO);
      NSLog(@"no");
    }
    else{
      resolve(@YES);
      NSLog(@"yes");
    }
  }
  
  RCT_EXPORT_MODULE(Wxpay);
  
  @end
