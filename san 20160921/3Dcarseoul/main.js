/**
 * Created by Administrator on 2016/9/21 0021.
 */
//要实现一个动态翻转的轮播图，
//先完成基础效果，再想想更好的办法，和更牛逼的办法
//但是做之前还是要思考一下，有没有自己更容易实现的方法
//要是想到了简单的方法，思路却很难，自己不一定会，那还是放一放
(function () {
    //生成旋转体的一个面
    var backgroundAllImage = [];
    //在寸背景的数组里添加所有的照片地址信息
    function addBackgroundImageIndex() {
        for (var i = 0; i < 10; i++) {
            backgroundAllImage[i] = [];
            for (var j = 1; j < 5; j++) {
                backgroundAllImage[i].push("url(image/photo" + j + ".jpg) no-repeat  " + (-i * 78) + "px  " + 0 + "px" + "");
            }
        }
    }

    function createRotateBlockSurface(backgroundImageIndex) {
        var smallSurfaceBlock = document.createElement("div");
        smallSurfaceBlock.className = "rotateBlockSurface";
        console.log(backgroundImageIndex);
        smallSurfaceBlock.style.background = backgroundImageIndex;
        return smallSurfaceBlock;
    }

    //生成一个个小的旋转体
    function createRotateBlock(index) {
        var RotateBlock = document.createElement("div");
        RotateBlock.className = "rotateBlock";
        RotateBlock.style.background = backgroundAllImage[0][0];
        for (var i = 0; i < 4; i++) {
            RotateBlock.appendChild(createRotateBlockSurface(backgroundAllImage[index][i]));
        }
        return RotateBlock;
    }

    //生成整个旋转体
    function createRotateAllBlock() {
        var background = document.getElementById("background");

        for (var i = 0; i < 10; i++) {
            background.appendChild(createRotateBlock(i));
        }
    }

    //增加单个面旋转角度
    function addRotateSurfaceDeg(rotateBlockSuface, i) {
        rotateBlockSuface.style.transform = "rotateX(" + i * 90 + "deg)";
    }

    //添加整个旋转块的旋转角度
    function addRotate(index) {
        var block = document.getElementsByClassName("rotateBlock")[index];
        for (var i = 0; i < 4; i++) {
            addRotateSurfaceDeg(block.childNodes[i], i);
            //    childNodes 和parentNode js里寻找父节点和子节点的方法
        }
    }

    //添加整个旋转块的旋转角度
    function addRotateAllBlockDeg() {
        for (var i = 0; i < 10; i++) {
            addRotate(i);
        }
    }

    //添加按钮事件
        function addButtonEvent() {
        //    css3的动画animation，适合用来制作没有什么后续过程的，也不需要添加特效的，简单的时间效果
        //    如果后续有添加，最好还是用js纯手写，用js控制transition的角度，
        //    不然改起来及其麻烦
        var buttonAll = document.getElementById("buttonALL");
            var button=document.getElementsByClassName("button");
            var k=1;
            for(var i=0;i<4;i++){
                button[i].index=i;
                button[i].onclick=function (e) {
                    k=k+1;
                    document.getElementsByClassName("style1")[0].innerHTML = "@-webkit-keyframes rotate {100%{transform:rotateX("+e.target.index*(90)+"deg)}}";
                    for (var i = 0; i < 10; i++) {
                        var block = document.getElementsByClassName("rotateBlock")[i];
                        //动画如果设置只执行一次，那么无论如何重置keyframes就值执行一次
                        block.style.animation = " rotate 0.5s " +0.1*(i+1)+"s"+k +" forwards";
                        console.log(k);
                        // setTimeout(function (e) {
                        //     for(var k=0;k<10;k++){
                        //         var block = document.getElementsByClassName("rotateBlock")[k];
                        //         block.style.animationIterationCount="0";
                        //     }
                        // },1500);
                        // //buttonRotate 1s 1s 1
                    }
                }
            }
        //    onmouseenter不冒泡的移入事件，也就是他的鼠标移入移出事件只发生在自身，移入他子元素不发生
            //如果是onmouseover则会冒泡
        buttonAll.onmouseenter = function (e) {
            document.getElementsByClassName("style1")[0].innerHTML = "@-webkit-keyframes rotate {100%{transform:rotateX(90deg)}}";
            for (var i = 0; i < 10; i++) {
                var block = document.getElementsByClassName("rotateBlock")[i];
                block.style.animation = " rotate 1s " +0.1*(i+1)+"s 1 forwards";
                // //buttonRotate 1s 1s 1
            }
        };
    }

    //初始化
    function init() {
        addBackgroundImageIndex();
        createRotateAllBlock();
        addRotateAllBlockDeg();
        addButtonEvent();
        console.log(backgroundAllImage);
    }

    init();
//    
})();