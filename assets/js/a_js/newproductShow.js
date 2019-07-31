
$(function(){
    $(".prd_nav .show_pub2 ul li").css("width",100/$(".prd_nav .show_pub2 ul li").length+"%");
	var ssf = $(".swiperP_2 .swiper-wrapper").width()/4;
    $(window).resize(function(){
        var ssf = $(".swiperP_2 .swiper-wrapper").width()/4; 
    })
	var swiperP_1 = new Swiper(".swiperP_1", {
        slideToClickedSlide: true,
        loopAdditionalSlides : 1,
        loop: true,
        autoplay : 3000,
        prevButton:'.bswiper .swipe_left',
		nextButton:'.bswiper .swipe_right',
		onSlideChangeEnd: function(swiper){
			useT = $(".swiperP_1 .swiper-slide-active").attr("data-swiper-slide-index")*1
            $(".swiperP_2 .swiper-slide:eq("+useT+")").addClass("activeSlide").siblings().removeClass("activeSlide");
            if (useT<3) {
                $(".swiperP_2 .swiper-wrapper").css({"transform":"translate3d(0px, 0px, 0px)","transition-duration": "200ms"});
            }else{
            	$(".swiperP_2 .swiper-wrapper").css({"transform":"translate3d(-"+ssf*2+"px, 0px, 0px)","transition-duration": "200ms"});
            }
		}
    });
    var swiperP_2 = new Swiper(".swiperP_2", {
        slideToClickedSlide: true,
        loopAdditionalSlides : 1,
        slidesPerView : 4,
    });



});