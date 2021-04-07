test('1', () => {
    expect(1).toBe(1);
});



/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MyText from '../src/components/myText';
import CommentListMap from '../src/components/commentListMap';
import LoadingOpacity from '../src/components/loadingOpacity';
import PhotoSwiper from '../src/components/PhotoSwiper';
import Star from '../src/components/star'
import StoreListMap from '../src/components/storeListMap'
import Swiper from '../src/components/swiper'

test('MyText renders correctly', () => {
    const tree = renderer.create(<MyText>123</MyText>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('CommentListMap renders correctly', () => {
    const tree = renderer.create(<CommentListMap comments={comments} language={language} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('StoreListMap renders correctly', () => {
    const tree = renderer.create(<StoreListMap locale={"cn"} language={language} navigation={navigation} shopList={shopList} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Swiper', () => {
    const tree = renderer.create(<Swiper />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('LoadingOpacity renders correctly', () => {
    const tree = renderer.create(<LoadingOpacity loading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('PhotoSwiper renders correctly', () => {
    const tree = renderer.create(<PhotoSwiper photos={photos} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Star renders correctly', () => {
    const tree = renderer.create(<Star score={5} />).toJSON();
    expect(tree).toMatchSnapshot();
});

// import App from '../App'
// global.fetch = jest.fn(() => new Promise(resolve => resolve()));
// jest.mock('react-navigation-stack', () => {})
// jest.mock('react-native-gesture-handler', () => {});
// jest.mock('react-navigation', () => {});
// it('renders correctly', () => {
//     const tree =renderer.create(<App/>).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
const shopList=[{"pic_url":"https://app.pay-cheap.com:3333/uploads/15593529269871.JPG","month_sales":5,"wm_poi_score":5,"third_category":"Service","discount":0.8,"discounts2":[{"info":"新用户首次消费9折起","promotion_type":2},{"info":"折扣商品7.33折起","promotion_type":2},{"info":"消费满1000元返还100元代金券","promotion_type":2}],"shopping_time_start":"10:00","shopping_time_end":"18:00","shipping_fee":1,"min_price":1,"bulletin":"Excel Group Limited is a immigration advising service provider, we had focus on this field for over a decade since 2008.","c_bulletin":"新西兰宇森国际是新西兰商务部和移民局认证的持牌移民机构，10年专注新西兰留学移民。","comment_number":1,"lng":"174.7669444","lat":"-36.8469379","created_at":"2019-05-31T11:07:17.436Z","photos":["https://app.pay-cheap.com:3333/uploads/15593529637432.JPG","https://app.pay-cheap.com:3333/uploads/15593529890603.JPG","https://app.pay-cheap.com:3333/uploads/15593529892324.JPG"],"_id":"5cf1d65f35c6ad77b44afd16","id":3,"user_id":10004,"name":"EXCEL GROUP LTD","business_days":"Monday-Friday","c_name":"宇森国际留学移民","c_business_days":"周一到周五","address":"Level 7 43 High Street, Auckland, New Zealand","call_center":"0064-093666886","distance":"21.4","__v":2,"food":{"month_saled":1,"status":1,"rules":["Cannot use with other store discounts","Call the store for Parking  information","The store offers free WIFI"],"c_rules":["团购用户,不可享受其他店铺优惠","停车位收费标准:详询商家","商家提供免费WIFI"],"comments":[],"comment_number":1,"comment_score":5,"created_at":"2019-05-31T11:07:17.521Z","_id":"5cf1d8c135c6ad77b44afd1a","id":9,"c_policy":"到店消费, 无需预约","c_description":"新西兰移民局注册移民顾问提供新西兰访问签证申请","restaurant_id":3,"c_name":"常规性新西兰旅游签证申请","name":"General Vistor Visa Application","price":800,"description":"Application for Visitor Visa by an NZ Immigration office approved official adviser.","pic_url":"https://app.pay-cheap.com:3333/uploads/1559353536937Screen Shot 2019-05-31 at 6.43.32 PM.png","stock_number":100,"start_date":"2019-06-01T06:59:59.999Z","end_date":"2020-06-01T06:59:59.999Z","original_price":1000,"policy":"No reservation required","refund_time":"2020-06-01T06:59:59.999Z","__v":0},"food_id":9,"distanceDescription":"<30km"},{"pic_url":"https://app.pay-cheap.com:3333/uploads/1561951735428r1.jpg","month_sales":48,"wm_poi_score":3.3,"third_category":"Food","discount":0.99,"discounts2":[{"info":"新用户首次消费9折起","promotion_type":2},{"info":"折扣商品7.33折起","promotion_type":2},{"info":"消费满1000元返还100元代金券","promotion_type":2}],"shopping_time_start":"07:30","shopping_time_end":"20:30","shipping_fee":1,"min_price":1,"bulletin":"Nice food and cheap price","c_bulletin":"物美价廉","comment_number":33,"lng":"174.7665622","lat":"-36.8441376","created_at":"2019-06-24T02:54:08.767Z","photos":["https://app.pay-cheap.com:3333/uploads/1561951160737c1.jpg","https://app.pay-cheap.com:3333/uploads/1561951175371r3.jpg","https://app.pay-cheap.com:3333/uploads/1561951201942c4.jpg","https://app.pay-cheap.com:3333/uploads/1561951290431c2.jpg","https://app.pay-cheap.com:3333/uploads/1561951976774sheep.jpg","https://app.pay-cheap.com:3333/uploads/1561951994857c3.jpg"],"_id":"5d1041c34bcaeb4137fa1278","id":4,"user_id":10009,"name":"Queen Restaurant","business_days":"Closed on Monday","c_name":"皇后街饭店","c_business_days":"周一休息","address":"21 Queen Street, Auckland, New Zealand","call_center":"0212222172","distance":"21.2","__v":22,"food":{"pic_url":"https://app.pay-cheap.com:3333/uploads/1565925794722地球.png","month_saled":1,"status":1,"rules":["Cannot Takeaway","No tisues"],"c_rules":["不可打包","不提供餐巾纸"],"stock_number":99999,"comments":[],"comment_number":1,"comment_score":5,"created_at":"2019-08-09T00:18:23.883Z","_id":"5d5621a39e0f7855cb62e4c5","id":41,"c_policy":"不可打包","c_description":"奶茶优惠","restaurant_id":4,"c_name":"奶茶","name":"Milk Tea","price":1.01,"description":"Milk Tea really Cheap","start_date":"2019-08-16T11:59:59.999Z","end_date":"2020-08-16T11:59:59.999Z","original_price":19,"policy":"Cannot Takeaway","refund_time":"2020-08-16T11:59:59.999Z","__v":0},"food_id":41,"distanceDescription":"<30km"},{"pic_url":"https://app.pay-cheap.com:3333/uploads/15614245875211468292489320114.jpg","month_sales":8,"wm_poi_score":5,"third_category":"Entertainment","discount":0.8,"discounts2":[{"info":"新用户首次消费9折起","promotion_type":2},{"info":"折扣商品7.33折起","promotion_type":2},{"info":"消费满1000元返还100元代金券","promotion_type":2}],"shopping_time_start":"11:00","shopping_time_end":"20:00","shipping_fee":1,"min_price":1,"bulletin":"Cool Place for YOU to handout","c_bulletin":"天空塔下最牛逼的小店","comment_number":3,"lng":"174.762122","lat":"-36.848416","created_at":"2019-06-25T00:05:01.222Z","photos":["https://app.pay-cheap.com:3333/uploads/1561434957982桌游.jpeg","https://app.pay-cheap.com:3333/uploads/15614349585074cadb1a887c1a11fe2f08766c25fe350_hd.jpg","https://app.pay-cheap.com:3333/uploads/1561434960032ELJH-hvvuiyn0231727.jpg"],"_id":"5d1171de9858485248c461cc","id":5,"user_id":10010,"name":"Shop Underneath the Sky Tower","business_days":"6","c_name":"天空塔下的小餐馆","c_business_days":"6","address":"87 Federal Street, Auckland, New Zealand","call_center":"021123321","distance":"21.8","__v":5,"food":{"month_saled":1,"status":1,"rules":["Not valid on public holiday",""],"c_rules":["节假日不可使用",""],"comments":[],"comment_number":1,"comment_score":5,"created_at":"2019-06-25T02:15:51.011Z","_id":"5d1183eb28b09519370bb92c","id":16,"c_policy":"商家不提供免费车位","c_description":"","restaurant_id":5,"c_name":"多多岛","name":"sdd","price":199,"description":"","pic_url":"https://app.pay-cheap.com:3333/uploads/ask.jpg","stock_number":99999,"start_date":"2019-06-25T11:59:59.999Z","end_date":"2020-06-25T11:59:59.999Z","original_price":null,"policy":"Free Wi-Fi","refund_time":"2020-06-25T11:59:59.999Z","__v":0},"food_id":16,"distanceDescription":"<30km"},{"pic_url":"https://app.pay-cheap.com:3333/uploads/15614442006771-1F309134U6212.JPG","month_sales":6,"wm_poi_score":5,"third_category":"Medicines","discount":0.9,"discounts2":[{"info":"新用户首次消费9折起","promotion_type":2},{"info":"折扣商品7.33折起","promotion_type":2},{"info":"消费满1000元返还100元代金券","promotion_type":2}],"shopping_time_start":"09:00","shopping_time_end":"21:00","shipping_fee":1,"min_price":1,"bulletin":"Good Product, Cheap Price","c_bulletin":"保健产品价格优惠","comment_number":2,"lng":"174.9286016","lat":"-36.9619608","created_at":"2019-06-25T06:03:12.380Z","photos":[],"_id":"5d11bf698ac0fa0ec8fc7b95","id":6,"user_id":10009,"name":"Flat Bush Medicine","business_days":"Closed on Firday","c_name":"步什药品","c_business_days":"周五休息","address":"75 Mandival Avenue, Flat Bush, Auckland, New Zealand","call_center":"022222222","distance":"26.9","__v":0,"food":{"month_saled":1,"status":1,"rules":["No reservation","The Store explain"],"c_rules":["无需预约","商家拥有解释权"],"comments":[],"comment_number":1,"comment_score":5,"created_at":"2019-06-25T06:03:12.408Z","_id":"5d11c0148ac0fa0ec8fc7b96","id":17,"c_policy":"通过订单号到店换取","c_description":"补充维生素C,对身体有益","restaurant_id":6,"c_name":"维生素C","name":"Vitamin C","price":27,"description":"Vitamin C , Good for health","pic_url":"https://app.pay-cheap.com:3333/uploads/1561444372025维生素.jpg","stock_number":99999,"start_date":"2019-06-25T11:59:59.999Z","end_date":"2020-06-25T11:59:59.999Z","original_price":39,"policy":"Get item in store by Order Id","refund_time":"2020-06-25T11:59:59.999Z","__v":0},"food_id":17,"distanceDescription":"<30km"},{"pic_url":"https://app.pay-cheap.com:3333/uploads/1561512286693trip.jpg","month_sales":4,"wm_poi_score":3,"third_category":"Trips","discount":0.97,"discounts2":[{"info":"新用户首次消费9折起","promotion_type":2},{"info":"折扣商品7.33折起","promotion_type":2},{"info":"消费满1000元返还100元代金券","promotion_type":2}],"shopping_time_start":"10:00","shopping_time_end":"17:00","shipping_fee":1,"min_price":1,"bulletin":"Provide Professional Trips","c_bulletin":"专业旅行,找我们","comment_number":2,"lng":"174.737651","lat":"-36.8757484","created_at":"2019-06-26T00:52:07.962Z","photos":["https://app.pay-cheap.com:3333/uploads/1561516989611team.jpg","https://app.pay-cheap.com:3333/uploads/1561519652313short.jpg","https://app.pay-cheap.com:3333/uploads/1561519652315shang.jpg"],"_id":"5d12c95f3e50325e92cc4ba4","id":7,"user_id":10009,"name":"KCC Traveller","business_days":"Monday-Friday","c_name":"啃的鸡旅行","c_business_days":"周一到周五","address":"11 McDonald Street, Sandringham, Auckland, New Zealand","call_center":"006422222222","distance":"25.5","__v":2,"food":{"month_saled":1,"status":1,"rules":["25 people travel together, set out on ",""],"c_rules":["每周日出发, 25人一团",""],"comments":[],"comment_number":1,"comment_score":5,"created_at":"2019-06-26T00:52:07.977Z","_id":"5d12cad13e50325e92cc4ba5","id":18,"c_policy":"准时集合, 误机不退","c_description":"南京七日游,包往返机票,食宿.","restaurant_id":7,"c_name":"南京七日游","name":"Nanjing 7 days","price":7999,"description":"Travel to Nanjing China which contains Flight, Hotel and Eating","pic_url":"https://app.pay-cheap.com:3333/uploads/1561512656722short.jpg","stock_number":999,"start_date":"2019-06-26T11:59:59.999Z","end_date":"2019-10-26T10:59:59.999Z","original_price":9999,"policy":"Be punctual.If you miss the flight that will not be refund","refund_time":"2020-06-26T11:59:59.999Z","__v":0},"food_id":18,"distanceDescription":"<30km"}]


const navigation={
    navigate:()=>{}
}
const photos = ["https://app.pay-cheap.com:3333/uploads/1561951735428r1.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951160737c1.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951175371r3.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951201942c4.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951290431c2.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951976774sheep.jpg",
    "https://app.pay-cheap.com:3333/uploads/1561951994857c3.jpg"]

const comments = [
    { "comment_time": "2019-08-19T02:56:22.664Z", "pic_url": [], "user_id": 10003, "id": 37, "user_name": "30", "avatar": "https://app.pay-cheap.com:3333/uploads/1566175981728image-46024325-f485-49fc-ae82-5af56100477c.jpg", "restaurant_id": 4, "restaurant": "5d1041c34bcaeb4137fa1278", "comment_data": "评价一下10685", "order_id": 10685, "food_score": 5, "food_id": 0, "add_comment_list": [], "__v": 0 },
    { "comment_time": "2019-08-16T03:33:38.441Z", "pic_url": [], "user_id": 10003, "id": 35, "user_name": "22231", "avatar": "https://app.pay-cheap.com:3333/uploads/1565832782348image-0e7b1241-7691-491a-9719-1e76382bdcde.jpg", "restaurant_id": 4, "restaurant": "5d1041c34bcaeb4137fa1278", "comment_data": "挺好吃的", "order_id": 10714, "food_score": 5, "food_id": 10, "add_comment_list": [], "__v": 0 },
    { "comment_time": "2019-08-15T01:34:02.713Z", "pic_url": [], "user_id": 10003, "id": 34, "user_name": "22231", "avatar": "https://app.pay-cheap.com:3333/uploads/1565832782348image-0e7b1241-7691-491a-9719-1e76382bdcde.jpg", "restaurant_id": 4, "restaurant": "5d1041c34bcaeb4137fa1278", "comment_data": "222", "order_id": 10327, "food_score": 4, "food_id": 10, "add_comment_list": [], "__v": 0 },
    { "comment_time": "2019-08-09T01:59:41.825Z", "pic_url": [], "user_id": 10003, "id": 32, "user_name": "2223", "avatar": "https://app.pay-cheap.com:3333/uploads/1564548445287IMG_0003.JPG", "restaurant_id": 4, "restaurant": "5d1041c34bcaeb4137fa1278", "comment_data": "Enough and good.", "order_id": 10338, "food_score": 5, "food_id": 10, "add_comment_list": [], "__v": 0 },
    { "comment_time": "2019-08-01T01:41:06.200Z", "pic_url": [], "user_id": 10003, "id": 31, "user_name": "2223", "avatar": "https://app.pay-cheap.com:3333/uploads/1564548445287IMG_0003.JPG", "restaurant_id": 4, "restaurant": "5d1041c34bcaeb4137fa1278", "comment_data": "Good Tea", "order_id": 10334, "food_score": 5, "food_id": 40, "add_comment_list": [], "__v": 0 }
]
const language = {
    regex: {
        noPassword: "至少包含一个数字一个字母,且长度在6-20之间",
        isRequired: "是必须输入的",
        short: "长度过短",
        long: "长度过长",
        noPhone: "应该是正常的电话号码",
        noNumber: "应该是一个数",
        noWholeNumber: "应该是一个数",
        small: "小于最小值",
        large: "大于最大值",
        noCPhone: "不是中国手机",
        noNPhone: "不是新西兰手机",
        noUPhone: "不是美国手机",
    },
    message: {
        PullToRefresh: "下拉刷新",
        PayInDiscount: "当面支付优惠",
        Search: "搜索",
        Beauty: "美容理发",
        Service: "生活服务",
        Trips: "旅游生活",
        Sport: "全民运动",
        Entertainment: "娱乐休闲",
        Food: "美食",
        Medicines: "保健药品",
        More: "全部分类",
        Money: "现金红包",
        Photos: "婚纱摄影",
        Sweet: "甜点",
        InputStore: "请输入商家名",
        Bottom: "已经到底了",
        IsLoading: "正在加载...",
        NoReview: "没有评价",
        NoBookmarks: "没有收藏",
        NoCoupon: "没有优惠券"

    },
    sort: {
        SortDefault: "综合排序",
        SortSales: "销量最高",
        SortDistance: "距离最近",
        SortScore: "评分最高",
    },
    title: {
        Order: "订单",
        MyOrder: "我的订单",
        Home: "我的",
        Store: "首页"

    },
    store: {
        TotalPrice: "消费金额",
        DisPay: "店铺优惠",
        ActuallyPay: "需要支付",
        NoComments: "没有用户评价",
        Business: "营业天数",
        OpenTime: "营业时间",
        Phone: "店铺电话",
        Sales: "总售",
        Bulletin: "商家公告",
        Address: "店铺地址",
        CommentScore: "综合评分",
        Photos: "店铺照片",
        Reply: "回评",
        Description: "描述",
        MoreComments: "更多评论",
        PayInStore: "到店支付",
        DisPayIn: "到店支付享受折扣",
        Off: "优惠",
        Pay: "买单",
        Buy: "抢购",
        PayCheap: "团购套餐",
        DiscountInfo: "优惠信息",
        UserComments: "用户评价",
        StoreInfo: "商家信息",
        CommentNumber: "评价数",
        PayIn: "当面支付",
        Comment: "评价",
        Store: "商家",
        specialOffer: "优惠活动",
        Total: "团购销量",
        Checkout: "去结算",
        ClearCart: "清空购物车",
        StoreScore: "商家评分",
    },
    cart: {
        Cart: "购物车",
        Edit: "编辑",
        Cancel: "取消",
        Nothing: "购物车空空如也",
        Goto: "去逛逛",
        Delete: "删除"
    },
    order: {
        UnComment: "未评价",
        Confirm: "确认",
        Cancel: "取消",
        ClickHint: "点击确认,24小时后查看钱包.",
        Refunded: "已退款",
        AskingFor: "询问服务员后输入",
        CommentSuccessfully: "评论成功",
        Deploy: "发布",
        OrderInfo: "订单信息",
        StoreInfo: "商家信息",
        Detail: "详情",
        OrderId: "订单编号",
        OrderDate: "订单日期",
        Unused: "未使用",
        All: "全部",
        Refund: "退款",
        Finished: "已完成",
        PayFinished: "已支付",
        WaitingToActivate: "待激活",
        Waiting: "待处理",
        GoComment: "去评价",
        Active: "激活订单",
        WaitComment: "待评价",
        Nothing: "还没有订单",
        PayInStore: "当面支付",
        OrderFinished: "订单已完成",
        Continue: "再来一单",
        PleaseComment: "请为我们评价",
        Total: "实付",
        AtLeast: "至少输入两个字",
        Submit: "提交",
        MakeOrder: "提交订单",
        Subtotal: "小计",
        AllTotal: "合计",
        ShouldPay: "应付",
        ActuallyPay: "实付",
        Discount: "已优惠",
        PleaseShould: "请输入应付金额"
    },
    homeList: {
        Coupons: "红包/卡券",
        MyCollections: "收藏",
        MyComments: "评价",
        Activity: "消息/活动",
        MyFriends: "邀请好友",
        About: "关于",
        CustomerService: "服务中心",
        BusinessJoin: "商家加盟",
        CustomerServiceNumber: "服务电话",
        WechatService: "公众号",
        NoMessage: "没有消息"
    }, pay: {
        MyWallet: "我的钱包",
        UseWallet: "使用钱包",
        UseWalletPay: "使用钱包支付",
        PayOrder: "支付订单",
        PayOver: "支付超市",
        PaymentTime: "支付剩余时间",
        Alipay: " 支付宝",
        Wechat: " 微信",
        Scan: "扫码",
        Confirm: "确认支付",
        AlipayApp: "支付宝App",
        WechatApp: "微信App",
    }, orderDetail: {
        Failed: "获取订单失败",
        ActuallyPay: "实付",
        Title: "订单详情",
        Finished: "订单完成",
        Thank: "感谢您对拼凑APP的支持,欢迎再次光临",
        BuyAgain: "再来一单",
        Contact: "联系商家",
        OrderId: "订单号码",
        OrderTime: "订单时间",
        PaymentMethod: "支付方式",
        Online: "在线支付",
        Cancel: "订单已取消",
    },
    alert: {
        pleaseWaiting: "请稍等，订单确认中...",
        deleteSuccessfully: "删除成功",
        deleteFailed: "删除失败",
        delete: "删除",
        payFinished: "支付已完成",
        payNotFinished: "未完成",
        WarmPrompt: "温馨提示",
        NoWechat: '没有安装微信软件，请您安装微信之后再试',
        OverTime: "订单支付超时，请重新下单",
        PleaseLogin: "请先登录",
        walletPay: "代金券支付成功",
        PaySuccess: "支付成功",
        PayFailed: "支付失败",
        isRefund: "订单已退款",
        isActivated: "订单已激活",
        Error: "出错了,请刷新",
        TooLess: "当面支付不得少于$1",
        CannotFind: "找不到商家",
        Failed: "提交失败,请重试",
        Disconnect: "失去连接,请刷新页面",
        Alipay: '请支付宝扫码或截图扫码',
        Wechat: '请用微信扫码或截图扫码',
        Paid: "该订单已完成支付",
        PhoneNumber: "请正确输入手机号码",
        VerifySent: "验证码已发送",
        VerifyFailed: "验证码发送失败",
        PasswordEmpty: "请输入密码或验证码",
        NoPassword: "请输入密码验证码",
        VerifyWrong: "验证码错误",
        VerifyExpired: "验证码已过期",
        RegisterFailed: "用户注册失败,请重试",
        PasswordWrong: "密码或验证码错误",
        LoginFailed: "用户登录失败",
        Disabled: "用户已被禁用",
        NoUser: "手机号未注册",
        PasswordChanged: "密码修改成功"
    }, home: {
        Welcome: "欢迎登陆拼凑",
        Birthday: "生日",
        BirthdayIsChanged: "生日修改成功",
        BirthdayChangedFailed: "生日修改失败",
        Change: "修改",
        PleaseEnter: "请输入",
        BindingPhone: "绑定手机",
        ChangePassword: "修改密码",
        ShouldSame: "新密码必须和确认密码相同",
        ChangeSuccessfully: "密码修改成功",
        ChangeFailed: "密码修改失败",
        WrongOld: "修改失败,旧密码不正确",
        AboutPaycheap: "关于拼凑",
        Wallet: "钱包",
        Profile: "个人信息",
        Setting: "设置",
        Avatar: "头像",
        Hint: "小贴士: 新用户无需注册，直接输入账号密码则自动设为成功，输入手机号获取验证码后即可开始使用.",
        VerifyCode: "验证码",
        LoginRegister: "直接登陆",
        NewPassword: "新密码",
        OldPassword: "旧密码",
        ConfirmPassword: "确认密码",
        ForgetPassword: "忘记密码",
        LogOut: "退出",
        LogOutAccount: '退出账号',
        Home: "我的",
        Login: "登录",
        Register: "注册",
        Account: "账户",
        Phone: "手机",
        Password: "密码",
        Verify: "验证码",
        GetVerify: "获取验证码",
        HaveAccount: "以后账户, 去登录.",
        NoAccount: "没有账户去注册.",
        PleaseAccount: "请输入账户名",
        PleasePassword: "请输入密码",
        PleasePhone: "请输入手机号",
        PleaseVerify: "请输入验证码",
        NoLogin: "您还没有登录,请登录",
        ChangeAvatar: "更换头像",
        NickName: "昵称",
        NickNameIsChanged: "昵称已修改",
        EnterNickName: "请输入昵称",
        ConfirmChange: "确认更改",
    },
    product: {
        Details: "详情",
        StockNumber: "库存",
        Description: "商品描述",
        Score: "评分",
        Reminder: "温馨提示",
        Business: "营业天数",
        OpenTime: "营业时间",
        AvailableDate: "可用日期",
        Policy: "政策",
        Rules: "规则",
        Comments: "用户评价",
        Total: "总计",
        BuyNow: "立刻抢购",
    }
}