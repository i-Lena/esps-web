$(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");//构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标参数
        if (r != null) return unescape(r[2]); return null;//返回参数值
    };
    var id = $.getUrlParam('id');
    var uid = getCookie("uid");
    var token = getCookie("token");
    $.ajax({
        url: getCaseDetailUrl(),
        type: "post",
        data: {"uid": uid,"token":token,"id":id},
        dataType: "json",
        success: function (data) {
            // console.info(data);
            if(data.api_status == 0) {
                var returnData = data.data;
                $(".caseTitle").text(returnData.question_title);
                $(".expertName").text(returnData.answer_expert_name);
                $(".awsTime").text(returnData.answer_time);
                $(".contentText").html(returnData.answer_content);
                // 上一篇下一篇的展示与隐藏
                var preData = returnData.res_back;
                var nextData = returnData.res_next;
                if(preData.state === 0) {
                    $(".preWrap").css({"display":"none"});
                }else {
                    $(".preWrap").css({"display":"flex"});
                    $(".preWrap").attr("name",preData.back_id);
                    $(".pre").text(preData.back_name);
                }
                if(nextData.state === 0) {
                    $(".nextWrap").css({"display":"none"});
                }else {
                    $(".nextWrap").css({"display":"flex"});
                    $(".nextWrap").attr("name",nextData.next_id);
                    $(".next").text(nextData.next_name);
                }
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
           layer.alert("获取案例详情错误，请联系后台管理员！");
        }
    });
});

// 查看 上一篇 下一篇
function goNextOrPre(obj) {
    var id = $(obj).attr("name");
    var url = window.location.origin;
    window.location.href = url + '/esps-web/pages/expertVsCase/caseDetail.html?id='+id;
}
// 返回列表(暂时未用到，在HTML用a链接跳转的)
function backtoList() {
    var url = window.location.origin;
    window.location.href = url + '/esps-web/pages/expertVsCase/caseList.html';
}