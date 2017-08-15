'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,ListView,
    Text,
    Dimensions,
    TouchableWithoutFeedback, PanResponder,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    DeviceEventEmitter,
    WebView

} from 'react-native';
import   {colors, fonts, urls, sizes, rundata} from '../common/commondata';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import IconWithText from './IconWithText';
import MyVideoWebview from './MyWebview';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
import * as LoadDataUtil from '../utils/LoadDataUtil';
import * as CommonUtil from "../utils/CommonUtil"
var requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');
import PureRenderMixin from 'react-addons-pure-render-mixin';

class HomeRowView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            visiable: false,
         //   rowData: props.rowData
        });
      //  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }



    /* static defaultProps = {
     text: "",
     iconname: "md-help",
     defualtcolor: colors.text_not_impor,
     selectedcolor: colors.slightmain,
     iconsize: 25,
     margin:15,
     pressable:true,
     onlypressone:false,
     };
     */
    static propTypes ={
        posterurl: PropTypes.string,
        videourl: PropTypes.string,
        rowID: PropTypes.string,
        rowData: PropTypes.object,
    }


    componentDidMount(){
        var topheight = 18 + 55 + 40;
        var mycontext = this;
        this.visablelistener = DeviceEventEmitter.addListener('visable', function (e) {
            try {
                mycontext.view.measure((x, y, width, heght, left, top)=> {
                    if (typeof (heght + top) == 'number') {
                        if (top > height || (heght + top - topheight) < 0) {
                            mycontext.setState({visiable: false})
                        } else {
                            mycontext.setState({visiable: true})
                        }
                    }
                })
            } catch (e) {
            }


        });


    }

    componentDidUnMount() {
        if (this.visablelistener) {
            this.visablelistener.remove();
        }
    }

    componentWillUnMount() {
        if (this.visablelistener) {
            this.visablelistener.remove();
        }
    }


    getMediaView() {
        var visiable = this.state.visiable;
        if (visiable) {

            return <MyVideoWebview html={this.getHtml()}/>

        } else {
            return <View style={{width: width - 20, height: height / 3}}></View>
        }

    }

    getImageRowView(rowdata, selectionId, rowID) {
        return <View></View>
        return (<Image source={{uri: rowdata}}
                       style={{
                           width: (width - 150) / 3,
                           height: (width - 150) / 3,
                           margin: 10,
                           borderRadius: 2,
                       }}>

        </Image>)


    }

    getMediaListView(mediadata) {
        return (
            <ListView
                showsVerticalScrollIndicator={false}
                initialListSize={12}
                removeClippedSubviews={false}
                contentContainerStyle={{

                    flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center',
                    backgroundColor: colors.white
                }}
                enableEmptySections={true}
                dataSource={ds.cloneWithRows(mediadata)}
                renderRow={(rowdata, selectionId, rowID)=>this.getImageRowView(rowdata, selectionId, rowID)}
            >
            </ListView>
        )


    }

    getSplitArray(str) {
        return str.split(";");

    }


    getHtml() {
        var html = `<head>
    <link href="http://vjs.zencdn.net/5.19.2/video-js.css" rel="stylesheet">

    <!-- If you'd like to support IE8 -->
    <script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
</head>
   

<body>
<video id="my-video" class="video-js" controls preload="none"  width="330px" height="200px"
       poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494083667&di=38661f016bdc3873c84671fd65db4588&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.hbybgs.com%2Fbook_cover%2Fbd64815.jpg" data-setup="{}">
    <source src="http://10.238.135.52:8080/MyWeb/1.mp4" type='video/mp4'>
    
    <source src="http://pgccdn.v.baidu.com/1048066885_2874368064_20170406165153.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-04-06T08%3A51%3A57Z%2F-1%2F%2F2be2ec79dc29385dd8ea2c99ef312848af04160a25a4821af9d3ad382bb4b76a&responseCacheControl=max-age%3D8640000&responseExpires=Sat%2C+15+Jul+2017+16%3A51%3A57+GMT&xcode=4cfc2506d3f8664096fa7c19df2eef49f121b14805cec943&time=1493562838&_=1493478913052" type='video/webm'>
    <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
</video>

 <script src="http://vjs.zencdn.net/5.19.2/video.js"></script>
</body>`;
        return html;

    }

    getTimeDesc(datestr) {
        var timestr = datestr.substring(datestr.indexOf(" "));
        var date1 = new Date(Date.parse(datestr.replace(/-/g, "/")));
        //  var date1=new Date(timestr.replace(/-/,"/"));  //内容时间
        var date2 = new Date();    //当前时间
        var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数
        var datess = Math.ceil(date3 / 1000);
        if (datess < 60) {
            //  return  datess+"秒前"
            return "刚刚"
        }
        var datemm = Math.ceil(datess / 60);
        if (datemm < 60) {
            return datemm + "分钟前"
        }
        var dateHH = Math.ceil(datemm / 60);
        if (dateHH < 24) {
            return dateHH + "小时前"
        }
        var dateDD = Math.ceil(dateHH / 24);

        if (dateDD == 1) {
            return "昨前" + timestr
        } else if (dateDD == 2) {
            return "前天" + timestr
        } else if (dateDD <= 5) {
            return dateDD + "天前" + timestr
        } else {
            return datestr;
        }


        /* var dateMM=Math.ceil(dateDD/30);
         if(dateMM<12){
         return  dateMM+"月前"
         }
         var dateYY=Math.ceil(dateMM/12);

         return  dateYY+"年前"*/

    }

    getLabelColor(text) {
        if (!rundata.labels) {
            return colors.text_not_impor;
        }
        for (var i = 0; i < rundata.labels.length; i++) {
            if (rundata.labels[i].text == text) {
                return rundata.labels[i].color;
            }
        }
        return colors.text_not_impor;

    }

    getLabelsView(strlabels) {
        if (!strlabels) {
            return <View></View>
        }
        var labels = strlabels.split(";");
        var mycontext = this;
        const labelsViews = labels.map(
            (items, i)=> {
                return (<View
                    key={i}
                    style={{
                        opacity: 0.6,
                        borderRadius: 2,
                        backgroundColor: mycontext.getLabelColor(labels[i]),
                        marginLeft: 5,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: fonts.low - 3.5,
                    }}>
                        {labels[i]}
                    </Text>
                </View>)


            });
        return labelsViews;
    }

    getHotComment(comment) {
        if (!comment) {
            return <View></View>
        }
        return (
            <View style={{
                backgroundColor: colors.pagebg, width: width - 20,
                marginBottom: 15, marginLeft: 10
            }}>
                <Text style={{
                    color: colors.main,
                    fontSize: fonts.low,

                }}>
                    热门评论
                </Text>
                <Text style={{fontSize: fonts.low, color: colors.slightmain, paddingHorizontal: 10}}> {comment.nickname}<Text
                    style={{
                        fontSize: fonts.low,
                        color: colors.text_normal,
                        marginRight: 10


                    }} onPress={()=> {

                }}>
                    {comment.ctext}
                </Text>
                </Text>

                <View style={{
                    backgroundColor: colors.pagebg, flexDirection: 'row', width: width - 20,
                    marginTop: 5, alignItems: 'center'
                }}>


                    <IconWithText textsize={fonts.low - 2} iconsize={15} onlypressone={true}
                                  iconname={"ios-thumbs-up"} text={comment.upcount+""}
                                  margin={10} onPress={()=> {


                    }}/>

                    <IconWithText textsize={fonts.low - 2} iconsize={15}
                                  selectedcolor={colors.text_not_impor}
                                  iconname={"ios-chatbubbles"} text={comment.commentcount+""} margin={20}/>


                </View>


            </View>




        )


    }

    clone(myObj) {
        if (typeof(myObj) != 'object') return myObj;
        if (myObj == null) return myObj;
        var myNewObj = new Object();

        for (var i in myObj)
            myNewObj[i] = this.clone(myObj[i]);
        return myNewObj;
    }

    upOrDownAction(id, isup) {
        var paramsmap = CommonUtil.getParamMap();
        paramsmap.put("cid", id);
        var url = ""
        if (isup) {
            url = urls.domain + urls.upContent;
        } else {
            url = urls.domain + urls.downContent;
        }

        LoadDataUtil.loadDataWithNoCache(url, paramsmap, function (result) {


        })
    }


    render() {
        return (
            <TouchableWithoutFeedback
                key={this.props.rowData.id}
                style={{overflow: 'hidden'}}
                activeOpacity={0.7}
                onPress={()=> {

                }

                }>
                <View>

                    <View
                        ref={(ref) => {
                            if (ref && !this.view) {
                                this.view = ref
                            }
                        }}
                        style={{
                            width: width - 20, marginHorizontal: 10,
                            backgroundColor: colors.pagebg,
                        }}>
                        <View style={{
                            backgroundColor: colors.pagebg, flexDirection: 'row', width: width - 20,
                            marginVertical: 15, alignItems: 'center'
                        }}>
                            <Image style={{width: 30, height: 30, borderRadius: 15}}
                                   source={this.props.rowID % 2 == 0 ? require("../imgs/personicon.png") : require("../imgs/personicon2.png")}></Image>

                            <View>

                                <Text style={{
                                    fontSize: fonts.small, color: colors.text_not_impor, marginLeft: 8,
                                    marginRight: 5, paddingRight: 5
                                }}>
                                    {this.props.rowData.nickname}
                                    <Text style={{
                                        color: "#ffd600",

                                        fontSize: fonts.low,

                                    }}>
                                        {"LV." + this.props.rowData.level}
                                    </Text>
                                </Text>
                                <Text style={{
                                    color: colors.text_not_impor,
                                    marginLeft: 8,
                                    fontSize: fonts.low - 1,

                                }}>
                                    {this.getTimeDesc(this.props.rowData.contenttime)}
                                </Text>

                            </View>


                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end',}}>
                                <IconWithText iconsize={20} iconname={"ios-share-alt"}
                                              selectedcolor={colors.text_not_impor} text={this.props.rowData.sharecount+""}
                                              margin={0}/>

                                <View style={{width: 15}}></View>
                                {this.getLabelsView(this.props.rowData.clabels)}


                            </View>


                        </View>
                        <Text style={{
                            color: colors.text_important,
                            fontSize: fonts.normal,
                            marginBottom: 10
                        }}>
                            {this.props.rowData.id+this.props.rowData.ctext}
                        </Text>


                        {/* <Video source={{uri: "http://pgccdn.v.baidu.com/1048066885_2874368064_20170406165153.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-04-06T08%3A51%3A57Z%2F-1%2F%2F2be2ec79dc29385dd8ea2c99ef312848af04160a25a4821af9d3ad382bb4b76a&responseCacheControl=max-age%3D8640000&responseExpires=Sat%2C+15+Jul+2017+16%3A51%3A57+GMT&xcode=4cfc2506d3f8664096fa7c19df2eef49f121b14805cec943&time=1493562838&_=1493477363052"}} // Can be a URL or a local file.
                         rate={1.0}                   // 0 is paused, 1 is normal.
                         volume={1.0}                 // 0 is muted, 1 is normal.
                         muted={false}                // Mutes the audio entirely.
                         paused={true}               // Pauses playback entirely.
                         resizeMode="cover"           // Fill the whole screen at aspect ratio.
                         repeat={false}                // Repeat forever.
                         style={{width: width-20, height:height/3}} />*/}


                        {/*
                         <WebViewAutoHeight source={{html:html}} />
                         */}
                        {this.getMediaListView(this.getSplitArray(this.props.rowData.cmedias))}

                        <View style={{
                            backgroundColor: colors.pagebg, flexDirection: 'row', width: width - 20,
                            marginTop: 10, marginBottom: 15, alignItems: 'center'
                        }}>
                            <IconWithText iconsize={20} onlypressone={true} iconname={"ios-thumbs-up"}
                                          text={this.props.rowData.upcount+""}
                                          margin={10} onMyPress={()=> {
                                try {
                                    this.upOrDownAction(this.props.rowData.id, true)
                                } catch (e) {

                                }

                            }}/>
                            <IconWithText iconsize={20} onlypressone={true} iconname={"ios-thumbs-down"}
                                          text={this.props.rowData.downcount+""}
                                          margin={20} onMyPress={()=> {
                                try {
                                    this.upOrDownAction(this.props.rowData.id, false)
                                } catch (e) {

                                }
                            }}/>
                            <IconWithText  iconsize={20} selectedcolor={colors.text_not_impor} iconname={"ios-book"}
                                          text={this.props.rowData.readcount+""} margin={20} onPress={()=> {

                            }}/>
                            <IconWithText iconsize={20} selectedcolor={colors.text_not_impor}
                                          iconname={"ios-chatbubbles"} text={this.props.rowData.commentcount+""}
                                          margin={20}/>


                        </View>


                        {this.getHotComment(this.props.rowData.hotcomment)}

                    </View>
                    <View style={{width: width, height: 10, backgroundColor: colors.white}}></View>
                </View>

            </TouchableWithoutFeedback>

        )


    }

}
module.exports = HomeRowView;
