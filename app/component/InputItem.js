'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal, TextInput

} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';
var {height, width} = Dimensions.get('window');

class InputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "",validate:true,showhint:false};
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
        onlinevalidatefun: PropTypes.func,
        keyboardtype:PropTypes.string,
        returnkeytype:PropTypes.string,

    }
    getHintDesc(){
        var desc="";
        if(this.state.validate==-1){
            desc=`该昵称已经被使用`;
        }else if(this.state.validate){
             desc=`还可输入${this.props.maxlenght-this.state.text.length}个文字`;
        }else{
            desc=this.props.errortext;
        }
        return desc;




    }

    render() {
        const {title,onlinevalidatefun,keyboardtype, returnkeytype,minlenght,textholder,validatefun, onChangeText, value, secureTextEntry, editable,maxlenght} = this.props;
        var myeditable = editable;
        if (myeditable == undefined) {
            myeditable = true;
        }
        var mycontext=this;

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
                        onChangeText={(text) =>{
                            onChangeText(text);
                            if(text.length==maxlenght||(minlenght&&text.length>=minlenght)){
                                this.setState({text:text,validate:validatefun(text)});
                            }else{
                                this.setState({text:text});
                            }


                        }}
                        maxLength={maxlenght}
                        editable={myeditable}
                        value={value}
                        keyboardType={keyboardtype?keyboardtype:'default'}
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
                                if(onlinevalidatefun){
                                    onlinevalidatefun(mycontext.state.text,function(validate){
                                        if(validate){
                                            mycontext.setState({showhint:false,validate:validate});
                                        }else{
                                            mycontext.setState({showhint:true,validate:-1});
                                        }

                                    })
                                }


                            }else{
                                this.setState({showhint:true,validate:validate});
                            }



                        }}
                        underlineColorAndroid={'transparent'}

                    />
                    <Text style={{
                        position:'absolute',
                        height: this.state.showhint?10:0,
                        left:width-50-(this.getHintDesc().length*3.5),
                        right:0,
                        top:40,
                        bottom:0,
                        color:this.state.validate==true?colors.text_normal:colors.error,
                        opacity:0.6,
                        fontSize:fonts.low-5,

                    }}>{this.getHintDesc()}</Text>

                </View>



        );
    }

}
//ECECF0


module.exports = InputItem;
