import {_get, _post} from './index'

//提交订单
export const postSubmitOrder = (data) => {
    let req = {
        data,
        url: 'v1/order'
    };
    return _post(req);
};


//提交订单
export const postPayStore = (data) => {
    let req = {
        data,
        url: 'v1/pay_store'
    };
    return _post(req);
};


//准备支付
export const postInitPay = (data) => {
    let req = {
        data,
        url: 'v1/pay'
    };
    return _post(req);
};

//获取订单信息
export const getOrderInfo = (data) => {
    let req = {
        url: `v1/order/${data.order_id}`
    };
    return _get(req);
};

// 
// export const testPayIn = (order_id) => {
//     let req = {
//         url: `v1/test_pay_in/${order_id}`
//     };
//     return _get(req);
// };

//激活订单
export const activeTheOrder = (data) => {
    let req = {
        url: `v1/active_order/${data.order_id}`
    };
    return _get(req);
};

//激活订单
export const refundMyOrder = (data) => {
    let req = {
        url: `v1/refund_order/${data.order_id}`
    };
    return _get(req);
};


//获取我的订单
export const getMyOrders = (data) => {
    let req = {
        data,
        url: 'v1/orders'
    };
    return _get(req);
};

//订单评论
export const makeTheComment = (data) => {
    let req = {
        data,
        url: 'v1/comment'
    };
    return _post(req)
};

