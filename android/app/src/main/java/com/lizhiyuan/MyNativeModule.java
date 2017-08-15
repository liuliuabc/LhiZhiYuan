package com.lizhiyuan;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.SystemClock;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.learnncode.mediachooser.MediaChooser;
import com.learnncode.mediachooser.Utilities.MediaChooserConstants;
import com.learnncode.mediachooser.activity.HomeScreenMediaChooser;

import org.json.JSONArray;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by yanghong.liu on 2016/11/17.
 */

public class MyNativeModule extends ReactContextBaseJavaModule {
    Callback successCallback;
    ReactApplicationContext reactContext;
    public MyNativeModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext=reactContext;



    }

    @Override
    public String getName() {
        return "MyNativeMethod";
    }


    @ReactMethod
    public void getAppVersion() throws PackageManager.NameNotFoundException {

            // 获取packagemanager的实例
            PackageManager packageManager = reactContext.getPackageManager();
            // getPackageName()是你当前类的包名，0代表是获取版本信息
            PackageInfo packInfo = packageManager.getPackageInfo(reactContext.getPackageName(),0);
            int version = packInfo.versionCode;
            sendEvent("getversion",version+"");

    }


    public  void sendEvent(
                           String eventName,
                           String extra) {

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, extra);
        System.out.println("sendEvent-------------------");


    }


    @ReactMethod
    public void downloadApk(final String url){
        new Thread(){
            @Override
            public void run(){
               downLoadFile(url);
            }
        }.start();

    }




    //下载apk程序代码
    protected void downLoadFile(String httpUrl) {
        // TODO Auto-generated method stub
        final String fileName = "updata.apk";
        File tmpFile = new File("/sdcard/update");
        if (!tmpFile.exists()){
            tmpFile.mkdir();
        }
        final File file = new File("/sdcard/update/" + fileName);
            try {
                URL url = new URL(httpUrl);
                HttpURLConnection conn = (HttpURLConnection) url
                        .openConnection();
                InputStream is = conn.getInputStream();
                FileOutputStream fos = new FileOutputStream(file);
                byte[] buf = new byte[256];
                conn.connect();
                double count = 0;
                if (conn.getResponseCode() >= 400){
                    /*Toast.makeText(reactContext, "连接超时", Toast.LENGTH_SHORT)
                            .show();*/
                    sendEvent("download",0+"");
                } else {
                    while (count <= 100) {
                        if (is != null){
                            int numRead = is.read(buf);
                            if (numRead <= 0){
                                break;
                            }else {
                                fos.write(buf, 0, numRead);
                            }
                        } else {
                            break;
                        }

                    }
                }

                conn.disconnect();
                fos.close();
                is.close();
            } catch (Exception e){
                // TODO Auto-generated catch block
                sendEvent("download",0+"");

                e.printStackTrace();
            }


        sendEvent("download",1+"");
        openFile(file);

    }
    //打开APK程序代码

    private void openFile(File file){
        // TODO Auto-generated method stub
        Log.e("OpenFile", file.getName());
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(android.content.Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(file),
                "application/vnd.android.package-archive");
        reactContext.startActivity(intent);
    }

    @ReactMethod
    public void setToSP(String name,String value){
        SharedPreferences userdata = reactContext.getSharedPreferences("userdata", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor=userdata.edit();
        editor.putString(name,value);
        editor.commit();

    }
    @ReactMethod
    public void getFromSP(String key,Callback
            mysuccessCallback){
        SharedPreferences userdata = reactContext.getSharedPreferences("userdata", Context.MODE_PRIVATE);
        String value=  userdata.getString(key,"");
        mysuccessCallback.invoke(value);

    }

    BroadcastReceiver videoBroadcastReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {

           ArrayList<String> list= intent.getStringArrayListExtra("list");
          //  ArrayList<String> posterlist= intent.getStringArrayListExtra("posterlist");
            String listurl="";
          //  String posterlisturl="";
            for(int i=0;i<list.size();i++){
               listurl+="file://"+list.get(i);
               if(i!=list.size()-1){
                   listurl+=";";
               }

            }

          /*  for(int i=0;i<posterlist.size();i++){
                posterlisturl+=posterlist.get(i);
                if(i!=posterlist.size()-1){
                    posterlisturl+=";";
                }

            }*/
            //sendEvent("mediachooser",listurl);
            if(successCallback!=null){
                successCallback.invoke(listurl);
                successCallback=null;
            }
            System.out.println(listurl);

            unRegisterResultReceiver();
           // setAdapter(intent.getStringArrayListExtra("list"));
        }
    };


    BroadcastReceiver imageBroadcastReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            ArrayList<String> list= intent.getStringArrayListExtra("list");
            String listurl="";
            for(int i=0;i<list.size();i++){
                listurl+="file://"+list.get(i);
                if(i!=list.size()-1){
                    listurl+=";";
                }

            }
            if(successCallback!=null){
                successCallback.invoke(listurl);
                successCallback=null;
            }

            System.out.println(listurl);

            //sendEvent("mediachooser",listurl);
            unRegisterResultReceiver();
            //setAdapter(intent.getStringArrayListExtra("list"));
        }
    };
    public void registerResultReceiver(){
        IntentFilter videoIntentFilter = new IntentFilter(MediaChooser.VIDEO_SELECTED_ACTION_FROM_MEDIA_CHOOSER);
        reactContext.registerReceiver(videoBroadcastReceiver, videoIntentFilter);
        IntentFilter imageIntentFilter = new IntentFilter(MediaChooser.IMAGE_SELECTED_ACTION_FROM_MEDIA_CHOOSER);
        reactContext.registerReceiver(imageBroadcastReceiver, imageIntentFilter);
    }
    public void unRegisterResultReceiver(){
       try{
           reactContext.unregisterReceiver(videoBroadcastReceiver);
           reactContext.unregisterReceiver(imageBroadcastReceiver);

       }catch (Exception e){}
    }

    @ReactMethod
    public void getMusicList(Callback
            mysuccessCallback){



        List<MusicLoader.Song> songs = MusicLoader.getMusicData(reactContext);
        Gson gson=new Gson();
        Result result=new Result();
        result.data=songs;
        String s = gson.toJson(result);
        mysuccessCallback.invoke(s);
        System.out.println(s);



    }
    class Result{
        public  Object  data;
        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }




    @ReactMethod
    public void startMediaChooser(String title,String type,boolean folders,int limit,int size,Callback
            mysuccessCallback){
         successCallback=mysuccessCallback;
         unRegisterResultReceiver();
         registerResultReceiver();
        if(type.equals("image")){
            MediaChooser.showOnlyImageTab();
            MediaChooser.setImageSize(size);
        }else if(type.equals("video")){
            MediaChooser.setVideoSize(size);
            MediaChooser.showOnlyVideoTab();
        }else{
            MediaChooser.setImageSize(size);
            MediaChooser.setVideoSize(size);

            MediaChooser.showImageVideoTab(); //By default both tabs are visible.

        }
        if(title!=null&&title.length()>0){
            MediaChooser.setTitle(title);
        }else{
            MediaChooser.setTitle("选择文件");

        }



         if(limit>0){
             MediaChooser.setSelectionLimit(limit);
         }else{
             if(type.equals("image")){
                 MediaChooser.setSelectionLimit(10);
             }else{
                 MediaChooser.setSelectionLimit(1);
             }

         }

        MediaChooserConstants.SELECTED_MEDIA_COUNT=0;


       if(folders){
           HomeScreenMediaChooser.startMediaChooser(reactContext, true);

       }else {
           HomeScreenMediaChooser.startMediaChooser(reactContext, false);//files

       }

    }





}