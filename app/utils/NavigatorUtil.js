
import {
 DeviceEventEmitter
} from 'react-native';

export function navigator(component,name,params,back,jumptype){
  var obj=new Object();
  obj.component=component;
  obj.name=name;
  obj.params=params;
  obj.back=back;
  if(!jumptype){
    obj.jumptype="push"
  }else{
    obj.jumptype=jumptype;
  }
  DeviceEventEmitter.emit('navigator',obj);
};

