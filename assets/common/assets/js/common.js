/* 公共模块JS */
$(document).ready(function () {
    moduleLoad("/esps-web/assets/common/publicModule.html");
});
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
}