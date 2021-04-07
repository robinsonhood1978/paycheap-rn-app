import { Text } from 'native-base';
import React from "react";

const myBlackText = props => (<Text style={[{ color: "#000", fontSize: 8.5 }, props.style]}>{props.children}</Text>)

export default myBlackText