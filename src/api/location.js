import {_get} from './index';

//定位当前位置
export  const getLocation = (data) =>{
    let req = {
    data
  };
    req.url = 'v1/location';
  return _get(req)
};


