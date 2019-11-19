/* 公共模块JS */
$(document).ready(function () {
    moduleLoad("/esps-web/assets/common/publicModule.html");
    checkCookie();
});
/* 模块加载 */
function moduleLoad(url) {
    $.get(url,function (result) {
        var html = $(result);
        var _templates = html;
        $("[slot]").each(function () {
            var id = $(this).attr('slot');
            var body = $(_templates).find("#"+id).html();
            $(this).html(body);
        });
    })
};

/*==================== 侧边栏相关样式更改js ====================*/
// 点击导航登录 及右侧侧边栏关闭
function gotoSideBar() {
    $(".shadow").addClass("shadowShow");
    $(".sidebar").addClass("sidebarShow");
}
function closeSideBar() {
    $(".shadow").removeClass("shadowShow");
    $(".sidebar").removeClass("sidebarShow");
}
// gotoRegister 点击立即注册  立即登录  更改显示区域
function gotoRegister() {
    $(".login").addClass("loginHide");
    $(".register").removeClass("registerHide");
}
function gotoLogin() {
    $(".register").addClass("registerHide");
    $(".login").removeClass("loginHide");
}

//========================== 注册逻辑=============================
// 获取验证码按钮
function sendVerification(obj,second) {
    var phoneNumR = $("[name='phoneNumR']").val();
    if(phoneNumR == "") {
        layer.alert("请先输入手机号码！");
    }else {
        var sendVyfUrl = sendVerificationUrl();
        console.info(sendVyfUrl);
        $.ajax({
            url: sendVyfUrl,
            Type: "post",
            data: "login_phone=" + phoneNumR,
            dataType: "json",
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
        })
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

// 提交注册 
function commitRegister() {
    var phoneNumR = $("[name='phoneNumR']").val();
    var verificationR = $("[name='verificationR']").val();
    var emailR = $("[name='emailR']").val();
    var pswR = $("[name='pswR']").val();
    var pswConR = $("[name='pswConR']").val();
    var registerUrl = commitRegisterUrl();
    console.info(registerUrl);
    if(phoneNumR == "") {
        layer.alert("请输入手机号码！");
        return false;
    }else if(verificationR == "") {
        layer.alert("请输入手机验证码！");
        return false;
    }else if(pswR == "") {
        layer.alert("请输入密码！");
        return false;
    }else if(pswConR == "") {
        layer.alert("请输入确认密码！");
        return false;
    }else if(pswConR != pswR) {
        layer.alert("两次密码不一致，请重新输入！");
        return false;
    }else {
        $.ajax({
            url: registerUrl,
            Type: "post",
            data: "login_phone=" + phoneNumR + "&verification=" + verificationR + "&password=" + pswR + "&confirm_password=" + pswConR +"&email=" + emailR,
            dataType: "json",
            success: function (data) {
                // console.info(data);
                if(data.api_status==0){
                    layer.alert(data.api_msg);
                    setCookie("uid",data.data.uid,7);
                    setCookie("token",data.data.token,7);
                    setCookie("nickName",data.data.nickName,7);
                    setCookie("portrait",data.data.portrait,7);
                    // console.info(getCookie("uid"));
                    // console.info(getCookie("token"));
                    window.location.href="/esps-web/index.html";
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
// 提交登录
function commitLogin() {
    var phoneNumLogin = $("[name='phoneNumLogin']").val();
    var pswLogin = $("[name='pswLogin']").val();
    var loginUrl = commitLoginUrl();
    if(phoneNumLogin == "") {
        layer.alert("请输入手机号！");
        return false;
    }else if(pswLogin == "") {
        layer.alert("请输入密码！");
        return false;
    }else {
        $.ajax({
            url: loginUrl,
            Type: "post",
            data: "login_phone=" + phoneNumLogin + "&password=" + pswLogin,
            dataType: "json",
            success: function (data) {
                console.info(data);
            },
            error: function (e) {
                layer.alert("登录请求错误，请联系后台管理员!");
            }
        })
    }
}

/* ============================ 关于cookie的存取 ==================================*/

/* 设置cookie */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/* 获取cookie */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/* 检查cookie */
function checkCookie() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    var nickName = getCookie("nickName");
    var portrait = getCookie("portrait");
    console.info(uid);
    console.info(token);
    console.info(nickName);
    console.info(portrait);
    if(uid != "" && token != "") {
        console.info(111);
        // $(".linkWrap .personInfo").addClass("personInfoHide");
        // $(".linkWrap .loginLink").removeClass("loginLinkHide");
    }else {
        console.info(2222);
        // $(".linkWrap .loginLink").addClass("loginLinkHide");
        // $(".linkWrap .personInfo").removeClass("personInfoHide");
    }
}
/* ============================ /关于cookie的存取 ==================================*/
