/* 卖断 */
$(function () {
    //判断是否登录
    loginOrNot();
    /* 省市区 三级联动 */
    getProvince();
});

// 判断是否登录
function loginOrNot() {
    var uid = getCookie("uid");
    var token = getCookie("token");
    if(uid == "" && token == "") {
        layer.alert("尚未登录，不允许填写相关信息！");
        //显示尚未登录提示信息
        $(".unLoginTips").removeClass("unLoginTipsHide");
        //处理表单内容不可填
        $(".saleForm").find("input").attr("disabled","disabled");
        $(".saleForm").find("select").attr("disabled","disabled");
    }else {
        //隐藏尚未登录提示信息
        $(".unLoginTips").addClass("unLoginTipsHide");
    }
}
/* 省市区 联动 */
//省
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

/* 上传图片 */
function uploadImg(obj,str) {
    var uid = getCookie("uid");
    var token = getCookie("token");
    var formData = new FormData();
    // console.info(formData);
    // console.info($(obj)[0].files[0]);
    formData.append("image",$(obj)[0].files[0])
    formData.append("uid",uid);
    formData.append("token",token);
    // console.info(formData);
    $.ajax({
        url: getUploadImgUrl(),
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.info(data)
            // console.info(data.api_status);
           if(data.api_status == 90009) {  //上传成功
                // console.info(2222);
                layer.alert("图片上传成功！");
                // console.info(data.data)
                $("#" + str).val(data.data);
                var imgUploadSrc = getOriginUrl() + data.data;
                // console.info(imgUploadSrc);
                $(obj).parent().css({
                    "background": "url(" + imgUploadSrc + ") center center no-repeat",
                    "background-size": "cover"
                });
            }else {
                // console.info(33333)
                layer.alert(data.api_msg);
            }
        }
    });

}

/* 提交表单 */
function submitSaleForm() {
    var factoryName = $("input[name='factoryName']").val();
    var model = $("input[name='model']").val();
    var orderNum = $("input[name='orderNum']").val();
    var province = $("select[name='province']").val();
    var city = $("select[name='city']").val();
    var area = $("select[name='area']").val();
    var telNum = $("input[name='telNum']").val();
    var addressDetail = $("input[name='addressDetail']").val();
    var system = $("input[name='system']:checked").val();
    // console.info(system);
    var hasPack = $("input[name='hasPack']:checked").val();
    var degree = $("input[name='degree']").val();
    // 上传的图片
    var pic1 = $("#pic1").val();
    var pic2 = $("#pic2").val();
    var pic3 = $("#pic3").val();
    var pic4 = $("#pic4").val();
    var pic5 = $("#pic5").val();
    //处置方式
    var dealWay = $("input[name='dealWay']:checked").val();
    // console.info(pic1);
    var uid = getCookie("uid");
    var token = getCookie("token");

    var formData = {};
    formData.uid = uid;
    formData.token = token;
    formData.recovery_type = $("input[name='formType']").val();
    formData.factory = factoryName;
    formData.equipment_type = model;
    formData.goods_sn = orderNum;
    formData.system = system;
    formData.is_packing = hasPack;
    formData.old_degree = degree;
    formData.content_img1 = pic1;
    formData.content_img2 = pic2;
    formData.content_img3 = pic3;
    formData.content_img4 = pic4;
    formData.content_img5 = pic5;
    formData.province = province;
    formData.city = city;
    formData.area = area;
    formData.phone = telNum;
    formData.post_address_detail = addressDetail;
    formData.dealWay = dealWay;
    // console.info(formData);
    if(factoryName.trim() == "") {
        layer.alert("厂家名称不能为空！");
        return false;
    }else if(model.trim() == "") {
        layer.alert("型号不能为空！");
        return false;
    }else if(orderNum.trim() == "") {
        layer.alert("订货号不能为空！");
        return false;
    }else if(province == 0 || province == "") {
        layer.alert("请选择所在省！");
        return false;
    }else if(city == 0 || city == "") {
        layer.alert("请选择所在市！");
        return false;
    }else if(area == 0 || area == "") {
        layer.alert("请选择所在区！");
        return false;
    }else if(telNum.trim() == "") {
        layer.alert("联系电话不能为空！");
        return false;
    }else if(addressDetail.trim() == "") {
        layer.alert("寄送地址详情不能为空！");
        return false;
    }else {
        $.ajax({
            url: getSaleUrl(),
            type: "post",
            data: formData,
            dataType: "json",
            success: function (data) {
                console.info(data);
                if(data.api_status == 0) {
                    layer.alert("委托销售表单提交成功！",{closeBtn: 0},function (index,layero) {
                        window.location.reload();  //页面刷新
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
}