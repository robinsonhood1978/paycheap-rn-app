import { Text, View, ListItem } from 'native-base';
import React from "react";
import { Image } from 'react-native';
import MyGrayText from "./myGrayText"
import Stars from './stars'

const storeListMap=props=>{
  return  (props.shopList.map(data => <ListItem
        onPress={() => props.navigation.navigate('StoreDetail', { store_id: data.id, name: props.locale==='en'? data.name : data.c_name })}
        key={data.id}
        style={{ width: "100%", flex: 1, flexDirection: "row", justifyContent: "space-between" }} >
        <View style={{ width: "16%" }}>
            <Image source={{ uri: data.pic_url }} style={{ width: 47, height: 47, borderRadius: 5 }} />
        </View>
        <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 12, fontWeight: "400" }}>{props.locale==='en'? data.name : data.c_name} </Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "68%" }}>
                    <Stars score={data.wm_poi_score} iconStyle={{ fontSize: 11, color: "#ff9d00",lineHeight:15 }} />
                    <MyGrayText> {props.language.order.Discount}: {((1 - data.discount).toFixed(2) * 100).toFixed(0) + '% '+props.language.store.Off} </MyGrayText>
                    <MyGrayText  numberOfLines={1} style={{overflow: "visible"}}> {data.address} </MyGrayText>
                </View>
                <View style={{ width: "25%" }}>
                    <MyGrayText>{props.language.store.Sales}: {data.month_sales} </MyGrayText>
                    <MyGrayText>{data.distanceDescription}</MyGrayText>
                </View>
            </View>
        </View>
    </ListItem>
    ))
}
export default storeListMap