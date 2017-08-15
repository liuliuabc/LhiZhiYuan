'use strict';

import React from 'react';
import {
    Image, ScrollView,

    View, WebView,
    Text, TouchableHighlight, Linking, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TopTitle from '../component/TopTitle';
import   {colors, fonts, urls, sizes} from '../common/commondata';


var {height, width} = Dimensions.get('window');

class UserDelegate extends React.Component {


    constructor(props) {
        super(props);

    }


    render() {
        var desc = `1、一切用户在下载并浏览本气体监控系统APP软件或WEB网页版时，均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆本APP或WEB网页版，或直接、间接使用本气体监控系统资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。
2、本系统在提供气体监测警报推送服务时，因用户不当操作而导致探头误测，产生的系统误报，本公司不承担任何法律责任。
3、对于因不可抗力或因黑客攻击、用户手机或电脑网络中断、应用被强制关闭等APP或WEB端不能控制的原因造成警报信息不能及时传达或丢失，本公司不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
4、本系统不保证为向用户提供便利而设置的外部链接的准确性和完整性。同时，对于该外部链接指向的不由本系统实际控制的任何网页上的内容，本公司不承担任何责任。
5、本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
6、本系统相关声明版权及其修改权、更新权和最终解释权均属所有。`;

        return (
            <View style={{flex: 1, backgroundColor: colors.pagebg}}>
                <TopTitle
                    leftview={<Image style={{width: 9, height: 18}}
                                     source={require('../imgs/icon_back.png')}></Image>}
                    lrwidth={50}
                    textalign={'center'}
                    title={'用户使用协议'}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 18, paddingTop: 30, color:colors.text_important}}>
                            《励志园用户使用协议》
                        </Text>

                        <Text style={{fontSize: 16, padding: 30, color: colors.text_normal}}>
                            {desc}
                        </Text>
                    </View>
                </ScrollView>


            </View>

        )
    }


}


export default UserDelegate;
