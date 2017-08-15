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
import   {colors, fonts, urls, sizes, rundata} from '../common/commondata';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import * as CommonUtil from "../utils/CommonUtil"

import Main from "../pages/Main"

var {height, width} = Dimensions.get('window');
import * as LoadDataUtil from '../utils/LoadDataUtil';
import Login from "../pages/Login"

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        AsyncStorage.multiGet(["domain","token","uid","labels"], (err, stores) => {
          // alert(JSON.stringify(stores))
            try{
                var domain=stores[0][1];
                var token=stores[1][1];
                var uid=stores[2][1];
                var labels=stores[3][1];
                if(domain&&token&&uid&&labels){
                    urls.domain=domain;
                    rundata.token=token;
                    rundata.uid=uid;
                    rundata.labels=JSON.parse(labels)
                    NavigatorUtil.navigator(Main, 'Main', {}, false, "replace");

                }else{
                    NavigatorUtil.navigator(Login, 'Login', {}, false, "replace");
                }

            }catch(e){
                NavigatorUtil.navigator(Login, 'Login', {}, false, "replace");
            }


        });
        CommonUtil.setDoamin();



    }


    render() {
        // var  imgurl="http://192.168.253.9:8080/LiZhiYuanProject/ImageAction/publicImage/commonfile/01.jpg"
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Image
                        source={require("../imgs/splash.png")}
                        style={{width: width, height: height}}
                    />

                </View>


            </View>



        );
    }
}


export default Splash;