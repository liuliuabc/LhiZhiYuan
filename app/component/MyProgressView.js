'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal,ActivityIndicator
} from 'react-native';
import   {colors, fonts, urls, sizes} from '../common/commondata';

var {height, width} = Dimensions.get('window');

class MyProgressView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            visiable: false,
            title: '',
            progress:0
        })
    }

    show(title) {
        this.setState({
            visiable: true,
            title: title,
        });


    }

    hidden(){
        this.setState({
            visiable: false,
        });
    }
    setProgress(progress){
        this.setState({
            visiable: true,
            progress:progress
        });
    }


    render() {
        var mycontext = this;
        if (!this.state.visiable) {
            return <View></View>
        }

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
                            width: width - 60, height: 50, backgroundColor: 'white',
                            alignItems: 'center', flexDirection:'row'
                        } }>
                            <Text style={{color: colors.MYMAINCOLOR, fontSize: 15, paddingHorizontal: 20}}>
                                {mycontext.state.title}
                            </Text>

                            <ActivityIndicator
                                color="gray"
                                size="small"
                            />


                        </View>

                        <View style={{
                            width: width - 60, paddingVertical: 10, backgroundColor: 'white',
                            alignItems: 'center', flexDirection:'row', justifyContent:'center'
                        } }>
                            <View style={{
                                width: width - 140,
                                height: 10,
                                backgroundColor: 'gray',
                                borderColor: colors.MYMAINCOLOR,
                                borderWidth: 0.5,
                                borderRadius: 2,
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    width: this.state.progress * (width - 140),
                                    height: 10 - 1,
                                    backgroundColor: colors.MYMAINCOLOR,
                                    borderRadius: 2,
                                }}/>


                            </View>
                            <Text style={{fontSize:13,color:colors.MYMAINCOLOR, marginHorizontal:10}}>{`${parseInt(this.state.progress*100)>100?100:parseInt(this.state.progress*100)}%`}</Text>


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

module.exports = MyProgressView;
