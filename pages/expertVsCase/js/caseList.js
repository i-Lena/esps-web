$(function () {
   //加载列表
    var keyword = '';
    getTableData(keyword);

});
// 加载案例列表
function getTableData(str) {
    $.ajax({
        url: caseList(),  //api.js
        type: "post",
        data: {"keyword":str},
        dataType: "json",
        success: function (data) {
            // console.info(data);
            let cases = data.data;
            // console.info(cases);
            /* 使用分页 */
            layui.use(['laypage', 'layer'], function(){
                var laypage = layui.laypage;
                var layer = layui.layer;
                //完整功能
                laypage.render({
                    elem: 'partPage'
                    ,count: cases.length
                    ,theme: '#24a9b6'
                    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
                    ,jump: function(obj){
                        if(obj.count === 0) {
                            var $showTip = $("#noneData").find(".noDataTip").clone();
                            $("#caseLib").html("");
                            $("#caseLib").append($showTip);
                        }else {
                            $("#caseLib").get(0).innerHTML = function () {
                                var arr = [],thisData = cases.concat().splice((obj.curr - 1)*obj.limit,obj.limit);
                                layui.each(thisData,function (index,item) {
                                    var $caseItem = $("#cloneTab").find(".caseItemWrap").clone();
                                    $caseItem.find(".caseTitle").text(item.question_title);
                                    /*$tr.find(".askName").text(item.askName);*/
                                    $caseItem.find(".expertName").text(item.answer_expert_name);
                                    $caseItem.find(".awsTime").text(item.answer_time);
                                    $caseItem.find(".detailId").attr("name",item.id);
                                    arr.push($caseItem.get(0).outerHTML);
                                });
                                return arr.join('');
                            }();
                        }
                    }
                });
            });
        },
        error: function (e) {
            layer.alert("信息错误，请联系后台管理员！");
        }
    });
}
// 搜索案例
function searchCases() {
    let searchContent = $("#searchContent").val().trim();
    getTableData(searchContent);
}
// 查看详情跳转
function goCaseDetail(obj){
    var id = $(obj).attr("name");
    // let url = getOriginUrl();
    let url = window.location.origin;
    console.info(url);
    var uid= getCookie("uid");
    var token= getCookie("token");
    if(uid == "" && token == "") {
        layer.msg("请先登录！");
    }else {
        window.location.href = url + '/esps-web/pages/expertVsCase/caseDetail.html?id='+id;
    }

}