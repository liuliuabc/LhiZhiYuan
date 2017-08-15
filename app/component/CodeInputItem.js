'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal, TextInput,NetInfo

} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';
var {height, width} = Dimensions.get('window');
import * as  ToastUtil from '../utils/ToastUtil';

class CodeInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "",codedesc: "重新获取", codeenable: true,validate:true,showhint:false};
    }
    static propTypes = {
        title: PropTypes.string,
        textholder: PropTypes.string,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        editable: PropTypes.bool,
        maxlenght: PropTypes.number,
        minlenght: PropTypes.number,
        errortext: PropTypes.string,
        validatefun: PropTypes.func,
        getPhone: PropTypes.func,
        keyboardtype: PropTypes.string,
        returnkeytype: PropTypes.string,

    }
    getHintDesc(){
        var desc="";
        if(this.state.validate){
            desc=`还可输入${this.props.maxlenght-this.state.text.length}个文字`;

        }else{
            desc=this.props.errortext;
        }
        return desc;




    }


    checkMobile(str) {
        var re = /^1[34578]\d{9}$/;
        if (re.test(str)) {
            //alert("正确");
            return true;

        } else {
            return false;
            // alert("错误");
        }
    }


    pressCode() {
        var mycontext = this;
        if (!mycontext.state.codeenable) {
            return;
        } else {
          //  NetInfo.isConnected.fetch().done((isConnected) => {
                if (this.props.getPhone() == '' || this.props.getPhone() == undefined || this.props.getPhone() == '未绑定') {
                    ToastUtil.toastShort('请您先绑定或输入手机号再进行操作');
                    return;
                }
                if (!this.checkMobile(this.props.getPhone())) {
                    ToastUtil.toastShort('手机号格式不正确');
                    return;
                }
                var i = 60;
                mycontext.setState({codeenable: false});
              //  MyNativeMethod.sendSms(this.props.getPhone());
                ToastUtil.toastShort("验证码已发送");
                mycontext.timer = setInterval(function () {
                    i--;
                    var desc = i + "秒";
                    mycontext.setState({codedesc: desc});
                    if (i == 0) {
                        mycontext.setState({codedesc: '获取验证码', codeenable: true});
                        clearInterval(mycontext.timer);
                    }
                }, 1000);

          //  });

        }

    }

    componentWillUnMount() {
        if(this.timer){
            clearInterval(this.timer);
        }
    }

    render() {
        const {title,minlenght,returnkeytype,keyboardtype, textholder,validatefun,maxlenght, onChangeText, value, secureTextEntry, editable} = this.props;
        var myeditable = editable;
        if (myeditable == undefined) {
            myeditable = true;
        }

        return (
            <View style={{
                width: width,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.white
            }}>
                <Text style={{
                    color: colors.text_normal,
                    width: title ? 80 : 0,
                    fontSize: fonts.normal,
                    marginLeft: 15
                }}>{title}
                </Text>
                <TextInput
                    ref={"input1"}
                    placeholderTextColor={colors.text_form}
                    placeholder={textholder}
                    onChangeText={(text) => {
                        onChangeText(text);
                        if(text.length==maxlenght||(minlenght&&text.length>=minlenght)){
                            this.setState({text:text,validate:validatefun(text)});
                        }else{
                            this.setState({text:text});
                        }
                    }}
                    maxLength={maxlenght}
                    keyboardType={keyboardtype?keyboardtype:'default'}
                    editable={myeditable}
                    value={value}
                    returnKeyType={returnkeytype?returnkeytype:'done'}
                    secureTextEntry={secureTextEntry}
                    style={{
                        flex: 1,
                        fontSize: fonts.normal,
                        color: colors.text_normal,
                        height: 45,
                        marginRight: 20,
                        alignSelf: 'center'

                    }}
                    onFocus={()=>{
                        this.setState({showhint:true,validate:true});
                    }}
                    onBlur={()=>{
                        var validate=validatefun(this.state.text);
                        if(validate){
                            this.setState({showhint:false,validate:validate});
                        }else{
                            this.setState({showhint:true,validate:validate});
                        }



                    }}
                    underlineColorAndroid={'transparent'}

                />
                <TouchableOpacity style={{
                    marginRight: 10,
                    width: 90,
                    height: 35,
                    backgroundColor: this.state.codeenable ? colors.slightmain : colors.text_form,
                    alignItems: 'center',
                    justifyContent: 'center'
                }} onPress={this.pressCode.bind(this)}>
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                    }}>{this.state.codedesc}</Text>
                </TouchableOpacity>

                <Text style={{
                    position:'absolute',
                    height: this.state.showhint?10:0,
                    left:width-50-90-(this.getHintDesc().length*5),
                    right:0,
                    top:40,
                    bottom:0,
                    color:this.state.validate?colors.text_normal:colors.error,
                    opacity:0.6,
                    fontSize:fonts.low-5,

                }}>{this.getHintDesc()}</Text>

            </View>


        );
    }

}
//ECECF0


module.exports = CodeInputItem;
