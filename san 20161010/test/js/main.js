/**
 * Created by Administrator on 2016/10/10 0010.
 */
(function () {
    var button=document.getElementsByClassName("button")[0];
    var canvas=document.getElementById("canvas");
    var getImage=document.getElementsByClassName("getImage")[0];
    button.onclick=function () {
        button.style.display="none";
        canvas.style.display="block";
        getImage.style.display="block";
    }
})();