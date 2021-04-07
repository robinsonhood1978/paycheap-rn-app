import AsyncStorage from '@react-native-community/async-storage';
const key="user_username"

export const setNickname=(username)=> AsyncStorage.setItem(key, username);
export const getNickname=()=> AsyncStorage.getItem(key);
export const removeNickname=()=> AsyncStorage.removeItem(key);

export const checkUserAuth=(noAuthCallBack,AuthCallBack)=>{
    getNickname().then(name=>{
     if(!name){
        noAuthCallBack();
      }
      else{
        AuthCallBack(name);
      }
    })
  }