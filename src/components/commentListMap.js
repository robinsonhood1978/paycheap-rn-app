import { Text, View,  Button } from 'native-base';
import { Image } from 'react-native';
import React from "react";
import MyGrayText from "./myGrayText";
import Stars from './stars'

const commentListMap = props => {
    return (props.comments && props.comments.length > 0 ? props.comments.map((data, index) =>
        <View key={data.id} style={{ marginTop: "3%", paddingBottom: "3%", borderBottomColor: "#eee", borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", paddingRight: 5 }}>
                    <Image source={{ uri: data.avatar }} style={{ width: 18, height: 18, borderRadius: 9 }}></Image>
                    <Text style={{ fontSize: 11 }}> {data.user_name}</Text>
                </View>
                <MyGrayText style={{ fontSize: 10 }}>{(new Date(data.comment_time)).toLocaleString('en', { hour12: false, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</MyGrayText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 3,height:13 }}>
                <Stars score={data.food_score} iconStyle={{ lineHeight: 16, fontSize: 14, color: "#ff6933" }} />
                {props.delete ? <Button transparent style={{ height: 24 }} onPress={() => { props.deleteTheComment(data.id, index) }}>
                    <Text uppercase={false} style={{ color: "red", fontSize: 12 }}>{props.language.alert.delete}</Text>
                </Button> : null}
            </View>
            <View style={{ marginTop: 3 ,height:data.add_comment_list[0]?27:15}}>
                <Text style={{ lineHeight: 16, fontSize: 12 }}>{data.comment_data}</Text>
                {data.add_comment_list[0] ?
                    <View style={{ marginTop: 3, marginLeft: 5, flexDirection: 'row', justifyContent: "space-between" }}>
                        <MyGrayText style={{ fontSize: 11 }}>{props.language.store.Reply}： {data.add_comment_list[0].content}</MyGrayText>
                        <MyGrayText style={{ fontSize: 11 }}>{(new Date(data.add_comment_list[0].time)).toLocaleString('en', { hour12: false, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</MyGrayText>
                    </View>
                    : null}
            </View>
        </View>
    ) : <MyGrayText style={{ lineHeight: 30, fontSize: 10 }}>{props.language.store.NoComments}</MyGrayText>)
}
export default commentListMap