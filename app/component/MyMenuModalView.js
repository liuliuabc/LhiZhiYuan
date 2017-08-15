

'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, Image
} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';
import AddContent from "../pages/AddContent"
import ChooseMusic from "../pages/ChooseMusic"
import MyNativeMethod from '../component/MyNativeMethod';

var {height, width} = Dimensions.get('window');
import * as NavigatorUtil from "../utils/NavigatorUtil"

class MyMenuModalView extends Component {
    constructor(props) {
        super(props);
        this.state=({
            visiablearr:[false,false,false,false,false],

            visiable:false,
        })
    }

    componentDidMount() {



    }

    componentDidUnMount() {
        if(this.Timer){
            clearInterval(this.Timer);

        }
    }

    show(){
        if(this.Timer){
            clearInterval(this.Timer);

        }
        this.setState({
            visiable:true,
        })
        var mycontext=this;
        var j=4;

        this.Timer=setInterval(function(){
            if(j<0){
                clearInterval(mycontext.Timer);
                return;
            }

            var  visiablearr=mycontext.state.visiablearr.concat();
            visiablearr[j]=true;
            mycontext.setState({
                visiablearr:visiablearr,
            })
            j--;
        },70);
    }
    hiddenNow(){
        this.setState({
            visiable:false,
        })

    }
    hidden(){
        var mycontext=this;
        var j=0;


        this.Timer=setInterval(function(){
            if(j>4){
                clearInterval(mycontext.Timer);
                mycontext.setState({
                    visiable:false,
                })
                return;
            }

            var  visiablearr=mycontext.state.visiablearr.concat();
            visiablearr[j]=false;
            mycontext.setState({
                visiablearr:visiablearr,
            })
            j++;

        },70);
    }


    render() {
         if(!this.state.visiable){
             return <View></View>
         }

        return (
            <Modal

                animationType='fade'
                transparent={true}
                visible={this.state.visiable}
                onShow={() => {
                }}
                onRequestClose={() => {
                }}>
                <TouchableOpacity onPress={()=>{
                    this.hidden()
                }} style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <TouchableOpacity
                            onPress={()=>{
                                 this.hiddenNow();
                                  NavigatorUtil.navigator(AddContent, 'AddContent', {type:"shipin",title:"视频汤",mediamaxcount:1,mediamincount:1,mediamaxsize:30}, false,"push");

                            }}

                            activeOpacity={0.6}
                            style={{



                                width:this.state.visiablearr[0]?50:0, height:50, borderRadius:25,
                                backgroundColor:'#e64a19', alignItems:'center', justifyContent:'center'
                            }}>
                            <Text style={{ fontSize:fonts.low,color:'white'}}>视频汤</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                NavigatorUtil.navigator(ChooseMusic, 'ChooseMusic', {}, false,"push");



                            }}

                            activeOpacity={0.6}
                            style={{
                                marginTop:15,
                                width:this.state.visiablearr[1]?50:0, height:50, borderRadius:25,
                                backgroundColor:'#5d4037', alignItems:'center', justifyContent:'center',
                            }}>
                            <Text style={{ fontSize:fonts.low,color:'white'}}>音乐汤</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.hiddenNow();
                                NavigatorUtil.navigator(AddContent, 'AddContent', {type:"tupian",title:"图片汤",mediamaxcount:6,mediamincount:1,mediamaxsize:5}, false,"push");

                            }}
                            activeOpacity={0.6}
                            style={{
                                marginTop:15,
                                width:this.state.visiablearr[2]?50:0, height:50, borderRadius:25,
                                backgroundColor:'#283593', alignItems:'center', justifyContent:'center'
                            }}>
                            <Text style={{ fontSize:fonts.low,color:'white'}}>图片汤</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.hiddenNow();
                                NavigatorUtil.navigator(AddContent, 'AddContent', {type:"yulu",title:"语录汤",mediamaxcount:0,mediamincount:0,mediamaxsize:0}, false,"push");

                            }}
                            activeOpacity={0.6}
                            style={{
                                marginTop:15,
                                width:this.state.visiablearr[3]?50:0, height:50, borderRadius:25,
                                backgroundColor:"#2e7d32", alignItems:'center', justifyContent:'center'
                            }}>
                            <Text style={{ fontSize:fonts.low,color:'white'}}>语录汤</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.hiddenNow();
                                NavigatorUtil.navigator(AddContent, 'AddContent', {type:"renwu",title:"人物汤",mediamaxcount:0,mediamincount:0,mediamaxsize:0}, false,"push");

                            }}
                            activeOpacity={0.6}
                            style={{
                                marginTop:15,
                                width:this.state.visiablearr[4]?50:0, height:50, borderRadius:25,
                                backgroundColor:'#6a1b9a', alignItems:'center', justifyContent:'center'
                            }}>
                            <Text style={{ fontSize:fonts.low,color:'white'}}>人物汤</Text>

                        </TouchableOpacity>




                    </View>

                </TouchableOpacity>
            </Modal>
        );
    }

}
//ECECF0
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    // modal的样式
    modalStyle: {

        //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'black',
        opacity: 0.5,
        alignItems: 'flex-end',
        paddingBottom: 130,
        paddingRight:10,
        justifyContent: 'flex-end',
        flex: 1,
    },
    // modal上子View的样式
    subView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',

    },
    // 标题
    titleText: {
        paddingVertical: 10,
        paddingLeft: 15,
        fontSize: 16,
        color: 'black'
    },
    // 内容
    contentText: {
        margin: 8,
        fontSize: 14,
    },
    // 水平的分割线
    horizontalLine: {

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

module.exports = MyMenuModalView;
