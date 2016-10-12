/**
 * Created by Administrator on 2016/10/11 0011.
 */
(function () {
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    var startX=0,startY=0,endX=0,endY=0;
    var saveButton=document.getElementById("save-button");
    var resetButton=document.getElementById("reset-button");
    var imageData;
    var CANVAS_WIDTH=400,CANVAS_HEIGHT=400;
    var storage=localStorage;
    function drawPathStart(x,y) {
        context.beginPath();
        context.moveTo(x,y);
        context.fillStyle="#000";
    }
    function drawPathEnd(x,y) {
        context.lineTo(x,y);
        context.stroke();
    }
    function getPathStartPoint() {
        canvas.onmousedown=function (e) {
            startX=e.layerX;
            startY=e.layerY;
            drawPathStart(startX,startY);
            canvas.addEventListener("mousemove",mouseMoveFunction)
        };
    }
    function removePathEvent() {
        canvas.onmouseup=function (e) {
            canvas.removeEventListener("mousemove",mouseMoveFunction);
        }
    }
    function mouseMoveFunction(e) {
        endX=e.layerX;
        endY=e.layerY;
        drawPathEnd(endX,endY);
    }
    //获得当前画布的状态并且保存到local里
    function saveCanvsToLocalStorge() {
        saveButton.onclick=function(){
            imageData=canvas.toDataURL();
            storage.setItem("data",imageData);
        }
    }
    //重置画布的函数
    function resetCanvas() {
        resetButton.onclick=function (e) {
            context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            storage.setItem("data","");
        }
    }
    function init() {
        getPathStartPoint();
        removePathEvent();
        saveCanvsToLocalStorge();
        resetCanvas();
    }
    init();
    window.onload=function () {
            console.log(storage.getItem("data"));
            var img=new Image;
            img.src=storage.getItem("data");
            context.drawImage(img,0,0);
    }
})();