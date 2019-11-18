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

console.info("1111111111111111111")