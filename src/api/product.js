import {_get, _put, _all} from './index'

//获取评论
export const getFoodComment = (data) => {
  let req = {
    data,
    url: `v1/food_comment?food_id=${data.food_id}`
  };
  return _get(req);
};
