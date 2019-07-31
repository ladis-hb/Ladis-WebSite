var urlstr = location.href;　　　　 //获取浏览器的url
var urlstatus = false;　　　　　　　　 //标记
　 //遍历导航div
$(".new_left a").each(function() {
    //判断导航里面的rel和url地址是否相等
    if ((urlstr + '/').indexOf($(this).attr('href')) > -1 && $(this).attr('href') != '') {
        $(this).find('.nav_left_icon').attr('src','/a_images/about/news_active.png')
        urlstatus = true;
    } else {
        $(this).find('.nav_left_icon').attr('src','/a_images/about/newsIcon_left.png')
    }
});
//当前样式保持
if (!urlstatus) { $(".new_left a").eq(0).find('.nav_left_icon').attr('src','/a_images/about/news_active.png')}
