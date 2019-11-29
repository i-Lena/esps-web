// 一键提需求 列表
$(function () {
    initList();
});

//初始化列表
function initList() {
    layui.use('table',function () {
       var table = layui.table;
       var uid= getCookie("uid");
       var token = getCookie("token");
        table.render({
            elem: '#demandList',
            height: 500,
            url: getDemandListUrl(),
            method: 'get',
            where: {
                uid: uid,
                token: token
            },
            page: {
                theme: '#24a9b6'
            },
            limit: 10,
            cols: [[
                { field: "demandSn",title: "需求编号",width: '20%',sort: true,fixed: "left"},
                { field: "demandTypeName",title: "需求类型",width: '20%' },
                { field: "content",title: "需求内容",width: '20%' },
                { field: "createtime",title: "提交时间",width: '20%' },
                { field: "examine_state",title: "需求状态",width: '20.5%' },
            ]],
            parseData: function (res) {
                console.info(res);
                return {
                    "code": res.api_status, //解析接口状态
                    "msg": res.api_msg, //解析提示文本
                    "count": res.data.length, //解析数据长度
                    "data": res.data//解析数据列表
                }

            }
        });
    });
}