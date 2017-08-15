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
import   {colors, fonts, urls, sizes,constants} from '../common/commondata';
var {height, width} = Dimensions.get('window');
import TopTitle from '../component/TopTitle';
import InputItem from '../component/InputItem';
import CodeInputItem from '../component/CodeInputItem';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '../component/CheckBox'
import * as LoadDataUtil from '../utils/LoadDataUtil';
import {toastShort} from '../utils/ToastUtil';
import * as ValidateUtil from '../utils/ValidateUtil';
import * as md5 from "../utils/safe/md5"
import * as CommonUtil from "../utils/CommonUtil"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            unumber: props.unumber,
            password: '',
            nickname:'',
            code:"",
            isChecked:true,
            buttondisable: true,
        });
        this.onlineValidate=this.onlineValidate.bind(this);
    }

    componentDidMount() {
        CommonUtil.setDoamin();

    }


    resetButtonDisable(code,password,nickname){
        if(ValidateUtil.validateCode(code)&&ValidateUtil.validatePassword(password)&&ValidateUtil.validateNickName(nickname)){
            this.setState({
                buttondisable: false,
            });
        }else{
            this.setState ({
                buttondisable: true,
            });
        }


    }


    doRegister(){
        if(!urls.domain){
            CommonUtil.setDoamin();
            toastShort("数据初始化失败,请重试");
            return;
        }
        var parammap=CommonUtil.getParamMap();

        var utype='phone';

        parammap.put("unumber",this.props.unumber);
        parammap.put("utype",utype);
        parammap.put("password",md5.hex_md5(this.state.password));
        parammap.put("code",this.state.code);
        parammap.put("nickname",this.state.nickname);
      //  alert(extra)
        LoadDataUtil.loadCommonData(urls.domain+urls.register,parammap,function (result) {
            if(result){
                toastShort("注册成功")
            }
        });


    }
    onlineValidate(nickname,myfun){
        try{
            var parammap=CommonUtil.getParamMap();
            parammap.put("nickname",nickname);
            LoadDataUtil.loadCommonData(urls.domain+urls.validatenickname,parammap,function (result) {
                if(result&&result.validate!=undefined){
                    myfun(result.validate)
                }
            });
        }catch(e){}




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
                    title={'注   册'}
                    />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{width:width, height:15}}></View>


                    <CodeInputItem textholder={'请输入验证码'}
                                   maxlenght={8}
                                   keyboardtype={'email-address'}
                                   errortext={"验证码应该是4~8位英文或者数字"}
                                   validatefun={ValidateUtil.validateCode}
                                   minlenght={4}

                                   onChangeText={(text)=>{
                                       mycontext.setState({code: text})
                                       mycontext.resetButtonDisable(text,mycontext.state.password,mycontext.state.nickname)

                                   }}
                                   value={mycontext.state.code} getPhone={()=> {
                        return mycontext.props.unumber;

                    }}/>
                    <View style={styles.horizonLine}/>

                    <InputItem  textholder={'请设置昵称(4~15位汉字，英文或者数字)'}
                                minlenght={4}
                                onChangeText={(text)=>{
                                    mycontext.setState({nickname: text})
                                    mycontext.resetButtonDisable(mycontext.state.code,mycontext.state.password,text)

                                }}
                                maxlenght={15}
                                errortext={"昵称应该是4~15位汉字，英文或者数字"}
                                onlinevalidatefun={this.onlineValidate}
                                validatefun={ValidateUtil.validateNickName}
                                value={mycontext.state.nickname}/>
                    <View style={styles.horizonLine}/>

                    <InputItem title={''} textholder={'请设置密码(6~15位英文或者数字)'}
                               maxlenght={15}
                               minlenght={6}
                               errortext={"密码应该是6~15位英文或者数字"}

                               validatefun={ValidateUtil.validatePassword}
                               onChangeText={(text)=>{
                                   mycontext.setState({password: text})
                                   mycontext.resetButtonDisable(mycontext.state.code,text,mycontext.state.nickname)

                               }}
                               value={mycontext.state.password}
                               secureTextEntry={true}/>



                    <TouchableHighlight style={{
                        width: width - 20,
                        height: 40,
                        backgroundColor: this.state.buttondisable ? colors.text_not_impor : colors.main,
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 15,
                    }}
                                        disabled={this.state.buttondisable}

                                        underlayColor={colors.darkmain}
                                        onPress={()=> {
                                            mycontext.doRegister();
                                        }}
                    >
                        <Text style={{fontSize: fonts.big, color: colors.white}}>提交注册</Text>


                    </TouchableHighlight>


                </View>


            </View>



        );
    }
}
var styles = StyleSheet.create({

    horizonLine: {
        backgroundColor: colors.pagebg,
        height: 1,
        alignSelf: 'center',
        width: width,
    },

});

export default Register;