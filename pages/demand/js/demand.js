
$(function () {
    checkLoginOrNot();
    getCategory();
});
// 判断是否登录
function checkLoginOrNot() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    if(uid == "" && token == "") {
        // 显示尚未登录提示信息
        $(".tipWrap").removeClass("tipWrapHide");
        // $(".tipWrap").toggle();
        // 表单元素禁用
        $("#demandForm").find("input").attr("disabled","disabled");
        $("#demandForm").find("textarea").attr("disabled","disabled");
        $("#demandForm").find("select").attr("disabled","disabled");
    }else {
        // 隐藏尚未登录提示信息
        $(".tipWrap").addClass("tipWrapHide");
    }
}
// 初始化业务种类
function getCategory() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    $.ajax({
        url: getCategoryUrl(),
        Type: 'get',
        data: {uid: uid,token: token},
        dataType: 'json',
        success: function (data) {
            if(data.api_status == 0) {
                var returnData = data.data;
                // console.info(returnData);
                for(let item in returnData) {
                    let $opt = "<option value=" + returnData[item].value + ">" + returnData[item].name + "</option>";
                    $("#category").append($opt);
                    //url有参数时进行定位
                    var demandTypeCode = getDemandType();
                    if(demandTypeCode != "" && demandTypeCode != null ) {
                        $("#category").find("option[value='" + demandTypeCode + "']").attr("selected",true);
                    }
                }
            }else if(data.api_status == 90002 || data.api_status == 90003 || data.api_status == 90004) {
                layer.alert("请先登录。");
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
            layer.alert("获取业务种类失败，请联系系统管理员！");
        }
    })
}
// 页面接参并给定位业务种类
function getDemandType() {
    $.getUrlParam = function (name) {
        // 构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // 匹配目标参数
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null; // 返回参数值
    }
    code = $.getUrlParam("type");
    // console.info(code);
    return code;
}

/* 地址 省市区联动 */
//省
getProvince();
function getProvince() {
    $.ajax({
        url: getProvinceUrl(),
        type: "get",
        dataType: "json",
        data: '',
        success: function (data) {
            if(data.api_status == 0) {
                var returnData = data.data;
                for(let item in returnData) {
                    let $opt = "<option value=" + returnData[item].value + ">" + returnData[item].name + "</option>";
                    $("select[name='province']").append($opt);
                }
            }else if(data.api_status == 90002 || data.api_status == 90003 || data.api_status == 90004) {
                layer.alert("请先登录。");
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
            layer.alert(e);
        }
    });
}
//市
function getCity() {
    var selectProvince = $("select[name='province']").val();
    $.ajax({
        url: getCityUrl(),
        type: "get",
        dataType: "json",
        data: {provinceId: selectProvince},
        success: function (data) {
            if(data.api_status == 0) {
                var returnData = data.data;
                $("select[name='city']").find("option").remove();
                $("select[name='city']").append("<option value='0'>" + "请选择所在市" + "</option>");
                $("select[name='area']").find("option").remove();
                $("select[name='area']").append("<option value='0'>" + "请选择所在区" + "</option>");
                for(let item in returnData) {
                    let $opt = "<option value=" + returnData[item].value + ">" + returnData[item].name + "</option>";
                    $("select[name='city']").append($opt);
                }
            }else if(data.api_status == 90002 || data.api_status == 90003 || data.api_status == 90004) {
                layer.alert("请先登录。");
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
            layer.alert(e);
        }
    });
}
//区
function getArea() {
    var selectCity = $("select[name='city']").val();
    $.ajax({
        url: getAreaUrl(),
        type: "get",
        dataType: "json",
        data: {cityId: selectCity},
        success: function (data) {
            if(data.api_status == 0) {
                var returnData = data.data;
                $("select[name='area']").find("option").remove();
                $("select[name='area']").append("<option value='0'>" + "请选择所在区" + "</option>");
                for(let item in returnData) {
                    let $opt = "<option value=" + returnData[item].value + ">" + returnData[item].name + "</option>";
                    $("select[name='area']").append($opt);
                }
            }else if(data.api_status == 90002 || data.api_status == 90003 || data.api_status == 90004) {
                layer.alert("请先登录。");
            }else {
                layer.alert(data.api_msg);
            }
        },
        error: function (e) {
            layer.alert(e);
        }
    });
}

//需求详述统计
/* 备注 限制字数 */
$("textarea[name='description']").change(function () {
    $(".wordsCount").html($("textarea[name='description']").val().length);
});
$("textarea[name='description']").keydown(function () {
    $(".wordsCount").html($("textarea[name='description']").val().length);
});
$("textarea[name='description']").keyup(function () {
    $(".wordsCount").html($("textarea[name='description']").val().length);
});
/* 备注 文本框 随内容自适应高度 */
$.fn.autoHeight = function(){
    function autoHeight(elem){
        elem.style.height = 'auto';
        elem.scrollTop = 0; //防抖动
        elem.style.height = elem.scrollHeight + 'px';
    }
    this.each(function(){
        autoHeight(this);
        $(this).on('keyup', function(){
            autoHeight(this);
        });
    });
}
$("textarea[name='description']").autoHeight();

// 表单提交
function submitDemand() {
    let categoeyId = $("#category").val();
    let companyName = $("input[name='companyName']").val();
    let contactNum = $("input[name='contactNum']").val();
    if(categoeyId == 0 || categoeyId == "") {
        layer.msg("请选择业务种类");
        return false;
    }else if(companyName == "") {
        layer.msg("请填写公司名称");
        return false;
    }else if(contactNum == "") {
        layer.msg("请填写联系人电话");
        return false;
    }else {
        //传递参数
        let obj = {};
        //将省市区放进一个地址数组中
        var addressArray = [];
        addressArray.push($("select[name='province']").val());
        addressArray.push($("select[name='city']").val());
        addressArray.push($("select[name='area']").val());
        //提交参数赋值
        obj.uid = getCookie("uid");
        obj.token = getCookie("token");
        obj.demandType = $("#category").val();
        obj.companyName = $("input[name='companyName']").val();
        obj.customerName = $("input[name='contactName']").val();
        obj.customerPosition = $("input[name='contactPost']").val();
        obj.customerPhone = $("input[name='contactNum']").val();
        //地址
        obj.address = addressArray;
        //需求详述
        obj.content	 = $("textarea[name='description']").val();
        //请求提交接口
        // console.info(obj);
        $.ajax({
            url: submitDemandInfo(),
            type: "get",
            dataType: "json",
            data: obj,
            success: function (data) {
                // console.info(data);
                if(data.api_status ==0) {
                    layer.alert("需求发布成功！",{closeBtn: 0},function (index,layero) {
                        window.location.reload();  //页面刷新
                    });
                }else {
                    // console.info("返回的状态码api_status不是0");
                    layer.alert(data.body.api_msg);
                }
            },
            error: function (e) {
                layer.alert(e);
            }
        });
    }
}