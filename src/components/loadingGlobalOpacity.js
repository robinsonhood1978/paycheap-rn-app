import { View, Spinner } from 'native-base';
import React from "react";



const loadingGlobalOpacity=props=>{
    return props.loading?<View style={{left:0,top:0, width:"100%",height:"100%",backgroundColor:"#eee",opacity:0.6,position:"absolute",zIndex:999999,justifyContent:"center"}}>
    <Spinner color="#ff6933" style={{marginTop:-50}}/>
</View>:null}

export default loadingGlobalOpacity