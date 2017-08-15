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
import   {colors, fonts, urls, sizes} from '../common/commondata';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import Login from "../pages/Login"

var {height, width} = Dimensions.get('window');
import * as LoadDataUtil from '../utils/LoadDataUtil';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from '../component/TabBar';
import  HomePage from './mainpages/HomePage';
import  MePage from './mainpages/MePage';
import  MessagePage from './mainpages/MessagePage';
import  RankPage from './mainpages/RankPage';
import  SchedulePage from './mainpages/SchedulePage';
var tabIconNames = ['ios-trophy-outline', 'ios-stats-outline', 'ios-list-box-outline', 'ios-chatbubbles-outline', 'ios-person-outline'];
var tabSelectedIconNames = ['ios-trophy', 'ios-stats', 'ios-list-box', 'ios-chatbubbles', 'ios-person'];
import * as EnAndDesc from "../utils/safe/EnAndDesc"

class Main extends React.Component{
    constructor(props){
        super(props);



    }


    componentDidMount(){

       /* AsyncStorage.getItem('token', function (err, token) {
            if(token){

            }else{

            }
        });*/



       /* LoadDataUtil.loadCommonData(urls.middledomain, '', function (result) {
            if (result && result.domain) {
                urls.domain=result.domain;
                AsyncStorage.setItem('domain', result.domain)
            }
        });
*/

    }


    render() {
        // var  imgurl="http://192.168.253.9:8080/LiZhiYuanProject/ImageAction/publicImage/commonfile/01.jpg"
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:colors.pagebg}}>

                <TabBar
                    navFontSize={8.5}
                    navTextColor={colors.text_normal}
                    navTextColorSelected={colors.main}
                    onItemSelected={(index) => {
                        console.log(`current item's index is ${index}`);
                    }}
                >

                    <TabBar.Item
                        onPress={()=> {

                        }}

                        icon={<Icon
                            name={tabIconNames[0]} // 图标
                            size={25}

                            color={colors.text_normal}/>}
                        selectedIcon={<Icon
                            name={tabSelectedIconNames[0]} // 图标
                            size={25}
                            color={colors.main}/>}

                        title='鸡汤园'>

                     <HomePage ref="homepage"/>

                    </TabBar.Item>


                    <TabBar.Item

                        onPress={()=> {

                        }}
                        icon={<Icon
                            name={tabIconNames[1]} // 图标
                            size={25}
                            color={colors.text_normal}/>}
                        selectedIcon={<Icon
                            name={tabSelectedIconNames[1]} // 图标
                            size={25}
                            color={colors.main}/>}
                        title='排行'>
                        <RankPage ref="rankpage"/>


                    </TabBar.Item>


                    <TabBar.Item
                        onPress={()=> {

                        }}
                        icon={<Icon
                            name={tabIconNames[2]} // 图标
                            size={25}
                            color={colors.text_normal}/>}
                        selectedIcon={<Icon
                            name={tabSelectedIconNames[2]} // 图标
                            size={25}
                            color={colors.main}/>}


                        title='todo'>

                        <SchedulePage ref="schedulepage"/>

                    </TabBar.Item>


                   <TabBar.Item
                       badge={99}
                        onPress={()=> {

                        }}
                        icon={<Icon
                            name={tabIconNames[3]} // 图标
                            size={25}
                            color={colors.text_normal}/>}
                        selectedIcon={<Icon
                            name={tabSelectedIconNames[3]} // 图标
                            size={25}
                            color={colors.main}/>}
                        title='消息'>
                       <MessagePage ref="messagepage"/>
                    </TabBar.Item>


                    <TabBar.Item
                        onPress={()=> {

                        }}

                        icon={<Icon
                            name={tabIconNames[4]} // 图标
                            size={25}
                            color={colors.text_normal}/>}
                        selectedIcon={<Icon
                            name={tabSelectedIconNames[4]} // 图标
                            size={25}
                            color={colors.main}/>}
                        title='我的'>
                        <MePage ref="mepage"/>

                    </TabBar.Item>

                </TabBar>


            </View>



        );
    }
}


export default Main;