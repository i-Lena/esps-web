//获取验证码
function mSendVefy(obj,second) {
    var mPhoneNumR = $("[name='mPhoneNumR']").val();
    if(mPhoneNumR.trim() == "") {
        layer.alert("请先输入手机号码！");
    }else {
        var sendVyfUrl = sendVerificationUrl();
        // console.info(sendVyfUrl);
        $.ajax({
            url: sendVyfUrl,
            type: "get",
            /*xhrFields:{
                withCredentials:true
            },
            crossDomain: true,*/
            data: "login_phone=" + mPhoneNumR,
            dataType: "jsonp",
            success: function (data) {
                if(data.api_status == 0) {
                    layer.alert("发送成功！");
                    countDown(obj,second);
                }
                else {
                    layer.alert("请核对手机号码是否有误！");
                }
            },
            error: function (e) {
                layer.alert("获取验证码错误，请联系后台管理员！");
            }
        });
    }
}
// 倒计时
function countDown(obj,second){
    // 如果秒数还是大于0，则表示倒计时还没结束
    if(second>=0){
        // 获取默认按钮上的文字
        if(typeof buttonDefaultValue === 'undefined' ){
            buttonDefaultValue =  obj.defaultValue;
        }
        // 按钮置为不可点击状态
        obj.disabled = true;
        // 按钮里的内容呈现倒计时状态
        obj.value = buttonDefaultValue+'('+second+')';
        // 时间减一
        second--;
        // 一秒后重复执行
        setTimeout(function(){countDown(obj,second);},1000);
        // 否则，按钮重置为初始状态
    }else{
        // 按钮置未可点击状态
        obj.disabled = false;
        // 按钮里的内容恢复初始状态
        obj.value = buttonDefaultValue;
    }
}

//提交注册
function commitMRegister() {
    var mPhoneNumR = $("[name='mPhoneNumR']").val().trim();
    var mVyfR = $("[name='mVyfR']").val().trim();
    var mEmailR = $("[name='mEmailR']").val().trim();
    var mPswR = $("[name='mPswR']").val().trim();
    var mPswConR = $("[name='mPswConR']").val().trim();
    var registerUrl = commitRegisterUrl();
    console.info(registerUrl);
    if(mPhoneNumR == "") {
        layer.alert("请输入手机号码！");
        return false;
    }else if(mVyfR == "") {
        layer.alert("请输入手机验证码！");
        return false;
    }else if(mPswR == "") {
        layer.alert("请输入密码！");
        return false;
    }else if(mPswConR == "") {
        layer.alert("请输入确认密码！");
        return false;
    }else if(mPswConR != mPswR) {
        layer.alert("两次密码不一致，请重新输入！");
        return false;
    }else {
        $.ajax({
            url: registerUrl,
            type: "get",
            /*xhrFields:{
                withCredentials:true
            },
            crossDomain: true,*/
            data: "login_phone=" + mPhoneNumR + "&verification=" + mVyfR + "&password=" + mPswR + "&confirm_password=" + mPswConR +"&email=" + mEmailR,
            dataType: "jsonp",
            success: function (data) {
                // console.info(data);
                if(data.api_status==0){
                    layer.alert(data.api_msg,{closeBtn: 0},function (index) {
                        setCookie("uid",data.data.uid,7);
                        setCookie("token",data.data.token,7);
                        setCookie("nickName",data.data.nickName,7);
                        setCookie("portrait",data.data.portrait,7);
                        window.location.href="/esps-web/index.html";
                        layer.close(index);
                    });
                }else{
                    layer.alert(data.api_msg);
                }
            },
            error: function (e) {
                layer.alert("注册错误，请联系后台管理员!");
            }
        });
    }
}