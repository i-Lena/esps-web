// 提交登录
function commitMLogin() {
    var mPhoneNumLogin = $("[name='mPhoneNumLogin']").val().trim();
    var mPswLogin = $("[name='mPswLogin']").val().trim();
    var loginUrl = commitLoginUrl();
    if(mPhoneNumLogin == "") {
        layer.alert("请输入手机号！");
        return false;
    }else if(mPswLogin == "") {
        layer.alert("请输入密码！");
        return false;
    }else {
        $.ajax({
            url: loginUrl,
            Type: "post",
            data: "login_phone=" + mPhoneNumLogin + "&password=" + mPswLogin,
            dataType: "json",
            success: function (data) {
                console.info(data);
                if (data.api_status==0){
                    setCookie("uid",data.data.uid,7);
                    setCookie("token",data.data.token,7);
                    setCookie("nickName",data.data.nickName,7);
                    setCookie("portrait",data.data.portrait,7);
                    setCookie("login_phone",data.data.login_phone,7);
                    layer.alert("登录成功",{closeBtn: 0},function (index) {
                        window.location.href = "/esps-web/index.html";
                        layer.close(index);
                    });
                }else{
                    layer.alert(data.api_msg);
                }

            },
            error: function (e) {
                layer.alert("登录请求错误，请联系后台管理员!");
            }
        })
    }
}