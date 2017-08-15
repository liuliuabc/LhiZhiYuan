/**
 * Created by yanghong.liu on 2017/4/28.
 */
/**
 * Created by yanghong.liu on 2016/11/14.
 */
export var  rundata={
    token:"",
    uid:"",
    labels:[]
}
//["励志","学习","感恩","催泪","孝顺","减肥","长高","成长","爱情","友情","运动","健康"]
export const colors={
    text_important:"#333333",
    text_normal:"#666666",
    text_not_impor:"#999999",
    text_form:"#dadada",
    text_normal:"#666666",
    divider:"#e6e6e6",
    pagebg:"#f5f5f5",
    white:"white",
    slightmain:"#80cbc4",
    main:'#00796b',
    darkmain:'#00695c',
    error:"#bf360c",
    hot:'#d84315',
    level4:"#dd2c00",
    level3:"#ff6d00",
    level2:"#ffab00",
    level1:"#ffd600",
    /*labelcolors:{//后面应该放服务器
        "励志":"#f3f21e",
        "学习":"#2435ee",
        "感恩":"#39ef12",
        "感动":"#90de23",
        "孝顺":"#3367ed",
        "减肥":"#2f2f36",
        "长高":"#377892",
        "成长":"#36dea4",
        "爱情":"#aa6722",
        "友情":"#335900",
        "运动":"#bbaa32",
        "健康":"#2214ee",
        "其他":"#75a4ee",
    }*/

}
export  const fonts={
    big:17.5,
    normal:15.5,
    small:13.5,
    low:12,
}
export  const sizes={
    big:30,
    normal:25,
    small:20,
    tagtime: 2000000000000
}
export  var urls={
    middledomain:'http://192.168.9.117:8080/LiZhiYuanProject/BaseAction/domain',
    domain:'',
    login:'/UserAction/login',
    register:'/UserAction/register',
    resetpassword:'/UserAction/updatePassword',
    validatenickname:'/BaseAction/validateNickName',
    getLabels:"/ContentAction/getLabels",
    addContent:"/ContentAction/addContent",
    deleteContent:"/ContentAction/deleteContent",
    getContent:"/ContentAction/getContent",
    upContent:"/ContentAction/upContent",
    downContent:"/ContentAction/downContent",



}
