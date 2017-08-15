'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, DeviceEventEmitter

} from 'react-native';

import   {colors, fonts, urls, sizes} from '../common/commondata';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import * as NavigatorUtil from "../utils/NavigatorUtil"

class TopTitle extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string,
        leftview: PropTypes.object,
        rightview: PropTypes.object,
        lrwidth: PropTypes.number,
        lwidth: PropTypes.number,
        rwidth: PropTypes.number,
        titlepaddingleft: PropTypes.number,
        textalign: PropTypes.string,
        childview: PropTypes.object,
        leftfun: PropTypes.func,
        rightfun: PropTypes.func,
        lefticonname: PropTypes.string,
        lefticonsize: PropTypes.number,
        righticonname: PropTypes.string,
        righticonsize: PropTypes.number,
    }

    render() {
        if (this.props.childview) {
            return (
                <View style={{width: width, height: 63, alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                    <View style={{
                        width: width, height: 18, backgroundColor: colors.MYMAINCOLOR, flexDirection: 'row',
                    }}/>

                    <View style={{
                        width: width, height: 45, backgroundColor: colors.MYMAINCOLOR, flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        {this.props.childview}

                    </View>


                </View>)


        }

        const {
            title, leftview, rightview, titlepaddingleft, textalign, lrwidth, leftfun, rightfun, lefticonname,
            lefticonsize,
            righticonname, lwidth, rwidth,
            righticonsize,
        } = this.props;

        return (
            <View style={{width: width, alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                <View style={{
                    width: width, height: 18, backgroundColor: colors.main, flexDirection: 'row',
                }}/>

                <View style={{
                    width: width, height: 55, backgroundColor: colors.main, flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{
                        width: lwidth ? lwidth : lrwidth,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={()=> {
                        //DeviceEventEmitter.emit('spinner', false);

                        try {
                            leftfun();
                        } catch (e) {
                        }
                        NavigatorUtil.navigator(null,'',{},true)


                    }}>
                        {lefticonname ? ( <Icon
                            name={lefticonname} // 图标
                            size={lefticonsize ? lefticonsize : sizes.normal}
                            style={{marginLeft: 10}}
                            color={'white'}/>) : leftview}
                    </TouchableOpacity>
                    <Text style={{
                        color: colors.white,
                        fontSize: fonts.big,
                        flex: 1,
                        paddingLeft: titlepaddingleft ? titlepaddingleft : 0,
                        textAlign: textalign ? textalign : 'center',
                    }}>{title}</Text>
                    <TouchableOpacity style={{
                        width: rwidth ? rwidth : lrwidth,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onPress={()=> {
                        // DeviceEventEmitter.emit('spinner', false);
                        try {
                            rightfun();
                        } catch (e) {
                        }
                    }}>
                        {righticonname ? (<Icon
                            name={righticonname} // 图标
                            size={righticonsize ? righticonsize : sizes.normal}

                            style={{marginLeft: 10, borderWidth:1}}
                            color={colors.white}/>) : rightview}
                    </TouchableOpacity>

                </View>


            </View>)

    }

}
module.exports = TopTitle;
