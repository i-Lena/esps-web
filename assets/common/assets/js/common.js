/* 公共模块JS */
$(document).ready(function () {
    moduleLoad("/esps-web/assets/common/publicModule.html");
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

/* 侧边栏相关js*/
// 点击导航登录 及右侧侧边栏关闭
function gotoSideBar() {
    $(".shadow").addClass("shadowShow");
    $(".sidebar").addClass("sidebarShow");
}
function closeSideBar() {
    $(".shadow").removeClass("shadowShow");
    $(".sidebar").removeClass("sidebarShow");
}
// gotoRegister 点击立即注册  立即登录
function gotoRegister() {
    $(".login").addClass("loginHide");
    $(".register").removeClass("registerHide");
}
function gotoLogin() {
    $(".register").addClass("registerHide");
    $(".login").removeClass("loginHide");
}