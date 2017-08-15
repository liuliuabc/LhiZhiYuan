/*
 'use strict';

 import React, { Component, PropTypes } from 'react';
 import {
 View,
 requireNativeComponent,
 processColor  // 字符Color转换为数字
 } from 'react-native';

 const MapView = requireNativeComponent('MyMapView', {
 propTypes: {
 color: PropTypes.number,
 radius: PropTypes.number,
 ...View.propTypes // 包含默认的View的属性
 },
 });

 class MyMapView extends Component {

 static propTypes = {
 radius: PropTypes.number,
 color: PropTypes.string, // 这里传过来的是string
 ...View.propTypes // 包含默认的View的属性
 }

 render() {
 const { style, radius, color } = this.props;

 return (
 <MapView
 style={style}
 radius={radius}
 color={processColor(color)}
 />
 );
 }

 }

 module.exports = MyMapView;*/


'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal
} from 'react-native';

var {height, width} = Dimensions.get('window');
var j=0;

class MyLoadingMore extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loadingstate: 2,   //0 加载中      1 加载完毕  2隐藏
            loadingtext:'数据加载中...'
        })
    }

    changeLoadingState(state){
        var mycontext=this;
        this.setState({loadingstate: state})
        /*if(state==0){
            this.timer=setInterval(function () {
                if(j%3==0){
                    mycontext.setState({loadingtext:'数据加载中..'})
                }else if (j%3==1){
                    mycontext.setState({loadingtext:'数据加载中...'})

                }else {
                    mycontext.setState({loadingtext:'数据加载中.'})
                }
                j+=1;
                },300)

        }else{
            if(this.timer){
                clearInterval(this.timer)
            }
        }*/

    }

    componentWillUnMount(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }



    getLoadingView() {
        if (this.state.loadingstate == 0){
            return (
                <View style={{
                    width: width, paddingVertical:3, backgroundColor: 'gray', flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Text style={{fontSize: 10}}>{this.state.loadingtext}</Text>
                </View>



            )


        } else  if(this.state.loadingstate == 1){

            return(
                <View style={{
                    width: width, paddingVertical:3,backgroundColor: 'gray', opacity:0.5,flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 10}}>数据加载完毕</Text>
                </View>



            )


        }else{
            return <View></View>

        }


    }


    render() {

        return (
                this.getLoadingView()
        );
    }

}
//ECECF0
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // modal的样式
    modalStyle: {
        backgroundColor: 'black',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // modal上子View的样式
    subView: {
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'white',

        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    // 标题
    titleText: {
        width: width - 60,
        height: 50,
        backgroundColor: 'green',
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // 内容
    contentText: {
        margin: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    // 水平的分割线
    horizontalLine: {
        marginTop: 5,
        height: 0.5,
        backgroundColor: '#ccc',
    },
    // 按钮
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 竖直的分割线
    verticalLine: {
        width: 0.5,
        height: 44,
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: '#3393F2',
        textAlign: 'center',
    },
});

module.exports = MyLoadingMore;
