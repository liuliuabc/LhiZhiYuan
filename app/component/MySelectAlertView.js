

'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal
} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';

var {height, width} = Dimensions.get('window');
import CheckBox from '../component/CheckBox'
import {toastShort} from '../utils/ToastUtil';

class MySelectAlertView extends Component {
    constructor(props){
        super(props);
        this.state = ({
            visiable: false,
            title: '',
            content: '',
            confirmtext: '',
            onconfirm: null,
            canceltext: '',
            buttonstyle:'',
            oncancel: null,
            size:15,
            singleline:true,
            maxselect:0,
            borderradius:1,
            values:[],//[{text:男,id:1,selected:true}]

        })
    }
    getSelectCount(){
        var values=this.state.values;
        var count=0;
        for(var i=0;i<values.length;i++){
            if(values[i].selected){
                count++;
            }

        }
        return count;


    }


    show(extras) {
        this.setState({
            visiable: true,
            title: extras.title,
            content: extras.content,
            buttonstyle:extras.buttonstyle,
            confirmtext: extras.confirmtext,
            onconfirm: extras.onconfirm,
            canceltext: extras.canceltext,
            oncancel: extras.oncancel,
            values:extras.values,
            size:extras.size,
            singleline:extras.singleline,
            maxselect:extras.maxselect,
            borderradius:extras.border
        });


    }



    hidden() {
        this.setState({
            visiable: false,
        });

    }



    render(){
        var values=this.state.values.concat();
        var mycontext = this;
        if (!this.state.visiable){
            return <View></View>
        }
       // {text:"",id:1,selected:true}
        const valuesViews = this.state.values.map(
            (items, i)=>{
                return   (
                    <CheckBox
                    key={i}
                    style={{paddingHorizontal: 30, paddingBottom:10,backgroundColor: 'white'}}
                    onClick={(lastvalue)=>{
                        if(lastvalue){
                            values[i].selected=false;
                            return false;
                        }else{
                            if(this.getSelectCount()>=this.state.maxselect){
                                toastShort("最多只能选择"+this.state.maxselect+"个内容")
                                values[i].selected=false;
                                return false;
                            } else{
                                values[i].selected=true;
                                return true;
                            }
                        }




                    }}
                    isChecked={items.selected}
                    boxborderwidth={1}
                    boxcolor={colors.main}
                    boxheight={this.state.size}
                    boxwidth={this.state.size}
                    iconsize={this.state.size-1}
                    boxradius={this.state.borderradius}
                    rightText={items.text}
                />)



            });

        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={mycontext.state.visiable}
                onShow={() => {
                }}
                onRequestClose={() => {
                }}>
                <View style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <View style={{
                            width: width - 100,  paddingTop:15, paddingLeft: 20, backgroundColor: 'white',

                        } }>

                            <Text style={{color: colors.main, fontSize: 15,}}>
                                {mycontext.state.title}</Text>

                        </View>

                        <View style={{
                            width: width - 100, paddingVertical: 10, backgroundColor: 'white',
                           justifyContent: 'center'
                        } }>
                            <Text style={{color: colors.text_important, fontSize: 13, paddingHorizontal: 30}}>
                                {mycontext.state.content}
                            </Text>

                        </View>
                        {valuesViews}


                        <View style={{
                            width: width - 100, paddingVertical:15, backgroundColor: 'white',
                            alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row',
                        } }>
                            <Text style={{color: colors.text_normal, fontSize: 13, paddingRight: 20}} onPress={()=>{
                                mycontext.state.oncancel();
                                mycontext.hidden()
                            }}>
                                {mycontext.state.canceltext}
                            </Text>
                            <Text style={{color: colors.main, fontSize: 13, paddingRight: 20}} onPress={()=>{
                                mycontext.state.onconfirm(values);
                                mycontext.hidden()

                            }}>
                                {mycontext.state.confirmtext}
                            </Text>



                        </View>
                    </View>



                </View>
            </Modal>
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
         backgroundColor:'black',
         opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // modal上子View的样式
    subView: {
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: 'white',

        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    // 标题
    titleText: {
        width: width - 100,
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

module.exports = MySelectAlertView;
