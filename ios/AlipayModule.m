//
//  AlipayModule.m
//  PayCheapRnApp
//
//  Created by 罗斌 on 2019/7/24.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AlipayModule.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation AlipayMoudle
RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  //应用注册scheme,在AliSDKDemo-Info.plist定义URL types
  NSString *appScheme = @"alipay2088331448074211";
  [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"reslut = %@",resultDic);
    resolve(resultDic);
  }];
}
RCT_EXPORT_MODULE(Alipay);

@end
