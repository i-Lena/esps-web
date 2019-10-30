
'use strict';
$(function () {

    /*======== 轮播图=========== */
    /*
    * 根据屏幕宽度的变化决定轮播图片应该展示什么
    * return {[type]} [description]
    * */
    function resize() {
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        console.info(isSmallScreen);
        $('#carousel-example-generic > .carousel-inner > .item').each(function (i,item) {
            var $item = $(item);
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            console.info(imgSrc);
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            // $item.html('<img src="' + imgSrc + '" alt="" />');
            if(isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            }else {
                $item.empty();
            }
        });
    }
    $(window).on('resize',resize).trigger('resize');
    /*======== / 轮播图=========== */
});