/* 接口 */
/* 本地接口 */
// var uRl = window.location.origin;
/*开发接口*/
var uRl = 'http://192.168.8.8:8084';
/* 测试接口 */
var uRl = 'http://192.168.0.122';

/* 上线接口 */
// var uRl = 'http://www.2400online.com';
// console.info(uRl);

/* ===================== 注册与登录 =========================*/
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







/*  原来  后慢慢一点点整理*/
/* 专家团队 */
function expertsUrl() {
    var url = uRl + "/api_employer/expert/expert_list";
    return url;
}

/* 案例列表 */
function caseList() {
    var url = uRl + "/api_employer/case/case_list";
    return url;
}

/* 案例搜索 */
function caseSearch() {
    var url = uRl + "/api_employer/case/case_list";
    return url;
}

/* 案例详情 */
function caseDetail() {
    var url = uRl + "/api_customer/case/case_detail";
    return url;
}

