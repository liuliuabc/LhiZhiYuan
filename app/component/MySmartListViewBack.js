'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    ListView,
    RefreshControl,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform, AsyncStorage,
    InteractionManager, DeviceEventEmitter
} from 'react-native';
var {height, width} = Dimensions.get('window');
import {toastShort} from '../utils/ToastUtil';
import  MyLoadingMore from '../component/MyLoadingMore'
import PureRenderMixin from 'react-addons-pure-render-mixin';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
var isloading = false;
var didupdate=true;
class MySmartListView extends Component {
    constructor(props) {
        super(props);
        isloading = false;
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // console.log(this);
        this.onMyRefresh = this.onMyRefresh.bind(this);
        this.onMyRefresh2 = this.onMyRefresh2.bind(this);
        this.onMyLoadMore = this.onMyLoadMore.bind(this);
        this.state = ({
            listviewdatas: [],
            extra: '',
            loadall: false,
        });

    }
    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        onRefresh: PropTypes.func,
        onLoadMore: PropTypes.func,
        renderRow: PropTypes.func,
        initaldata: PropTypes.array,
        refreshSize: PropTypes.number,
        mycontext: PropTypes.object,
        autorefresh: PropTypes.bool,
        getinitaldata: PropTypes.func,
        uniquekey: PropTypes.string,
        url: PropTypes.string,
        emitlistener: PropTypes.string,

    }



    componentDidUpdate(){


      //  alert("componentDidUpdate")
        didupdate=true;
    }

    async  onMyRefresh(extra){
        DeviceEventEmitter.emit('spinner', true);
        var mycontext = this;
        AsyncStorage.getItem(this.props.url + extra, function (errs, result) {
            if (result) {
                mycontext.setState({
                    listviewdatas: JSON.parse(result),
                });
                DeviceEventEmitter.emit('spinner', false);
            }else{
                mycontext.setState({
                    listviewdatas: [],
                });
            }

            mycontext.onMyRefresh2(extra)

        })

    }

    myScrollEnd(){
        DeviceEventEmitter.emit('visable',"");
    }


    async  onMyRefresh2(extra) {

        this.loadingmore.changeLoadingState(2)
        //  this.setState({loadall:false})
        //  DeviceEventEmitter.emit("resetstate", '')
        if (!extra) {
            extra = '';
        }
        this.setState({extra: extra})
        // console.log(this);
        var mycontext = this;
        //alert(this.state.aaa);
        InteractionManager.runAfterInteractions(()=> {
            this.props.onRefresh(0, extra, function (addarr) {
                if ((addarr && addarr.length == 0) || !addarr){
                    mycontext.setState({
                        loadall: true,
                    });

                    DeviceEventEmitter.emit('spinner', false);
                    mycontext.myScrollEnd();
                    //  mycontext._pullToRefreshListView.endRefresh()
                    return;
                } else {
                    var newarr = addarr;
                    mycontext.setState({
                        listviewdatas: newarr,
                        loadall: false
                    });
                    AsyncStorage.setItem(mycontext.props.url + extra, JSON.stringify(newarr), function (errs) {
                    });
                }
                mycontext.myScrollEnd();

                DeviceEventEmitter.emit('spinner', false);


            });
        })


    }

    async  onMyLoadMore(extra){
       // alert("onMyLoadMore---")
        var extra = this.state.extra;
        var mycontext = this;
        //alert(this.state.aaa);
        InteractionManager.runAfterInteractions(() => {
            this.props.onLoadMore(mycontext.state.listviewdatas.length, extra, function (addarr) {
                if ((addarr && addarr.length == 0) || !addarr) {
                    isloading = false;
                    mycontext.loadingmore.changeLoadingState(1)
                    mycontext.setState({
                        loadall: true,

                    });
                    // toastShort('没有更多啦')
                    // mycontext._pullToRefreshListView.endLoadMore(true);
                } else {
                    var newarr = mycontext.state.listviewdatas.concat(addarr);
                   /* for(var i in addarr){
                         if(mycontext.state.listviewdatas.indexOf(addarr[i])<0){
                             newarr.push(addarr[i])
                         }
                    }*/
                    isloading = false;
                    mycontext.setState({
                        listviewdatas: newarr,
                    });
                    // mycontext._pullToRefreshListView.endLoadMore(false);
                }

            });
        })


    }

    _onScroll(event){
        //DeviceEventEmitter.emit('visable',"");
       // console.log(JSON.stringify(event.nativeEvent))
        let y = event.nativeEvent.contentOffset.y;//滑动高度
        /*if(y%700>0&&y%700<100){
            DeviceEventEmitter.emit('visable',"");
            console.log(JSON.stringify(event.nativeEvent))
        }*/


        let height = event.nativeEvent.layoutMeasurement.height;//view在屏幕的高度
        let contentHeight = event.nativeEvent.contentSize.height;//view内容渲染完全的高度
        if (height > contentHeight) {
            this.loadingmore.changeLoadingState(2);
            return;
        }
        if (this.state.loadall){
            return;
        }

        //alert("y + height="+(y + height)+"contentHeight="+contentHeight)
        if (y + height >= contentHeight-1000){
            if (isloading||!didupdate){
                return;
            } else {
                didupdate=false;
                isloading = true;
            }
            this.loadingmore.changeLoadingState(0);
            this.onMyLoadMore()
        }
    }


    render() {

        //  var mycontext=this;

        return (
            <ScrollView
                     onMomentumScrollEnd={this.myScrollEnd}


                      onScrollEndDrag={this.myScrollEnd}
                       onScroll={this._onScroll.bind(this)}
                        keyboardShouldPersistTaps={"always"}

                        ref={(component) => {
                            if (component) {
                                this.scrollview = component
                            }
                        }}
            >

                <ListView
                    keyboardShouldPersistTaps={"always"}
                    onScroll={this._onScroll.bind(this)}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={ false }
                    removeClippedSubviews={false}
                    scrollRenderAheadDistance={2000}
                    enableEmptySections={true}
                    initialListSize={5}
                    pageSize={5}
                    style={{flex: 1,backgroundColor: '#f7f7f7'}}

                    dataSource={ds.cloneWithRows(this.state.listviewdatas)}
                    renderRow={this.props.renderRow}

                >
                </ListView>
                <MyLoadingMore ref={(component) => {
                    if (component) {
                        this.loadingmore = component

                    }
                }}/>
            </ScrollView>





        )


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
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // modal上子View的样式
    subView: {
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    // 标题
    titleText: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 18,
        color: "green",
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
    horizonLine: {
        backgroundColor: '#f5f5f5',
        height: 1,
        alignSelf: 'center',
        width: width - 50,
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
export default MySmartListView
