 /**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native'
 import Icon from 'react-native-vector-icons/Ionicons';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }

    static propTypes = {
        ...View.propTypes,
        leftText: React.PropTypes.string,
        leftTextView: React.PropTypes.element,
        rightText: React.PropTypes.string,
        leftTextStyle: Text.propTypes.style,
        rightTextView: React.PropTypes.element,
        rightTextStyle: Text.propTypes.style,
        onClick: React.PropTypes.func.isRequired,
        isChecked: React.PropTypes.bool,
        boxwidth:React.PropTypes.number,
        boxheight:React.PropTypes.number,
        boxradius:React.PropTypes.number,
        iconsize:React.PropTypes.number,
        boxborderwidth:React.PropTypes.number,
        boxcolor: React.PropTypes.string,


    }
    static defaultProps = {
        isChecked: false,
        leftTextStyle: {},
        rightTextStyle: {}
    }

    _renderLeft() {
        if (this.props.leftTextView)return this.props.leftTextView;
        if (!this.props.leftText)return null;
        return (
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
        )
    }
    _renderRight() {
        if (this.props.rightTextView)return this.props.rightTextView;
        if (!this.props.rightText)return null;
        return (
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
        )
    }

    _renderImage() {
        return this.genCheckedImage();
    }

    genCheckedImage(){

        if(this.props.boxwidth==2*this.props.boxradius){

            return     (<View style={{
                width:this.props.boxwidth,
                height:this.props.boxheight,
                borderRadius:this.props.boxradius,
                borderWidth:this.props.boxborderwidth,
                borderColor: this.props.boxcolor,
                alignItems:'center',
                justifyContent:'center'

            }}>

                {this.state.isChecked?<View style={{
                width:this.props.boxwidth/2,
                height:this.props.boxheight/2,
                borderRadius:this.props.boxheight/4,
                backgroundColor:this.props.boxcolor
            }}></View>:<View></View>}
            </View>)

        }




        return (
            <View style={{
                width:this.props.boxwidth,
                height:this.props.boxheight,
                borderRadius:this.props.boxradius,
                borderWidth:this.props.boxborderwidth,
                borderColor: this.props.boxcolor,
                alignItems:'center',
                justifyContent:'center'

            }}>
                {this.state.isChecked? <Icon
                    name={"md-checkmark"} // 图标
                    size={this.props.iconsize}
                    color={this.props.boxcolor}/>:<View></View>}

            </View>

        )
    }

    onClick() {
        var isChecked=this.props.onClick(this.state.isChecked);
        this.setState({
            isChecked: isChecked
        });
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={()=>this.onClick()}
                underlayColor='transparent'
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderImage()}
                    {this._renderRight()}
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
})
