import { View, Text, Icon } from 'native-base';
import React from "react";

const StarLine = props => {
    const { score, iconStyle } = props;
    const on = parseInt(score);
    const half = score - on < 0.5 ? 0 : 1;
    const off = 5 - on - half;
    const doms = [];
    doms.push(<Text key={-1} style={{ fontSize: 10 }}></Text>);
    for (let i = 0; i < on; i++) {
        doms.push(<Icon key={i} style={iconStyle} type="FontAwesome" name='star' />);
    }
    for (let i = 0; i < half; i++) {
        doms.push(<Icon key={i + on} style={iconStyle} type="FontAwesome" name='star-half-o' />);
    }
    for (let i = 0; i < off; i++) {
        doms.push(<Icon key={i + on + half} style={iconStyle} type="FontAwesome" name='star-o' />);
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