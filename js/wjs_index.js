$(function () {

    /* 1、swipper块：判断窗口大小，js动态插入轮播图幻灯片内子元素(image或者背景图)*/
    //注册浏览器窗口大小改变事件 
    $(window).on("resize", function () {
        // 获取当前的窗口大小
        var screen_width = $(window).width();
        // console.log(screen_width);//获取到的是数字
        var items = $(".carousel-inner .item");
        if (screen_width <= 768) {
            var html = "";
            items.each(function (index, element) {
                // jq data() 方法向被选元素附加数据，或者从被选元素获取数据（data-*自定义属性）。
                var imgSrc = $(this).data("smallImage"); //注意属性名的写法（去除连字符和data前缀）
                // console.log(imgSrc);
                html = '<a href="javascript:;"><img src="' + imgSrc + '" alt=""></a>';
                $(this).html(html);
            });
        } else { //窗口宽度大于768--使用背景图的形式
            var html = "";
            items.each(function (index, element) {
                // jq data() 方法向被选元素附加数据，或者从被选元素获取数据（data-*自定义属性）。
                var imgSrc = $(this).data("largeImage"); //注意属性名的写法（去除连字符和data前缀）
                // console.log(imgSrc);
                html = '<a href="javascript:;"></a>';
                $(this).html(html);
                $(this).find("a").css({
                    "background-image": "url(" + imgSrc + ")",
                    "height": "410px"
                });
            });
        }
    });
    ///初次加载时，窗口事件没有触发，页面元素为空，需要手动触发一次
    $(window).trigger("resize");

    /*2、添加移动端的滑动切换轮播图操作 start*/
    var startX, endX;
    var carousel_inner = $(".carousel-inner")[0];

    //获取当前轮播图
    var carousel = $(".carousel");

    // 监测触摸开始与结束事件，获取当前位置。根据位置判断是上一张还是下一张
    carousel_inner.addEventListener("touchstart", function (e) {
        console.dir(e); //打印TouchEvent对象信息
        startX = e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            /*上一张，调用bootstrap 轮播图插件的方法*/
            carousel.carousel('prev');
        } else if (endX - startX < 0) {
            /*下一张*/
            carousel.carousel('next');
        }
    });
    /*添加移动端的滑动操作 end*/

    /*3、产品块：初始化Bootstrap tooltip插件 */
    $('[data-toggle="tooltip"]').tooltip();
    /* 初始化tooltip end */

    /*4、产品块 导航tab标签的左右水平滑动 */
    //获取所有li的实际宽度和(所有li宽度和)--
    var totalWidth = 0;
    var ulObj = $(".wjs_product .nav-tabs");
    var lis = ulObj.find("li");
    lis.each(function (index, ele) {
        totalWidth += $(this).innerWidth(); //innerWidth() 内容宽度+padding
        // console.log($(this).innerWidth());
    });
    // console.log(totalWidth);
    ulObj.width(totalWidth); //固定宽度,避免宽度100%自动换行适应
    //初始化iscroll.js插件--参数1：选择器，选择区域
    var myScroll = new IScroll('.tabs_parent', {
        /*设置水平滑动，不允许垂直滑动*/
        scrollX: true,
        scrollY: false
    });
    /* 导航tab标签水平滑动 end */



});