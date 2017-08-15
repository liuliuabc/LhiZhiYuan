/*
'use strict';

import React from 'react';
import {
    Dimensions, ActivityIndicator,
    Image, WebView,
    InteractionManager,
    View,
    Text, DeviceEventEmitter, TouchableHighlight, StyleSheet
} from 'react-native';
import {AsyncStorage} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import Main from "../pages/Main"

var {height, width} = Dimensions.get('window');
import * as LoadDataUtil from '../utils/LoadDataUtil';
import Login from "../pages/Login"
import  Video from "react-native-video"
class Vedio extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {



    }


    render() {
        // var  imgurl="http://192.168.253.9:8080/LiZhiYuanProject/ImageAction/publicImage/commonfile/01.jpg"
        return (
            /!*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <WebView
                    ref={webview => { this.webview = webview;}}
                    javaScriptEnabled={true}
                    style={{width: width, height: height}}
                    onLoadEnd={(e)=>{console.log('onLoadEnd--------'+e)}}
                    source={{uri:'http://www.jq22.com/yanshi404'}}
                    onMessage={this.onMessage}
                />

            </View>*!/
            <Video source={{uri: "http://pgccdn.v.baidu.com/1048066885_2874368064_20170406165153.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-04-06T08%3A51%3A57Z%2F-1%2F%2F2be2ec79dc29385dd8ea2c99ef312848af04160a25a4821af9d3ad382bb4b76a&responseCacheControl=max-age%3D8640000&responseExpires=Sat%2C+15+Jul+2017+16%3A51%3A57+GMT&xcode=4cfc2506d3f8664096fa7c19df2eef49f121b14805cec943&time=1493562838&_=1493477363052"}} // Can be a URL or a local file.
                   rate={1.0}                   // 0 is paused, 1 is normal.
                   volume={1.0}                 // 0 is muted, 1 is normal.
                   muted={false}                // Mutes the audio entirely.
                   paused={false}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={true}                // Repeat forever.

                   style={styles.backgroundVideo} />

// Later on in your styles..





    );
    }

}
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});


export default Vedio;*/
