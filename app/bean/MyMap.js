/**
 * Created by yanghong.liu on 2017/3/3.
 */
export function getMap(){
     var obj=new Object();
    obj.elements =new Array();
    //获取MAP元素个数
    obj.size = function() {
        return obj.elements.length;
    };

    //判断MAP是否为空
    obj.isEmpty = function() {
        return (obj.elements.length < 1);
    };

    //删除MAP所有元素
    obj.clear = function() {
        obj.elements = new Array();
    };

    //向MAP中增加元素（key, value)
    obj.put = function(_key, _value) {
        obj.elements.push( {
            key : _key,
            value : _value
        });
    };

    //删除指定KEY的元素，成功返回True，失败返回False
    obj.removeByKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].key == _key) {
                    obj.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //删除指定VALUE的元素，成功返回True，失败返回False
    obj.removeByValue = function(_value) {//removeByValueAndKey
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].value == _value) {
                    obj.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //删除指定VALUE的元素，成功返回True，失败返回False
    obj.removeByValueAndKey = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].value == _value && obj.elements[i].key == _key) {
                    obj.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取指定KEY的元素值VALUE，失败返回NULL
    obj.get = function(_key) {
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].key == _key) {
                    return obj.elements[i].value;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    };

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    obj.element = function(_index) {
        if (_index < 0 || _index >= obj.elements.length) {
            return null;
        }
        return obj.elements[_index];
    };

    //判断MAP中是否含有指定KEY的元素
    obj.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    obj.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    obj.containsObj = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < obj.elements.length; i++) {
                if (obj.elements[i].value == _value && obj.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    obj.values = function() {
        var arr = new Array();
        for (i = 0; i < obj.elements.length; i++) {
            arr.push(obj.elements[i].value);
        }
        return arr;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    obj.valuesByKey = function(_key) {
        var arr = new Array();
        for (i = 0; i < obj.elements.length; i++) {
            if (obj.elements[i].key == _key) {
                arr.push(obj.elements[i].value);
            }
        }
        return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    obj.keys = function() {
        var arr = new Array();
        for (i = 0; i < obj.elements.length; i++) {
            arr.push(obj.elements[i].key);
        }
        return arr;
    };

    //获取key通过value
    obj.keysByValue = function(_value) {
        var arr = new Array();
        for (i = 0; i < obj.elements.length; i++) {
            if(_value == obj.elements[i].value){
                arr.push(obj.elements[i].key);
            }
        }
        return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    obj.keysRemoveDuplicate = function() {
        var arr = new Array();
        for (i = 0; i < obj.elements.length; i++) {
            var flag = true;
            for(var j=0;j<arr.length;j++){
                if(arr[j] == obj.elements[i].key){
                    flag = false;
                    break;
                }
            }
            if(flag){
                arr.push(obj.elements[i].key);
            }
        }
        return arr;
    };
    return obj;

}
