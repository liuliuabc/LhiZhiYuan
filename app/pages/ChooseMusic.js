'use strict';

import React from 'react';
import {
    Dimensions, ActivityIndicator,
    Image,
    InteractionManager, TextInput,
    View, WebView,ListView,TouchableOpacity,
    Text, DeviceEventEmitter, TouchableHighlight, StyleSheet
} from 'react-native';
import {AsyncStorage} from 'react-native';
var {height, width} = Dimensions.get('window');
import TopTitle from '../component/TopTitle';

import Icon from 'react-native-vector-icons/Ionicons';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import MyNativeMethod from '../component/MyNativeMethod';

import   {colors, fonts, urls, sizes, rundata} from '../common/commondata';
import * as CommonUtil from "../utils/CommonUtil"
var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});

class ChooseMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            originsongs:[],
            songs:[]

        })

    }

    componentDidMount() {
        var mycontext=this;
        MyNativeMethod.getMusicList(function(value){
            value = value.replace(/'/g,'"');
            var songs=JSON.parse(value).data;
            mycontext.setState({originsongs:songs,songs:songs})
        })
    }

    getRowView(rowdata, selectionId, rowID){
        return (
            <TouchableOpacity style={{width: width}}
                              onPress={()=> {


                              }}>
                <View style={{
                    width: width,
                    paddingVertical: 11.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 45, height: 45,  backgroundColor: colors.main,
                        marginHorizontal: 20, alignItems:'center', justifyContent:'center'
                    }}>
                        <Icon
                            name={"ios-musical-notes-outline"} //
                            size={40}
                            color={colors.text_normal}/>

                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            maxWidth: width*0.6,
                            fontSize: fonts.middle,
                            color: colors.text_important,
                            marginBottom: 2
                        }}>{rowdata.name}

                        </Text>

                        <Text style={{
                            maxWidth: width*0.6,
                            fontSize: fonts.small,
                            color: colors.text_not_impor,
                            marginTop: 2
                        }}>{"歌手:" + rowdata.singer + "      " + "时长:" + rowdata.duration}</Text>

                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10}}>
                        <Text style={{
                            fontSize: fonts.small,
                            color: colors.text_normal,
                            marginTop: 2
                        }}>{rowdata.size}</Text>
                    </View>


                </View>
                <View style={{width: width, height: 1, backgroundColor: colors.divider}}></View>

            </TouchableOpacity>

        )


    }
    getMusicListView(){
        return (
            <ListView
                keyboardShouldPersistTaps={"always"}
                showsVerticalScrollIndicator={true}
                pagingEnabled={ false }
                removeClippedSubviews={false}
                enableEmptySections={true}
                initialListSize={7}
                pageSize={7}
                style={{flex: 1, backgroundColor: '#f7f7f7'}}
                dataSource={ds.cloneWithRows(this.state.songs)}
                renderRow={this.getRowView}
            >
            </ListView>

        )


    }




    render() {
        var mycontext = this;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.pagebg}}>
                <TopTitle
                    leftview={<Image style={{width: 9, height: 18}}
                                     source={require('../imgs/icon_back.png')}></Image>}
                    lrwidth={50}
                    textalign={'center'}
                    title={'选择音乐'}

                    rightview={<Text style={{color: colors.white, fontSize: fonts.normal, paddingRight: 10}}>完成</Text>}
                    leftfun={()=> {

                    }}
                    rightfun={()=> {
                       // NavigatorUtil.navigator(Register, 'Register', {}, false);
                    }}

                />
                <View style={{flex: 1, alignItems: 'center'}}>
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
                            placeholder={"快速搜索"}
                            onChangeText={(text) =>{
                                if(!text){
                                    this.setState({songs: this.state.originsongs});
                                    return;

                                }

                                var songs=[];
                                for (var i = 0; i < this.state.originsongs.length; i++) {
                                    if (JSON.stringify(this.state.originsongs[i]).indexOf(text) >= 0) {
                                        songs.push(this.state.originsongs[i]);
                                    }
                                }
                                this.setState({songs:songs});



                            }}

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

                    </View></View>

                    {this.getMusicListView()}





                </View>


            </View>



        );
    }
}

export default ChooseMusic;