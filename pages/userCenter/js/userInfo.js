$(function () {
    init();
});
//初始化页面信息
function init() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    $.ajax({
        url: getLoginInfoUrl(),
        type: "get",
        data: "uid=" + uid + "&token=" + token,
        dataType: "json",
        success: function (data) {
            var returnData = data.data;
            // console.info(returnData);
            $(".phoneNum").text(returnData.loginPhone);
            if(returnData.portrait) {
                //修改头像
                var ImgUrl = getOriginUrl() + returnData.portrait;
                // console.info(ImgUrl);
                $(".picBox").css({
                    "background": "url(" + ImgUrl + ") center center no-repeat",
                    "background-size": "cover"
                });
            }
            if(returnData.nickName) {
                $("input[name='nickName']").val(returnData.nickName);
            }
            if(returnData.email) {
                $("input[name='email']").val(returnData.email);
            }
        },
        error: function (e) {
            layer.alert("系统错误，请联系后台管理员")
        }
    });
}

//上传头像
function uploadPhoto(obj) {
    var uid = getCookie("uid");
    var token = getCookie("token");
    var formData = new FormData();
    formData.append("image",$(obj)[0].files[0]);
    formData.append("uid",uid);
    formData.append("token",token);
    // console.info(formData);
    $.ajax({
       url: editPhotoUrl(),
       type: "post",
       data:  formData,
       processData: false,
       contentType: false,
       success: function (res) {
           // 将返回的json字符串转为json对象
           var data = JSON.parse(res);
           if(data.api_status == 0) {
               layer.alert("上传头像成功！",{closeBtn: 0},function (index) {
                   var imgUrl = getOriginUrl() + data.data;
                   // 修改预览图
                   $(".picBox").css({
                       "background": "url(" + imgUrl + ") center center no-repeat",
                       "background-size": "cover"
                   });
                   // 修改导航条头像
                   $(".photoImg").attr("src",imgUrl);
                   layer.close(index);
               });
           }else {
               layer.alert(data.api_msg);
           }
       },
       error: function (e) {
           layer.alert("系统错误，请联系后台管理员！");
       }
    });
}

// 保存修改信息
function editUserInfo() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    var nickName = $("input[name='nickName']").val();
    var email = $("input[name='email']").val();
    if(nickName.trim() == "") {
        layer.alert("昵称不能为空！");
    }else if(email.trim() == "") {
        layer.alert("电子邮箱不能为空！");
    }
    $.ajax({
        url: editUserInfoUrl(),
        type: "get",
        data: "uid=" + uid + "&token=" + token + "&nickName=" + nickName + "&email=" + email,
        dataType: "json",
        success: function (data) {
            console.info(data);
            if(data.api_status == 0) {
                layer.alert("信息保存成功！",{closeBtn: 0},function (index) {
                    init();
                    layer.close(index);
                });
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
            layer.alert("系统错误，请联系后台管理员！");
        }
    });
}