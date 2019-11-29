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
            elem: '#dealwayList',
            height: 500,
            url: getDealWayListUrl(),
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
                { field: "recoveryType",title: "卖断/委托销售",width: '15.5%',sort: true,fixed: "left"},
                { field: "factory",title: "厂家",width: '12.5%' },
                { field: "system",title: "适用系统",width: '12%' },
                { field: "is_packing",title: "是否有包装",width: '10%' },
                { field: "old_degree",title: "新旧程度",width: '12.5%' },
                { field: "deal_way",title: "处置方式",width: '12.5%' },
                { field: "addressDetail",title: "地址",width: '12.5%' },
                { field: "phone",title: "联系电话",width: '12.5%' },
            ]],
            parseData: function (res) {
                // console.info(res);
                return {
                    "code": res.api_status, //解析接口状态
                    "msg": res.api_msg, //解析提示文本
                    "count": res.sumCount, //解析数据长度
                    "data": res.data//解析数据列表
                }
            }
        });
    });
}