import {
    InteractionManager,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {toastShort} from '../utils/ToastUtil';
import   {rundata,urls,sizes} from '../common/commondata';
import * as CommonUtil from "../utils/CommonUtil"
import * as EnAndDesc from "../utils/safe/EnAndDesc"
import * as md5 from "../utils/safe/md5"
function loadDataWithCache_(myurl, parammap, myfun){
     var newdataget = false;
    var params=getParams(parammap);
     AsyncStorage.getItem(myurl+params, function(err, result){
       if(result&&!newdataget){
        //   myfun(JSON.parse(result))
       }
       })
        //  alert(extra);
        fetch(myurl, {
                method: 'POST',
                headers: {
                    'Charset': 'utf-8',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${rundata.token}`,
                },
                body: params
            }
        ).then(response => {
            return response.json();
        }).then((result)=> {
            if (result.success){
                newdataget = true;
                myfun(result.data);
                AsyncStorage.setItem(myurl+params, JSON.stringify(result.data), function (errs) {
                });
            } else {
               // alert(result.msg+myurl+params)
                myfun(null);
            }
        }).catch((error) => {
            toastShort('网络发生错误,请检查您的网络连接!'+error+"url="+myurl)
            myfun(null);
        });

}

function  getParams(parammap){
    var myparammap;
    if(!parammap){
        myparammap=CommonUtil.getParamMap();
    }else{
        myparammap=parammap;
    }
    var timemill=sizes.tagtime-(new Date().getTime());
    var timess=Math.floor(timemill/1314);
    myparammap.put("token",rundata.token);
    myparammap.put("uid",rundata.uid);
    myparammap.put("key",timess);
   // getRandomToken(rundata.token);
   // alert(myparammap.getStringParams())
    return myparammap.getStringParams();

}
export  function getRandomToken(token){
    var keys=["~","!","@","#","$","%","^","&","*","(",")","=","+"];
    var randomtoken="";
    for(i=0;i<9;i++){




    }


}


export  function getEncrptToken(token,time){
    var encrpttoken=EnAndDesc.strEnc(token,rundata.uid,rundata.domain,time);
    return encrpttoken;
}




function  getCommonParams(parammap){
    if(!parammap){
        return "";
    }
    return parammap.getStringParams();

}


function loadCommonData_(myurl, parammap,  myfun){
    fetch(myurl,{
            method: 'POST',
            headers: {
                'Charset': 'utf-8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': '',
            },
            body: getCommonParams(parammap)
        }
    ).then(response => {

        return response.json();
    }).then((result)=> {
         // alert(JSON.stringify(result));
        if (result.success){
            myfun(result.data);
        } else {
            toastShort(result.msg)
            myfun(null);
        }
    }).catch((error) => {
        toastShort('网络发生错误,请检查您的网络连接!'+error+"url="+myurl)
        myfun(null);

    });


}

 function loadDataWithNoCache_(myurl, parammap, myfun) {
    //  NativeModules.MyToast.show("自定义封装成功", NativeModules.MyToast.LONG);
            fetch(myurl, {
                    method: 'POST',
                    headers: {
                        'Charset': 'utf-8',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${rundata.token}`,
                    },
                    body: getParams(parammap)
                }
            ).then(response => {
                return response.json();
            }).then((result)=> {
               // alert(JSON.stringify(result))
                if (result.success){
                    myfun(result.data);
                } else {
                    toastShort(result.msg)
                    myfun(null);
                }
            }).catch((error) =>{
                toastShort('网络发生错误,请检查您的网络连接!'+error+"url="+myurl)
                myfun(null);
            });





}


export function loadDataWithCache(myurl, parammap, myfun, norunafter) {
    if (norunafter) {
        loadDataWithCache_(myurl, parammap, myfun)
    } else {
        InteractionManager.runAfterInteractions(() => {
            loadDataWithCache_(myurl, parammap, myfun)
        })

    }


}


export function loadCommonData(myurl, parammap, myfun, norunafter) {
    if (norunafter){
        loadCommonData_(myurl, parammap, myfun)
    } else {
        InteractionManager.runAfterInteractions(() => {
            loadCommonData_(myurl, parammap,  myfun)
        })

    }

}


export function loadDataWithNoCache(myurl, parammap, myfun, norunafter) {
    if (norunafter) {
        loadDataWithNoCache_(myurl, parammap, myfun)
    } else {
        InteractionManager.runAfterInteractions(() => {
            loadDataWithNoCache_(myurl, parammap, myfun)
        })

    }
}




