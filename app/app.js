//根据页面
'use strict';

import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,Keyboard,
    View,DeviceEventEmitter,InteractionManager,
    Platform
} from 'react-native';
import  Splash from './pages/Splash'
import MyAlertView from './component/MyAlertView';
import MySelectAlertView from './component/MySelectAlertView';

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
var _navigator;
import * as  ToastUtil from './utils/ToastUtil';
const  dismissKeyboard = require('dismissKeyboard');

class App extends React.Component {
    constructor(props) {
        super(props);errcode
        this.renderScene = this.renderScene.bind(this);
        this.goBack = this.goBack.bind(this);
        this.navigator = this.navigator.bind(this);
        this.showDialog=this.showDialog.bind(this);
        this.showSelectdialog=this.showSelectdialog.bind(this);

    }



    componentDidMount() {
        this.removeListener();
         this.backlistener= BackAndroid.addEventListener('hardwareBackPress', this.goBack);
         this.navigatorlistener= DeviceEventEmitter.addListener('navigator',this.navigator);
        this.alertlistener= DeviceEventEmitter.addListener('showdialog',this.showDialog );
        this.alertlistener= DeviceEventEmitter.addListener('showselectdialog',this.showSelectdialog );

    }
    componentWillUnMount(){
        this.removeListener();

    }
    removeListener(){
        if(this.backlistener){
            this.backlistener.remove();
        }
        if(this.navigatorlistener){
            this.navigatorlistener.remove();
        }
        if(this.alertlistener){
            this.alertlistener.remove();
        }

    }
    showDialog(extras){
        this.alert.show(extras);
    }
    showSelectdialog(extras){
        this.selectalertview.show(extras);
    }

    navigator(obj){
        dismissKeyboard();
        if(_navigator){
            if(obj.back){
                this.goBack();
            }else{
                if(obj.jumptype=="replace"){
                    _navigator.replace({
                        component: obj.component,
                        name: obj.name,
                        params: obj.params
                    });
                }else{
                    _navigator.push({
                        component: obj.component,
                        name: obj.name,
                        params: obj.params
                    });
                }


            }
        }
    }
    goBack(){
        if (_navigator && _navigator.getCurrentRoutes().length > 1) {
            _navigator.pop();
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
          //  listener.remove();
            this.removeListener();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastUtil.toastShort('再按一次退出应用');
        return true;
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        const {state, dispatch} = this.props;
        return (
            <Component navigator={navigator} route={route}   {...route.params} state={ state }
            />
        );
    }




    configureScene(route, routeStack) {
        var conf = Navigator.SceneConfigs.PushFromRight;
        conf.gestures = null;
        return conf;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent  = {true}
                    backgroundColor={'transparent'}
                    style={{height: STATUS_BAR_HEIGHT}}
                />
                <Navigator
                    ref='navigator'
                    style={styles.navigator}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
                        component: Splash,
                        name: 'Splash'
                    }}
                />
                <MyAlertView ref={(ref) => {
                    if (ref && !this.alert) {
                        this.alert = ref
                    }
                }}
                />
                <MySelectAlertView ref={(ref) => {
                    if (ref && !this.selectalertview){
                        this.selectalertview = ref
                    }
                }}
                />



            </View>
        );
    }
}
let styles = StyleSheet.create({
    navigator: {
        flex: 1,
    }
});

export default App;

