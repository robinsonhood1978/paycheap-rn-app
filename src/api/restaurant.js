import {_get, _put} from './index'

//获取一定数量的商家
export const getAllRestaurants = (data) => {
    let req = {
        data: data,
        url: 'v1/restaurants'
    };
    return _get(req);
};

//收藏某个商家
export const collectOneRestaurant = (data) => {
    let req = {
        url: `v1/collect_restaurant/${data.restaurant_id}`
    };
    return _get(req);
};

//取消收藏某个商家
export const uncollectOneRestaurant = (data) => {
    let req = {
        url: `v1/uncollect_restaurant/${data.restaurant_id}`
    };
    return _get(req);
};

//获取食物
export const getOneFood = (data) => {
    let req = {
        url: `v1/one_food/${data.food_id}`
    };
    return _get(req);
};


//输入关键词搜索餐馆
export const searchTheRestaurant = (data) => {
    let req = {
        data,
        url: 'v1/search/restaurant'
    };
    return _get(req);
};

//获取评论
export const getRestaurantComment = (data) => {
    let req = {
        data,
        url: 'v1/comment'
    };
    return _get(req);
};



//获取一个商家的多种信息
export const getStore = (data) => {
    let req = {
        url: `v1/one_store/${data.restaurant_id}`
    };
    return _get(req);
};
