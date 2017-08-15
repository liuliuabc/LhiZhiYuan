/**
 * Created by yanghong.liu on 2017/3/3.
 */

export function getbject(){
         var obj=new Object();
        obj.title="",
            obj.content="",
        obj.buttonstyle="",
        obj.confirmtext="",
        obj.onconfirm=null,
        obj.canceltext=null,
        obj. oncancel=null,
        obj.values=[],
        obj.size=0,
        obj.maxselect=0,
        obj.borderradius=0;
         return obj;

}
