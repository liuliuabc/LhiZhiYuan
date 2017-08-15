'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View, Text, Dimensions, WebView,PanResponder, StyleSheet,  DeviceEventEmitter,TouchableOpacity

} from 'react-native';

import   {colors, fonts, urls, sizes} from '../common/commondata';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import PureRenderMixin from 'react-addons-pure-render-mixin';

class MyWebview extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selected: false
        });
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,

        });

    }
    _handleStartShouldSetPanResponder(e, gestureState){
        return true;
    }
    onPanResponderTerminate (evt, gestureState) {
        // Another component has become the responder, so this gesture
        // should be cancelled
        return true;
    }
    onResponderTerminationRequest(evt, gestureState) {
        // Another component has become the responder, so this gesture
        // should be cancelled
        return true;
    }

    static defaultProps = {
        html: "",

    };

    static propTypes = {
        html: PropTypes.string,


    }



    render() {

        return (
            <TouchableOpacity  {...this._panResponder.panHandlers}  onPress={()=>{}}  style={{width: width - 20, height: height / 3,}}>

                <WebView
                    onPress={()=>{}}
                    onStartShouldSetPanResponder={()=>{
                        return true}}
                    onResponderTerminationRequest={()=>{
                        return true;
                    }}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    automaticAdjustContentInsets={true}
                    style={{width: width - 20, height: height / 3, backgroundColor:colors.pagebg}}
                    source={{uri:"http://10.238.135.52:8080/MyWeb/1.mp4"}}
                />

            </TouchableOpacity>

        )

    }

}
module.exports = MyWebview;
