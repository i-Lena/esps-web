/* 接口 */
/* 上线接口 */
// var uRl = 'http://www.2400online.com';
/* 本地接口 */
// var uRl = window.location.origin;
/*开发接口*/
// var uRl = 'http://192.168.8.8:8084';
/* 测试接口 */
var uRl = 'http://192.168.0.122:80';

// console.info(uRl);


/* ===================== 注册与登录 =========================*/
// 获取origin地址
function getOriginUrl() {
    return uRl;
}
// 获取短信验证码
function sendVerificationUrl() {
    var url = uRl + "/api_customer/register/send_verification";
    return url;
}
// 提交注册
function commitRegisterUrl() {
    var url = uRl + "/api_customer/register/doRegister";
    return url;
}
// 提交登录
function commitLoginUrl() {
    var url = uRl + "/api_customer/login/doLogin";
    return url;
}
// 获取登录信息
function getLoginInfoUrl() {
    var url = uRl + "/api_customer/userinfo/info";
    return url;
}
//获取头像地址信息
function getImgUrl() {
    var url = uRl;
    return url;
}
// 注销登录
function getLogoutUrl() {
    var url = uRl + "/web/login/unsetLogin";
    return url;
}

/* ===================== /注册与登录 =========================*/

/*================== 一键发布需求 =========================*/
/* 业务种类*/
function getCategoryUrl() {
    var url = uRl + "/api_employer/project/project_types";
    return url;
}

/* 三级地址*/
//省
function getProvinceUrl() {
    var url = uRl + "/api_customer/common/get_province";
    return url;
}
//市
function getCityUrl() {
    var url = uRl + "/api_customer/common/get_citys";
    return url;
}
//区
function getAreaUrl() {
    var url = uRl + "/api_customer/common/get_district";
    return url;
}
//一键发布需求提交
function submitDemandInfo() {
    var url = uRl + "/api_customer/demand/add";
    return url;
}
/*================== /一键发布需求 =====================*/
/* ======================== 专家案例库 ==============================*/
// 专家团队
function expertsUrl() {
    var url = uRl + "/api_employer/expert/expert_list";
    return url;
}

// 案例列表
function caseList() {
    var url = uRl + "/api_employer/case/case_list";
    return url;
}

// 案例详情
function getCaseDetailUrl() {
    var url = uRl + "/api_customer/case/case_detail";
    return url;
}
/* ======================== /专家案例库 ==============================*/

/* ========================== 闲置卡件处置 ================================*/
// 上传图片
function getUploadImgUrl() {
    var url = uRl + "/api_customer/file/upload_img";
    return url;
}
// 卖断
function getSaleUrl() {
    var url = uRl + "/api_customer/ht_service/recovery_apply";
    return url;
}
/* ========================== /闲置卡件处置 ================================*/

/* ========================== 个人中心 ================================*/
//修改头像
function editPhotoUrl() {
    var url = uRl + "/api_customer/userinfo/portrait_upload";
    return url;
}
//修改个人信息
function editUserInfoUrl() {
    var url = uRl + "/api_customer/userinfo/update_info";
    return url;
}
//修改密码
function editPswUrl() {
    var url = uRl + "/api_customer/user_setup/revise_login_password";
    return url;
}
// 获取一键发布需求列表
function getDemandListUrl() {
    var url = uRl + "/api_customer/demand/my_demand_list";
    return url;
}
// 获取闲置卡件处置列表
function getDealWayListUrl() {
    var url = uRl + "/api_customer/ht_service/recovery_apply";
    return url;
}
/* ========================== /个人中心 ================================*/

