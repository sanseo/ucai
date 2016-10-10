/**
 * Created by Administrator on 2016/10/10 0010.
 */
//canvas有一个默认的宽高
//canvas标签里面的width 和height一般要写在标签里
//写样式里会变形,等比放大

//只是看起来差不多的你就觉得是一样的
//因为自己有点错误，就很心烦，对自己的动力的消耗非常大
//还有一个问题就是你对自己不够了解的事情不清楚，你以为自己已经了解了，随意更改了，其实你根本还没了解透
//你以为没用啊，然后删除，或者修改了，然后出问题了.
//当你状态不好的时候，记得，千万要调整状态，不然遇到点问题你会蹦
(function () {
    var videoWidth=400;
    var videoHeight=400;
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    var blockStartX=100,blockStartY=100,choiceBlockWidth=200,choiceBlockHeight=200;
    var choiceBlockX=100,choiceBlockY=100;
    var imgData;
    var startX,startY;
    var currentX,currentY;
    var personImgData;
    /**
     *
     * @type {HTMLVideoElement}
     */
    var video=document.createElement("video");
    video.width=videoWidth;
    video.height=videoHeight;
    var cutImage=document.getElementsByClassName("getImage")[0];
    // function loadVideo() {
    //     video=document.createElement("video");
    //     video.autoplay=true;
    // }
    function render() {
        context.save();
        context.drawImage(video,0,0,400,400);
        context.restore();
        // context.putImageData(targetBitmap,0,0);
        requestAnimationFrame(render);
    }
    //点击截取的事件
    function cutImageClick() {
        cutImage.onclick=function (e) {
            render=function () {
                context.save();
                context.drawImage(video,0,0,400,400);
                context.restore();
                imgData=context.getImageData(0,0,videoWidth,videoHeight);
                imageClip();
                //为什么要点两下呢，是因为赋值需要的时间比执行长，然后先执行完了才赋值么
            };
        }
    }
    //鼠标移动的事件
    function addMouseMoveEvent() {
        canvas.onmousedown=function (e) {
            startX=e.layerX;
            startY=e.layerY;
            if (e.layerX<300&&e.layerX>100&&e.layerY>100&&e.layerY<300){
                canvas.addEventListener("mousemove",mouseMoveEvent)
            }
        };
        canvas.onmouseup=function (e) {
            if (e.layerX<300&&e.layerX>100&&e.layerY>100&&e.layerY<300){
                canvas.removeEventListener("mousemove",mouseMoveEvent)
            }
        };
        function mouseMoveEvent(e) {
            currentX=e.layerX;
            currentY=e.layerY;
            if (currentX>0&&currentX<400&&currentY>0&&currentY<400){
                choiceBlockX=blockStartX+(currentX-startX);
                choiceBlockY=blockStartY+(currentY-startY);
                if (choiceBlockX<0){choiceBlockX=0;}
                if (choiceBlockX>200){choiceBlockX=200;}
                if (choiceBlockY<0){choiceBlockY=0;}
                if (choiceBlockY>200){choiceBlockY=200;}
                context.clearRect(0,0,videoWidth,videoHeight);
                context.putImageData(imgData,0,0);
                imageClip();
            }
        }
        context.clearRect(0,0,videoWidth,videoHeight);

    }
    function getVideo() {
        //这个是代表获得摄像头内容的
        navigator.mediaDevices.getUserMedia({
                //这个里面 video为true，才能获得摄像头
                //audio为true的时候，获得麦克风
                audio:false,video:true
            }
        ).then(function (result) {
            //result 是摄像头呈现的画面
            video.srcObject=result;
        }).catch(function (error) {
            console.log(error);
        })
    }
    function imageClip() {
        context.save();
        context.beginPath();
        context.rect(0,0,choiceBlockX,400);
        context.rect(choiceBlockX,0,choiceBlockWidth,choiceBlockY);
        context.rect(choiceBlockX+choiceBlockWidth,0,400-choiceBlockX-choiceBlockWidth,400);
        context.rect(choiceBlockX,choiceBlockY+choiceBlockHeight,choiceBlockWidth,400-choiceBlockY-choiceBlockHeight);
        context.clip();
        context.fillStyle="rgba(120,120,120,0.6)";
        context.fillRect(0,0,400,400);
        context.restore();
        //get之后要return给一个变量
        personImgData=context.getImageData(choiceBlockX,choiceBlockY,choiceBlockWidth,choiceBlockHeight);
        context.putImageData(personImgData,400,100);
    }
    //clip是截取一块面积，只在这一块上绘画
    //那我要截取这一块让他显示，在别的地方都让他蒙上遮罩层
    //那我截取除了这一块的别的地方可以吗
    //分成几个部分来遮罩,那几个部分设置灰色
    function init() {
        getVideo();
        render();
        cutImageClick();
        addMouseMoveEvent();
    }
    init();
})();