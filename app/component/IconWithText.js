'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions,TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Modal, TextInput, DeviceEventEmitter

} from 'react-native';

import   {colors, fonts, urls, sizes} from '../common/commondata';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import PureRenderMixin from 'react-addons-pure-render-mixin';

class IconWithText extends Component{
    constructor(props){
        super(props);
        this.state=({
            selected: false,
            text:props.text
        });
      //  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    componentDidMount(){
        this.setState({
            selected: false,
            text:this.props.text
        });
    }

    static defaultProps={
        text: "",
        iconname: "md-help",
        defualtcolor: colors.text_not_impor,
        selectedcolor: colors.slightmain,
        iconsize: 25,
        margin:15,
        pressable:true,
        onlypressone:false,
        textsize:fonts.low
    };

    static propTypes = {
        text: PropTypes.string,
        iconname: PropTypes.string,
        defualtcolor: PropTypes.string,
        selectedcolor: PropTypes.string,
        iconsize: PropTypes.number,
        textsize: PropTypes.number,
        margin: PropTypes.number,
        pressable: PropTypes.bool,
        onMyPress: PropTypes.func,
        onlypressone:PropTypes.bool,

    }

    getColor() {
        if (this.state.selected) {
            return this.props.selectedcolor
        }else {
            return this.props.defualtcolor
        }

    }

    addOne(){
        try{
            var count=parseInt(this.state.text)+1;
            this.setState({text:count+""})
        }catch(e){}





    }



    render() {

        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                    try {
                        if (this.state.selected) {


                            if (this.props.onlypressone) {
                                return;
                            } else {
                                this.setState({selected: false})
                                if (this.props.onMyPress) {

                                    this.props.onMyPress();
                                }

                            }

                        } else {
                            this.setState({selected: true})
                            if (this.props.onMyPress){
                                this.addOne();
                                this.props.onMyPress();
                            }
                        }
                    }catch(e){
                        alert(e)
                    }



                }}
                >
               <View style={{alignItems: 'center', flexDirection: 'row',backgroundColor: 'transparent',
                   paddingLeft:this.props.margin,
               }} >
                   <Icon
                       name={this.props.iconname} // 图标
                       size={this.props.iconsize}
                       color={this.getColor()}/>
                   <Text style={{fontSize:this.props.textsize, color:this.getColor(), paddingLeft:5}}>{this.state.text}</Text>

               </View>



            </TouchableWithoutFeedback>




        )

    }

}
module.exports = IconWithText;
