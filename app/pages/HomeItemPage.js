'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Dimensions, ActivityIndicator,
    Image,TextInput,
    InteractionManager,
    View, WebView,PixelRatio,
    Text, DeviceEventEmitter, TouchableOpacity, StyleSheet
} from 'react-native';
import {AsyncStorage} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';
import * as NavigatorUtil from "../utils/NavigatorUtil"

var {height, width} = Dimensions.get('window');
//import  Video from "react-native-video"
import  WebViewAutoHeight from "../component/WebViewAutoHeight"
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Icon from 'react-native-vector-icons/Ionicons';
import MySmartListView from '../component/MySmartListView';
import IconWithText from '../component/IconWithText';
import HomeRowView from '../component/HomeRowView';
import Vedio from '../pages/Vedio';
var requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');
import * as LoadDataUtil from '../utils/LoadDataUtil';
import * as CommonUtil from "../utils/CommonUtil"

class HomeItemPage extends React.Component {
    constructor(props) {
        super(props);
       // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }
    static propTypes ={
        ctype: PropTypes.string,
        url:PropTypes.string,
    }

    componentDidMount(){


        // alert(PixelRatio.getPixelSizeForLayoutSize(height))
      //  this.smartlistview.onMyRefresh("extra");

    }
    onRefresh(startobj){
        var mycontext=this;
        var tagid=0;
        if(startobj){
            tagid=startobj.id;
        }

        var parammap=CommonUtil.getParamMap();
        parammap.put("tagid",tagid);
        parammap.put("isnew",true);
        parammap.put("ctype",this.props.ctype);
        LoadDataUtil.loadDataWithCache(urls.domain+urls.getContent,parammap,function (result) {
            if(result){
                    mycontext.smartlistview.endRefresh(result);
            }else{
                mycontext.smartlistview.endRefresh([]);
            }


        })


    }

    onLoadMore(lastobj){
        var mycontext=this;

        var tagid=0;
        if(lastobj){
            tagid=lastobj.id;
        }
        var parammap=CommonUtil.getParamMap();
        parammap.put("tagid",tagid);
        parammap.put("isnew",false);
        parammap.put("ctype","tupian");
        LoadDataUtil.loadDataWithCache(urls.domain+urls.getContent,parammap,function (result) {
            if(result){
                    mycontext.smartlistview.endLoadMore(result);
            }else{
                mycontext.smartlistview.endLoadMore([]);
            }


        })


    }
    getRowView(rowdata, selectionId, rowID){

        return <HomeRowView rowID={rowID} rowData={rowdata} ctype={this.props.ctype}/>
    }

    getListView() {

        return (

            <MySmartListView
                ref={(ref) => {
                    if (ref && !this.smartlistview) {
                        this.smartlistview = ref
                    }
                }}

                url={"url"}
                style={{flex: 1}}
                renderRow={(rowdata, selectionId, rowID)=>this.getRowView(rowdata, selectionId, rowID)}
                onRefresh={this.onRefresh}
                onLoadMore={this.onLoadMore}
                autorefresh={true}
            />



        )
    }


    render() {
        return (
            <View style={{flex:1}}>
                {this.getListView()}

            </View>



        );
    }
}


export default HomeItemPage;