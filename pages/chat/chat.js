
// var name = "{$Think.session.web_userPhone}";
var name = getCookie("login_phone");
// var uid = "{$Think.session.web_uid}";
var uid = getCookie("uid");
var clientid = "";
// var userImg  = "{$Think.session.web_portrait}";
var userImg  = getCookie("portrait");
var ws = null;
var to_client_id = "";
var to_client_name = "";
screenFuc();
function screenFuc() {
    var topHeight = $(".chatBox-head").innerHeight();//聊天头部高度
    //屏幕小于768px时候,布局change
    var winWidth = $(window).innerWidth();
    if (winWidth <= 768) {
        var totalHeight = $(window).height(); //页面整体高度
        $(".chatBox-info").css("height", totalHeight - topHeight);
        var infoHeight = $(".chatBox-info").innerHeight();//聊天头部以下高度
        //中间内容高度
        $(".chatBox-content").css("height", infoHeight - 46);
        $(".chatBox-content-demo").css("height", infoHeight - 46);

        $(".chatBox-kuang").css("height", totalHeight - topHeight);
        $(".div-textarea").css("width", winWidth - 106);
    } else {
        $(".chatBox-info").css("height", 495);
        $(".chatBox-content").css("height", 448);
        $(".chatBox-content-demo").css("height", 448);
        $(".chatBox-kuang").css("height", 495);
        $(".div-textarea").css("width", 260);
    }
}
(window.onresize = function () {
    screenFuc();
})();
//未读信息数量为空时
var totalNum = $(".chat-message-num").html();
if (totalNum == "") {
    $(".chat-message-num").css("padding", 0);
}
$(".message-num").each(function () {
    var wdNum = $(this).html();
    if (wdNum == "") {
        $(this).css("padding", 0);
    }
});

//当前时间
function getNow(){
    var dateobj = new Date();
    return dateobj.getHours() + ":" + dateobj.getMinutes() + ":" + dateobj.getSeconds();
}

//打开/关闭聊天框
$(".chatBtn").click(function () {
    if (ws == null){
        initTalk();
    }
    $(".chatBox").toggle(10);
    $(".div-textarea").keydown(function(event){
        event=document.all?window.event:event;
        if((event.keyCode || event.which)==13){
            sendMessage();
        }
    });
})
$("#closechat").click(function () {
    $(".chatBox").toggle(10);
})

//发送信息
$("#chat-fasong").click(function () {
    sendMessage();
});

function sendMessage() {
    var message = $(".div-textarea").html().replace(/[\n\r]/g, '<br>');
    $(".div-textarea").html("");
    if (to_client_id == "" || to_client_id == null){
        input("", "系统", "客服离线中，您的对话将被留言给客服", "");
        ws.send('{"type":"sayhis","from_client_id":"'+clientid+'","from_client_name":"'+name+'","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+message.replace(/"/g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}');
    }else{
        ws.send('{"type":"say","from_client_id":"'+clientid+'","from_client_name":"'+name+'","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+message.replace(/"/g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}');
    }
    output(name, message, getNow());
}

function output(name, content, time, userImg="") {
    $(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
        "<div class=\"author-name\"><small class=\"chat-date\">" + "</small> </div> " +
        "<div class=\"right\"> <div class=\"chat-message\"> " + content + " </div> " +
        "<div class=\"chat-avatars\">" + name + "</div> </div> </div>");
    scrollToBottom();
}

function input(from_client_id, from_client_name, content, time){
    $(".chatBox-content-demo").append("<div class=\"clearfloat\">" +
        "<div class=\"author-name\"><small class=\"chat-date\">" + "</small> </div> " +
        "<div class=\"left\"> <div class=\"chat-avatars\">" + from_client_name + "</div><div class=\"chat-message\"> " + content + " </div> " +
        "</div> </div>");
    scrollToBottom();
}

function initTalk(){
    // 创建websocket
    // ws = new WebSocket("ws://{$Think.config.socket.url}");
    ws = new WebSocket("ws://chat.2400online.com:7272");
    // 当socket连接打开时，输入用户名
    ws.onopen = onopen;
    // 当有消息时根据消息类型显示不同信息
    ws.onmessage = onmessage;
    ws.onclose = function() {
        console.log("连接关闭，定时重连");
    };
    ws.onerror = function() {
        console.log("出现错误");
    };
}

// 连接建立时发送登录信息
function onopen()
{
    name = name !="" ? name : '游客' + Math.floor((Math.random() * 1000) + 1);
    var login_data = "";
    // 登录
    if (uid == ""){
        login_data = '{"type":"visitorlogin","client_name":"'+name.replace(/"/g, '\\"')+'"}';
    }else{
        login_data = '{"type":"customerlogin","client_name":"'+name.replace(/"/g, '\\"')+'","customerid":"'+uid+'"}';
    }

    console.log("websocket握手成功，发送登录数据:"+login_data);
    ws.send(login_data);
}

// 服务端发来消息时
function onmessage(e)
{
    console.log(e.data);
    var data = JSON.parse(e.data);
    switch(data['type']){
        case 'visitorlogin':
            clientid = data['client_id'];
            if (data['to_client_id']){
                to_client_id = data['to_client_id'];
                to_client_name = data['to_client_name'];
            }
            input("",to_client_name,"小草欢迎您，请问有什么为您解答的？");
            break;
        case 'customerlogin':
            clientid = data['client_id'];
            if (data['to_client_id']){
                to_client_id = data['to_client_id'];
                to_client_name = data['to_client_name'];
            }
            break;
            input("",to_client_name,"小草欢迎您，请问有什么为您解答的？");
        // 服务端ping客户端
        case 'ping':
            ws.send('{"type":"pong","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'"}');
            break;
        case 'pong':
            to_client_id = data['to_client_id'];
            to_client_name = data['to_client_name'];
            break;
        // 发言
        case 'say':
            to_client_id = data['from_client_id'];
            to_client_name = data['from_client_name'];
            input(data['from_client_id'], data['from_client_name'], data['content'], data['time']);
            break;
        // 用户退出 更新用户列表
        case 'logout':
            input(data['from_client_id'], data['from_client_name'], data['from_client_name']+' 退出了', data['time']);
    }
}



function scrollToBottom(){
    setTimeout(()=>{
        //滚动条长度
        var currentDistance=$("#chatBox-content-demo").get(0).scrollHeight-$("#chatBox-content-demo").get(0).clientHeight;
        //当前滚动条距离顶部的距离
        var currentScroll_y=$("#chatBox-content-demo").get(0).scrollTop;
        if(currentDistance>0 && currentDistance>currentScroll_y){
            currentScroll_y=Math.ceil((currentDistance-currentScroll_y)/10)+currentScroll_y;
            currentScroll_y=currentScroll_y>currentDistance ? currentDistance: currentScroll_y;
            //微信和qq浏览器不支持 scrollTo？
            //this.$refs.xwBody.scrollTo(0,currentScroll_y);
            $("#chatBox-content-demo").get(0).scrollTop = currentScroll_y;
            scrollToBottom();
        }
    },13);
}
