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
var {height, width} = Dimensions.get('window');
import TopTitle from '../component/TopTitle';
import InputItem from '../component/InputItem';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '../component/CheckBox'
import ResetPasswordTwo from '../pages/ResetPasswordTwo'
import * as NavigatorUtil from "../utils/NavigatorUtil"
import * as LoadDataUtil from '../utils/LoadDataUtil';
import * as ValidateUtil from '../utils/ValidateUtil';


class ResetPasswordOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            unumber: '',
            password: '',
            isChecked:true,
            buttondisable: true,
        });
    }

    componentDidMount() {


    }
    resetButtonDisable(unumber){
        if(ValidateUtil.validatePhone(unumber)){
            this.setState({
                buttondisable: false,
            });
        }else{
            this.setState ({
                buttondisable: true,
            });
        }


    }


    componentWillUnmount() {
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
                    title={'重置密码'}
                    />
                <View style={{flex: 1, alignItems: 'center'}}>

                    <Text style={{fontSize: fonts.small, paddingVertical:15, color: colors.slightmain,paddingRight:10}}>点击下一步将会向您输入的手机号发送验证码</Text>



                    <InputItem title={'手 机 号'} textholder={'输入您的手机号'}
                               maxlenght={11}
                               keyboardtype={'numeric'}
                               errortext={"手机号应该是11位数字"}
                               validatefun={ValidateUtil.validatePhone}
                               onChangeText={(text)=>{
                                   mycontext.setState({unumber: text});
                                   mycontext.resetButtonDisable(text)


                               }}
                               value={mycontext.state.unumber}/>

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

                                            NavigatorUtil.navigator(ResetPasswordTwo,'ResetPasswordTwo',{unumber:mycontext.state.unumber},false);
                                        }}
                    >
                        <Text style={{fontSize: fonts.big, color: colors.white}}>下 一 步</Text>


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

export default ResetPasswordOne;