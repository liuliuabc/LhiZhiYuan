'use strict';

import React from 'react';
import {
    Dimensions, ActivityIndicator,
    Image,
    ListView, TextInput, PropTypes,
    View, WebView, TouchableOpacity,
    Text, DeviceEventEmitter, TouchableHighlight, StyleSheet
} from 'react-native';
import   {colors, fonts, urls, sizes,rundata} from '../common/commondata';
import * as NavigatorUtil from "../utils/NavigatorUtil"
import Main from "../pages/Main"
import TopTitle from '../component/TopTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import * as LoadDataUtil from '../utils/LoadDataUtil';
import MyProgressView from '../component/MyProgressView';
import {toastShort} from '../utils/ToastUtil';
import * as CommonUtil from "../utils/CommonUtil"

var {height, width} = Dimensions.get('window');

import MyNativeMethod from '../component/MyNativeMethod';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
class AddContent extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            mediadata:[],//文件真实路径，用于上传
            mediaextradate:[],//文件名字，poster位置等，仅用于显示
            labels:rundata.labels,
            selectlabels:[],
            text:"",
        });
        this.mediaChooserGet=this.mediaChooserGet.bind(this);



    }

    componentDidMount(){
      /*  var mycontext=this;
      if((!rundata.labels)||rundata.labels.length==0){
          LoadDataUtil.loadDataWithCache(urls.domain+urls.getLabels,"",function(result){
              if(result){
                  rundata.labels=result;
                  mycontext.setState({ labels:result})
              }
          });
      }
*/

    }
    getSelectLabelStr(){
        var str="";
        for(var i=0;i<this.state.selectlabels.length;i++){
            if(this.state.selectlabels[i].selected){
                str+=this.state.selectlabels[i].text+";";
            }

        }
        if(str.indexOf(";")>-1){
            str=str.substring(0,str.lastIndexOf(";"));
        }
        return str;

    }
    uploadTextContent(){



        if(!this.state.text){
            toastShort("请输入内容后提交")
            return;
        }
        if(this.state.selectlabels.length<=0){
            toastShort("请至少选择一个标签")
            return;
        }



        var paramsmap=CommonUtil.getParamMap();
        paramsmap.put('ctype',this.props.type);
        paramsmap.put('ctext',encodeURI(encodeURI(this.state.text)));

        paramsmap.put('clabels',encodeURI(encodeURI(this.getSelectLabelStr())));

        LoadDataUtil.loadDataWithNoCache(urls.domain+urls.addContent,paramsmap,function (result) {
            alert(JSON.stringify(result))

        })





    }


    uploadMediaContent(){



      //  this.refs.myprogressview.show('图片上传中...')
        if(this.state.mediadata.length<this.props.mediamincount){
            toastShort("至少选择"+this.props.mediamincount+"个文件");
            return;
        }
        if(this.state.mediadata.length>this.props.mediamaxcount){
            toastShort("至多选择"+this.props.mediamincount+"个文件");
            return;
        }
        if(this.state.selectlabels.length<=0){
            toastShort("请至少选择一个标签")
            return;
        }

        var progress=0.00;
        var mycontext=this;
        var paramsmap=CommonUtil.getParamMap();
      //  var clabels=this.getSelectLabelStr();

        paramsmap.put('ctype',this.props.type);
        paramsmap.put('uid',rundata.uid);
        paramsmap.put('token',rundata.token);
        paramsmap.put('ctext',encodeURI(encodeURI(this.state.text)));
       // paramsmap.put('jjj',"abcjdd");
        paramsmap.put('clabels',encodeURI(encodeURI(this.getSelectLabelStr())));
        var fd = new FormData();
      /*  fd.append('ctype',this.props.type);
        fd.append('uid',rundata.uid);
        fd.append('token',rundata.token);
        fd.append('ctext',this.state.text);
        fd.append('clabels',this.getSelectLabelStr());*/


        for(var i=0;i<this.state.mediadata.length;i++){
            var uri=this.state.mediadata[i];
            var filname=uri.substring(uri.lastIndexOf("/")+1);
            let file = {uri: uri, type: 'multipart/form-data;charset=UTF-8', name: filname};   //这里的key(uri和type和name)不能改变,
            fd.append("file"+i, file);   //这里的files就是后台需要的key
        }


        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e){
            if (xhr.readyState == 4) {// 4 = "loaded"
                if (xhr.status == 200) {// 200 = OK
                    alert("xhr.status == 200")
                   // completefun(true)
                  //  mycontext.refs.myprogressview.hidden();
                   // var {navigator}=mycontext.props;
                    //navigator.pop();
                    alert( xhr.responseText);
                    // alert("成功");
                }else{
                  //  completefun(false)
                   // mycontext.refs.myprogressview.hidden();
                    toastShort("文件上传失败,请检查您的网络")
                    // alert("Problem retrieving XML data");
                }
            }
        };
        //进度条
        xhr.upload.addEventListener("progress", function (evt) {
              alert(evt.loaded/evt.total);
          //  mycontext.refs.myprogressview.setProgress(evt.loaded/evt.total);

        }, false);
        //下载
        xhr.addEventListener("load", function (){//上传完成
            alert('load')
        }, false);
        //错误信息
        xhr.addEventListener("error", function () {
             alert('error');
        }, false);
        //取消，此功能没有做
        xhr.addEventListener("abort", function (){
             alert('abort');
        }, false);
        //上传
       var params= paramsmap.getStringParams();

        xhr.open("POST",urls.domain+urls.addContent+"?"+params,true);

        xhr.setRequestHeader("Content-type","multipart/form-data;charset=UTF-8");//这行代码很关键，用来把字符串类型的参数序列化成Form Data



       // xhr.send(paramsmap.getStringParams());

        //发送

       // xhr.send("")
        xhr.send(fd);
       // xhr.send(paramsmap.getStringParams);

    }





    mediaChooserGet(datastr){
        //console.log(datastr)
        try {
            if (datastr){
                var data = datastr.split(";");
                this.setState({
                    mediadata: data.concat(this.state.mediadata),
                });

            }
        } catch (e){
           // alert(e)
        }


    }



    getAddButton(rowdata, selectionId, rowID) {

     //   var mycontext=this;
        if (this.props.type == "shipin") {
            return (<TouchableOpacity style={{
                width: 60, height: 60, margin:10, backgroundColor: colors.text_form, alignItems: 'center',
                justifyContent: 'center', borderRadius: 2
            }} onPress={()=> {
                MyNativeMethod.startMediaChooser("选择视频", "video", false, this.props.mediamaxcount-this.state.mediadata.length, this.props.mediamaxsize,this.mediaChooserGet);


            }}>
                <Icon
                    name={"ios-videocam-outline"} //
                    size={40}
                    color={colors.text_normal}/>

            </TouchableOpacity>)

        } else if (this.props.type == "yinyue") {
            return (<TouchableOpacity style={{margin:10,
                width: 60, height: 60, backgroundColor: colors.text_form, alignItems: 'center',
                justifyContent: 'center', borderRadius: 2
            }} onPress={()=> {
               // MyNativeMethod.startMediaChooser("选择音乐", "video", false, 1, 30);


            }}>
                <Icon
                    name={"ios-musical-notes-outline"} //
                    size={40}
                    color={colors.text_normal}/>

            </TouchableOpacity>)

        } else if (this.props.type == "tupian") {
            return (<TouchableOpacity style={{margin:10,
                width: 60, height: 60,  backgroundColor: colors.text_form, alignItems: 'center',
                justifyContent: 'center', borderRadius: 2
            }} onPress={()=> {
                MyNativeMethod.startMediaChooser("选择图片", "image", false, this.props.mediamaxcount-this.state.mediadata.length, this.props.mediamaxsize,this.mediaChooserGet);

            }}>
                <Icon
                    name={"ios-images-outline"} //
                    size={40}
                    color={colors.text_normal}/>

            </TouchableOpacity>)


        } else {
            return <View></View>
        }

    }

    getMediaRowViewByType(rowdata, selectionId, rowID){
        if (this.props.type == "shipin"){
            return (<Image source={{uri: rowdata}}
                           style={{
                               width: 60,
                               height: 60,
                               margin: 10,
                               borderRadius: 2,
                               alignItems: 'center',
                               justifyContent: 'center'
                           }}>
                <Icon
                    onPress={()=> {
                        //play

                    }}
                    name={"md-play"} //
                    size={40}
                    color={colors.white}/>

            </Image>)

        } else if (this.props.type == "yinyue") {
            return (<View
                style={{
                    width: width,
                    height: 60,
                    margin: 10,
                    borderRadius: 2,
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                <Icon
                    onPress={()=> {
                        //play

                    }}
                    name={"md-musical-notes"} //
                    size={40}
                    color={colors.main}/>
                <Text style={{
                    color: colors.text_important,
                    fontSize: fonts.normal,
                    marginHorizontal: 10
                }}>{rowdate}</Text>


            </View>)

        } else if (this.props.type == "tupian"){
            return (<Image source={{uri: rowdata}}
                           style={{
                               width: 60,
                               height: 60,
                               margin: 10,
                               borderRadius: 2,
                           }}>

            </Image>)


        } else {
            return (<Image source={{uri: rowdata}}
                           style={{
                               width: 60,
                               height: 60,
                               margin: 10,
                               borderRadius: 2,
                           }}>

            </Image>)
        }


    }


    getMediaRowView(rowdata, selectionId, rowID) {
        if (rowdata == 'add') {
            if (this.state.mediadata.length >= this.props.mediamaxcount) {
                return <View></View>
            }
            return this.getAddButton(rowdata, selectionId, rowID);
        } else {
            return this.getMediaRowViewByType(rowdata, selectionId, rowID);
        }

    }

    getMediaListView(mediadata) {
        var data = mediadata.concat(['add'])
        return (
            <ListView
                showsVerticalScrollIndicator={false}
                initialListSize={12}
                removeClippedSubviews={false}
                contentContainerStyle={{
                    paddingHorizontal:20,
                    flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center',
                    backgroundColor:colors.white
                }}
                enableEmptySections={true}
                dataSource={ds.cloneWithRows(data)}
                renderRow={(rowdata, selectionId, rowID)=>this.getMediaRowView(rowdata, selectionId, rowID)}
            >
            </ListView>
        )


    }


    render() {
        var selectcount=0;
        var mycontext=this;
        const labelsViews = this.state.selectlabels.map(
            (items, i)=>{
                 if(items.selected){
                     selectcount++;
                     return ( <Text
                         key={i}
                         style={{
                         color: "white" ,
                         fontSize: fonts.low,
                         opacity: 0.6,
                         borderRadius: 2,
                         backgroundColor: items.color,
                         marginLeft: 5,
                         paddingHorizontal: 10,
                         paddingVertical: 4,
                         alignItems: "center",
                         justifyContent: "center",
                         textAlign:'center',
                         textAlignVertical:"center"
                     }}>
                         {items.text}
                     </Text>)
                 }else{
                     return;
                 }

            });

        return (
            <View style={{flex: 1, backgroundColor: colors.pagebg}}>
                <TopTitle
                    leftview={<Image style={{width: 9, height: 18}}
                                     source={require('../imgs/icon_back.png')}></Image>}
                    lrwidth={50}
                    textalign={'center'}
                    title={this.props.title}

                    rightview={<Text style={{color: colors.white, fontSize: fonts.normal, paddingRight: 10}}>发布</Text>}
                    leftfun={()=> {


                    }}
                    rightfun={()=> {
                        var type=this.props.type;
                        if(type=="shipin"||type=="tupian"||type=="yinyue"){
                            mycontext.uploadMediaContent();
                        }else{
                            mycontext.uploadTextContent();
                        }




                       // NavigatorUtil.navigator(Register, 'Register', {}, false);
                    }}

                />
                <View style={{height:height/3, width: width, backgroundColor: colors.white}}>
                    <TextInput
                        ref={"input1"}
                        placeholderTextColor={colors.text_form}
                        placeholder={"这一刻您想说点什么..."}
                        onChangeText={(text) => {
                            this.setState({text:text});
                        }}
                        maxLength={500}
                        value={this.state.text}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        multiline={true}
                        style={{
                            flex: 1,
                            width: width,
                            padding: 20,
                            textAlign: 'left',
                            textAlignVertical: 'top',
                            fontSize: fonts.normal,
                            color: colors.text_normal,

                        }}

                        underlineColorAndroid={'transparent'}

                    />

                </View>
                {this.getMediaListView(this.state.mediadata)}


                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                    var alertobj = new Object();
                    alertobj.title = `请选择内容标签`;
                    alertobj.content = "最多可选择三个标签";
                    alertobj.confirmtext = "  确认";
                    alertobj.canceltext = "取消";
                    alertobj.values=this.state.labels.concat();
                    alertobj.oncancel = function () {
                        //mycontext.oncancel()
                        // alert('cancel')
                    };
                    alertobj.maxselect=3;
                    alertobj.size=15,
                        alertobj.borderradius=1,
                        alertobj.onconfirm = function (values) {
                        mycontext.setState({selectlabels:values});
                            // alert(JSON.stringify(values))
                            //mycontext.confirm(url)
                        };
                    DeviceEventEmitter.emit('showselectdialog', alertobj);



                }}>
                <View
                    style={{
                    height: 50,
                    marginTop:15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: width,
                    backgroundColor: colors.white
                }}>
                    <Text style={{color: colors.text_normal, paddingLeft: 20, fontSize: fonts.normal, marginRight:50}}>{selectcount==0?"点击选择标签":"已选择标签"}</Text>

                    {labelsViews}


                </View></TouchableOpacity>
                <MyProgressView ref={(ref) => {
                    if (ref && !this.myprogressview){
                        this.myprogressview = ref
                    }
                }}
                />


            </View>



        );
    }
}


export default AddContent;
