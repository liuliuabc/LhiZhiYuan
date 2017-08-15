'use strict';

import React from 'react';
import {
    Dimensions, ActivityIndicator,
    Image,
    InteractionManager,
    View, WebView,
    Text, DeviceEventEmitter, TouchableHighlight, StyleSheet
} from 'react-native';
import {AsyncStorage} from 'react-native';
import   {colors, fonts, urls, sizes} from '../../common/commondata';
import * as NavigatorUtil from "../../utils/NavigatorUtil"
import Main from "../Main"

var {height, width} = Dimensions.get('window');
import * as LoadDataUtil from '../../utils/LoadDataUtil';
import Login from "../Login"
class MePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {


    }


    render() {
        // var  imgurl="http://192.168.253.9:8080/LiZhiYuanProject/ImageAction/publicImage/commonfile/01.jpg"
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:colors.pagebg}}>
                <View style={{
                    width: width, height: 18, backgroundColor: colors.main, flexDirection: 'row',
                }}/>
                <View style={{
                    width: width, height: 55, backgroundColor: colors.main, flexDirection: 'row',
                    alignItems: 'center',
                }}></View>
                <View style={{flex:1}}>
                    <Text>MePage.js</Text>

                </View>


            </View>



        );
    }
}


export default MePage;