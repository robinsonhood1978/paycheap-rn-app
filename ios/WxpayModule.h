//
//  WxpayModule.h
//  PayCheapRnApp
//
//  Created by 罗斌 on 2019/7/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "WXApiObject.h"
#import "WXApi.h"

@interface WxpayModule : NSObject <RCTBridgeModule, WXApiDelegate>
  @end
