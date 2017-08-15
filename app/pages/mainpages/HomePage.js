'use strict';

import React from 'react';
import {
    Dimensions, ActivityIndicator,
    Image,TextInput,
    InteractionManager,TouchableOpacity,
    View, WebView,
    Text, DeviceEventEmitter, TouchableHighlight, StyleSheet
} from 'react-native';
import {AsyncStorage} from 'react-native';
import   {colors, fonts, urls, sizes,rundata} from '../../common/commondata';
import * as NavigatorUtil from "../../utils/NavigatorUtil"
import Main from "../Main"
import HomeItemPage from "../HomeItemPage"
import MyMenuModalView from "../../component/MyMenuModalView"
var {height, width} = Dimensions.get('window');
import * as LoadDataUtil from '../../utils/LoadDataUtil';
import Login from "../Login"
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, {ScrollableTabBar} from '../../component/react-native-scrollable-tab-view';
class MePage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){



    }


    render(){
        // var  imgurl="http://192.168.253.9:8080/LiZhiYuanProject/ImageAction/publicImage/commonfile/01.jpg"
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:colors.pagebg}}>
                <View style={{
                    width: width, height: 18, backgroundColor: colors.main, flexDirection: 'row',
                }}/>
                <View style={{
                    width: width, height: 55, backgroundColor: colors.main, flexDirection: 'row',
                    alignItems: 'center', justifyContent:'center'
                }}>
                    <View style={{backgroundColor:colors.white, width:width-60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height:30, borderRadius:3}}>
                        <Icon
                            name={"md-search"} // 图标
                            size={sizes.normal}
                            style={{paddingHorizontal:10}}
                            color={colors.text_not_impor}/>

                        <TextInput
                            ref={"input1"}
                            placeholderTextColor={colors.text_not_impor}
                            placeholder={"大家正在搜：马云2017励志演讲"}
                            onChangeText={(text) =>{

                            }}
                            value={"大家正在搜：马云2017励志演讲"}

                            style={{
                                position: 'absolute',
                                top: 0,
                                color:colors.text_not_impor,
                                left: 40,
                                width: width-100,
                                fontSize: fonts.small,
                                flex:1,
                                height: 30,
                                padding: 0,
                                backgroundColor: "transparent",
                            }}
                            onFocus={()=>{
                            }}
                            onBlur={()=>{
                            }}
                            underlineColorAndroid={'transparent'}

                        />

                    </View>

                </View>
                <ScrollableTabView
                    style={{width:width,flex:1}}
                    tabBarTextStyle={{fontSize: fonts.normal, textAlign:'center', height:20, marginBottom:13}}
                    tabBarInactiveTextColor={colors.text_normal}
                    tabBarActiveTextColor={colors.main}
                    tabBarBackgroundColor={colors.white}
                    tabBarUnderlineColor={colors.main}
                    scrollWithoutAnimation={true}
                    tabBarUnderlineStyle={{
                        height: 3,
                        backgroundColor: colors.main
                    }}
                    renderTabBar={() => <ScrollableTabBar tabStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems:'center'
                    }} style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}/>}>
                    <HomeItemPage tabLabel='热门' ctype="hot"/>
                    <HomeItemPage tabLabel='视频' ctype="shipin"/>
                    <HomeItemPage tabLabel='音乐' ctype="yinyue"/>
                    <HomeItemPage tabLabel='图片' ctype="tupian"/>
                    <HomeItemPage tabLabel='语录' ctype="yulu"/>
                    <HomeItemPage tabLabel='人物' ctype="renwu"/>
                </ScrollableTabView>

                <TouchableOpacity
                    onPress={()=>{
                        this.refs.mymenumodalview.show()
                    }}
                    activeOpacity={0.6}
                    style={{
                    opacity:0.85,
                    position:'absolute',
                    left: width-60,
                    top: height-110,
                    width:50, height:50, borderRadius:25,
                    backgroundColor:colors.main, alignItems:'center', justifyContent:'center'
                }}>
                    <Text style={{ fontSize:35,color:'white'}}>+</Text>

                </TouchableOpacity>
                <MyMenuModalView ref="mymenumodalview"/>

            </View>



        );
    }
}


export default MePage;