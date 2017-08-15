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
//var isloading = false;
//var isrefreshing=false;
//var didupdate=true;
class MySmartListView extends Component {
    constructor(props){
        super(props);
        //  isloading = false;
       // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // console.log(this);
        this.endRefresh = this.endRefresh.bind(this);
        this.endLoadMore = this.endLoadMore.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onScroll = this._onScroll.bind(this);

        this.state = ({
            listviewdatas: [],
            extra: '',
            loadall: false,
          //  refreshall:false,
            isrefreshing: false,
            isloading: false

        });
    }

    componentDidMount(){
        if(this.props.autorefresh){
            this._onRefresh();
        }
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

    myScrollEnd() {
       // DeviceEventEmitter.emit('visable', "");
    }

    async  endRefresh(data){
       // this.loadingmore.changeLoadingState(2);
        if (!data){
            return;
        }
        var mycontext = this;
        if ((data && data.length == 0) || !data) {
            mycontext.setState({
                isrefreshing: false,
            });
          // toastShort("最新数据已经加载完毕")
        }else{
            var newarr=data.concat(mycontext.state.listviewdatas);

            mycontext.setState({
                listviewdatas: newarr,
                isrefreshing: false,
                //  refreshall: false
            });

        }
        mycontext.myScrollEnd();
       // DeviceEventEmitter.emit('spinner', false);

    }

    async  endLoadMore(data){

        if (!data){
            this.loadingmore.changeLoadingState(1)
            return;
        }
        var mycontext = this;
        if ((data && data.length == 0) || !data){
            this.loadingmore.changeLoadingState(1);
            mycontext.setState({
                loadall:true,
                isloading:false,
            });
        }else{
            var newarr=mycontext.state.listviewdatas.concat(data);
            mycontext.setState({
                listviewdatas: newarr,
                loadall: false,
                isloading:false,
            });
        }
        mycontext.myScrollEnd();
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
        if (height > contentHeight){
            this.loadingmore.changeLoadingState(2);
            return;
        }
        if (this.state.loadall){
            return;
        }
        //alert("y + height="+(y + height)+"contentHeight="+contentHeight)
        if (y + height >= contentHeight - 1000){
            if (this.state.isloading){
                return;
            } else {
                //   didupdate=false;
                // isloading = true;
                this.setState({isloading: true})
            }
            this.loadingmore.changeLoadingState(0);
            var lastobj;
            if(this.state.listviewdatas.length>0){
                lastobj=this.state.listviewdatas[this.state.listviewdatas.length-1];
            }else{
                lastobj=null;
            }
            this.props.onLoadMore(lastobj);
        }
    }
    _onRefresh(){
        if (this.state.isrefreshing){
            return;
        } else {
            //   didupdate=false;
            // isloading = true;
            this.setState({isrefreshing: true})
        }
        var startobj;
        if(this.state.listviewdatas.length>0){
            startobj=this.state.listviewdatas[0];
        }else{
            startobj=null;
        }
        this.props.onRefresh(startobj);
    }


    render(){
        //  var mycontext=this;

        return (
            <ScrollView
                onMomentumScrollEnd={this.myScrollEnd}
                onScrollEndDrag={this.myScrollEnd}
                onScroll={this._onScroll.bind(this)}
                keyboardShouldPersistTaps={"always"}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isrefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }

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
                    style={{flex: 1, backgroundColor: '#f7f7f7'}}
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
