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
var {height, width} = Dimensions.get('window');
import TopTitle from '../component/TopTitle';
import InputItem from '../component/InputItem';
import Register from './RegisterOne';
import Main from './Main';
import ResetPasswordOne from './ResetPasswordOne';
import Icon from 'react-native-vector-icons/Ionicons';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import * as md5 from "../utils/safe/md5"

import * as LoadDataUtil from '../utils/LoadDataUtil';
import * as ValidateUtil from '../utils/ValidateUtil';
import {toastShort} from '../utils/ToastUtil';
import   {colors, fonts, urls, sizes, rundata} from '../common/commondata';
import * as CommonUtil from "../utils/CommonUtil"
import * as EnAndDesc from "../utils/safe/EnAndDesc"





class Login extends React.Component {
    constructor(props) {

        super(props);
        this.state = ({
            unumber: '',
            password: '',
            buttondisable: true,
        });

    }

    componentDidMount() {

        CommonUtil.setDoamin();
    }

    doLogin() {
        if(!urls.domain){
            CommonUtil.setDoamin();
            toastShort("数据初始化失败,请重试");
            return;
        }
       var parammap=CommonUtil.getParamMap();
        var utype='phone';
        parammap.put("unumber",this.state.unumber);
        parammap.put("utype",utype);
        parammap.put("password",md5.hex_md5(this.state.password));
        LoadDataUtil.loadCommonData(urls.domain + urls.login, parammap, function (result) {
            if (result&&result.token&&result.uid){
               // alert(JSON.stringify(result))
                rundata.token=result.token;
                rundata.uid=result.uid;
               // toastShort("登录成功")
                NavigatorUtil.navigator(Main, 'Main', {}, false,"replace");
                AsyncStorage.setItem('token',result.token);
                AsyncStorage.setItem('uid',result.uid);

            }
        });

    }
    resetButtonDisable(unumber,password){
        if(ValidateUtil.validatePhone(unumber)&&ValidateUtil.validatePassword(password)){
            this.setState({
                buttondisable: false,
            });
        }else{
            this.setState ({
                buttondisable: true,
            });
        }


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
                    title={'登  录'}

                    rightview={<Text style={{color: colors.white, fontSize: fonts.normal, paddingRight: 10}}>注册</Text>}
                    leftfun={()=> {

                    }}
                    rightfun={()=> {
                        NavigatorUtil.navigator(Register, 'Register', {}, false);
                    }}

                />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{
                        width: 70, height: 70, marginVertical: 30, borderRadius: 35, backgroundColor: colors.text_form,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon
                            name={"ios-person"} // 图标
                            size={50}
                            color={colors.divider}/>


                    </View>

                    <InputItem title={'手 机 号'} textholder={'输入您的手机号'}
                               maxlenght={11}
                               keyboardtype={'numeric'}
                               errortext={"手机号应该是11位数字"}
                               validatefun={ValidateUtil.validatePhone}
                               onChangeText={(text)=>{
                                   mycontext.setState({unumber: text});
                                   mycontext.resetButtonDisable(text,this.state.password)
                               }}
                               value={mycontext.state.unumber}/>
                    <View style={styles.horizonLine}/>
                    <InputItem title={'密 码'} textholder={'输入您的密码'}
                               maxlenght={15}
                               errortext={"密码应该是6~15位英文或者数字"}
                               minlenght={6}
                               validatefun={ValidateUtil.validatePassword}
                               onChangeText={(text)=>{
                                   mycontext.setState({password: text});
                                   mycontext.resetButtonDisable(this.state.unumber,text)

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
                                            mycontext.doLogin();
                                        }}
                    >
                        <Text style={{fontSize: fonts.big, color: colors.white}}>登 录</Text>


                    </TouchableHighlight>
                    <View style={{width: width, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: fonts.small, color: colors.main, paddingRight: 10}} onPress={()=> {
                            NavigatorUtil.navigator(ResetPasswordOne, 'ResetPasswordOne', {}, false);

                        }}>忘记密码?</Text>

                    </View>


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

export default Login;