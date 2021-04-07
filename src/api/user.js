import {_get, _post, _delete} from './index'

//登录
export const userLogin = (data) => {
  let req = {
    data,
    url: 'admin/user_login'
  };
  return _post(req);
};

export const changeUserBirthday = (data) => {
    let req = {
        data,
        url: 'admin/change_birthday'
    };
    return _post(req);
};

export const changeUserPassword = (data) => {
    let req = {
        data,
        url: 'admin/user_change_password'
    };
    return _post(req);
};

//forget
export const userForget = (data) => {
    let req = {
        data,
        url: 'admin/user_forget'
    };
    return _post(req);
};

//验证码获得
export const getUserVerify = (data) => {
    let req = {
        data,
        url: 'admin/admin_verify'
    };
    return _get(req);
};


//获取用户信息
export const getUserInfo = (data) => {
    let req = {
    data,
    url: 'admin/user_info'
  };
  return _get(req);
};


//获取用户shoucang
export const userCollectedRestaurants = (data) => {
    let req = {
        data,
        url: 'admin/user_restaurants'
    };
    return _get(req);
};


//改变用户头像
export const changeUserAvatar = (data) => {
  let req = {
    data,
    url: 'admin/change_avatar'
  };
  return _post(req)
};

//改变用户头像
export const changeNickName = (data) => {
    let req = {
        data,
        url: 'admin/change_name'
    };
    return _post(req)
};


//获取我的评论
export const myComments = (data) => {
  let req = {
    data,
    url: 'v1/my_comment'
  };
  return _get(req);
};

//登出
export const userLogout = () => {
    let req = {
        url: 'admin/logout'
    };
    return _post(req);
};

export const deleteComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  };
  return _delete(req);
};

