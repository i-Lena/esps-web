/* 修改密码 */
function editPsw() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    var oldPsw = $("input[name='oldPsw']").val();
    var newPsw = $("input[name='newPsw']").val();
    var confirmPsw = $("input[name='confirmPsw']").val();
    if(oldPsw == "") {
        layer.alert("请输入原密码！");
        return false;
    }else if(newPsw == "") {
        layer.alert("请输入新密码！");
        return false;
    }else if(confirmPsw == "") {
        layer.alert("请再次输入新密码！");
        return false;
    }else if(newPsw != confirmPsw) {
        layer.alert("新密码两次输入不一致！");
        return false;
    }else {
        $.ajax({
            url: editPswUrl(),
            type: 'get',
            data: "uid=" + uid + "&token=" + token + "&oldPassword=" + oldPsw + "&newPassword=" + newPsw + "&newPasswords=" + confirmPsw,
            dataType: "json",
            success: function (data) {
                console.info(data);
                if(data.api_status == 0) {
                    layer.alert("密码修改成功,请重新登录！",{closeBtn: 0},function (index) {
                        logout();  //退出登录  common.js里定义
                       layer.close(index);
                    });
                }else {
                    layer.alert(data.api_msg);
                }
            },
            error: function (e) {
                layer.alert("修改密码接口请求错误，请联系后台管理员！");
            }
        });
    }
}