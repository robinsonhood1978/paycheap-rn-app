import { Text } from 'native-base';
import React from "react";

const myGrayText = props => (<Text numberOfLines={props.numberOfLines} style={[{ color: "#6f6e6e", fontSize: 9 }, props.style]}>{props.children}</Text>)

export default myGrayText