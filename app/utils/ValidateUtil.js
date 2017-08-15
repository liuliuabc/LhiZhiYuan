export  function  validatePhone(phone){
  var re = /^1[34578]\d{9}$/;
  return re.test(phone);
}

export  function  validateCode(code){
  var reg =/^[a-zA-Z0-9]{4,8}$/;
  return reg.test(code);
}
export  function  validatePassword(password){
  var reg =/^[a-zA-Z0-9\\._]{6,15}$/;
  return reg.test(password);
}
export  function  validateNickName(nickname){
  var reg =/^[a-zA-Z0-9\u4e00-\u9fa5]{4,15}$/;
  return reg.test(nickname);
}
