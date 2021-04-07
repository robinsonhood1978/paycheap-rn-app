import { View, Icon } from 'native-base';
import React from "react";
import { TouchableOpacity } from "react-native"

const StarLine = props => {
    const { score, iconStyle } = props;
    const doms = [];
    for (let i = 1; i <= score; i++) {
        doms.push(
            <TouchableOpacity key={i} onPress={() => { props.changeScore(i) }} ><Icon style={iconStyle} type="FontAwesome" name='star' /></TouchableOpacity>
        );
    }
    for (let i = score + 1; i <= 5; i++) {
        doms.push(<TouchableOpacity key={i} onPress={() => { props.changeScore(i) }}><Icon style={iconStyle} type="FontAwesome" name='star-o' /></TouchableOpacity>);
    }
    return doms;
}

ShowStars = props => (<View style={{
    flexDirection: 'row',
    alignItems: 'center'
}}>
    {StarLine(props)}
</View>)

export default ShowStars