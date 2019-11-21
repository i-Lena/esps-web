$(function () {
    //获取专家列表
    $.ajax({
        url: expertsUrl(),
        type: "post",
        data: '',
        dataType: "json",
        success: function (data) {
            // console.info(data);
            var experts = data.data;
            console.info(experts);
            for(let i=0;i<experts.length;i++) {
                if(i%2 == 0) {
                    var $li = $("#oddClone").find("li").clone();
                }else {
                    var $li = $("#evenClone").find("li").clone();
                }
                $li.find(".imgSrc").attr("src",experts[i]["avatar"]);
                $li.find(".personName").text(experts[i]["name"]);
                $li.find(".personLabel").text(experts[i]["title"]);
                $li.find(".personDetail").text(experts[i]["introduce"]);
                $("#experts").append($li);
            }
        },
        error: function (e) {
            layer.alert("信息错误！请联系后台管理员！");
        }
    });
});