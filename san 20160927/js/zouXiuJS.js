/**
 * Created by Administrator on 2016/9/27 0027.
 */
(function () {
    var swiper=new Swiper(".swiper-container",{
        direction:"horizontal",
        pagination:".swiper-pagination",
        paginationClickable:true,
        paginationBulletRender:function (index,className) {
          return '<span class= '+className +'>'+'<img src="images/ico'+(index+1)+'.png" alt="">'+'</span>';
        },
        onInit:function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd:function (swiper) {
            swiperAnimate(swiper);
        }
    }
    );
    var myShowLoginForm=document.getElementById("myShowLoginForm");
    var myShowLoginBtn=document.getElementById("myShowLoginBtn");
    myShowLoginBtn.onclick=function (e) {
        myShowLoginForm.submit();
        console.log(myShowLoginForm["myShowLoginID"]);
    };
})();