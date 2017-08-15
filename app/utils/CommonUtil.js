import {
    InteractionManager,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import * as LoadDataUtil from '../utils/LoadDataUtil';
var MyParamMap=require("../bean/MyParamMap")

import   { urls, rundata} from '../common/commondata';
export  function   setDoamin(){
  LoadDataUtil.loadCommonData(urls.middledomain, '', function (result) {
    if (result && result.domain){
      urls.domain=result.domain;
      AsyncStorage.setItem('domain', result.domain)
      getLabels();
    }
  });

}
export  function   getParamMap(){
  return MyParamMap.getMap();
}
function getLabels(){
  LoadDataUtil.loadDataWithNoCache(urls.domain+urls.getLabels,"",function(result){
    if(result&&result.length>0){
      rundata.labels=result;
      AsyncStorage.setItem('labels', JSON.stringify(result))
    }
  });

}

