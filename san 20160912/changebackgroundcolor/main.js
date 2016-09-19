/**
 * Created by Administrator on 2016/9/12 0012.
 */
//你老是对自己有很高的要求，然后每次会在一点小错误上纠缠很久，总想着一下做很大的
//然后质疑自己的能力，
//你不是没有能力，只是能力没有你想的那么强
//然后每次有点成绩，就想着更高的追求，然后跌的很惨很惨，什么都做不出来
//有了一定实力，应该想的是先把实力保住，自己没有聪明那种可怕的地步，可以刚理解一个，就去做更高的追求
//搞懂了什么东西，先想着保住，先用那个做一定量的东西出来，再考虑更高的
(function () {
    var background_R = 0, background_G = 0, background_B = 0;
    var allColor = ["range_R", "range_G", "range_B"];
    var allColorNum = ["rnum", "gnum", "bnum"];
    var allRgbColor = [background_R, background_G, background_B];

    function getCode(name) {
        //getelementbyClass获得的是整个为整个类名的数组，里面的一个个下标才为对应的节点信息
        //要尝试对节点操作，要加上下标，就算只有一个节点，他也会生成一个数组
        return document.getElementsByClassName(name)[0];
    }

    function getCodeValue(name) {
        var Code = getCode(name);
        return Code.value;
    }

    //要绑定的是oninput事件，当value值更改的时候触发,所以不能有参数传入
    //触发事件只能有e一个参数
    //以形参方式传入的全局变量，更改了之后不会对外部有影响，形参传入就只是一个局部变量了
    function addLIstener(color, num ) {
        var range_G = getCodeValue("range_G");
        getCode(num).innerHTML = color+": " + getCodeValue(color);
        var rgbcolor = getCodeValue(color);
        backgroundRGB();
        return rgbcolor;
    }
    function addALLlistener() {
        // getCode(allColor[i]).oninput=
        getCode(allColor[0]).addEventListener("input",function () {
            background_R=addLIstener(allColor[0],allColorNum[0]);
        });
        getCode(allColor[1]).addEventListener("input",function () {
            background_G=addLIstener(allColor[1],allColorNum[1]);
        });
        getCode(allColor[2]).addEventListener("input",function () {
            background_B=addLIstener(allColor[2],allColorNum[2]);
        });
    }

    function backgroundRGB() {
        document.body.style.backgroundColor = "rgb(" + background_R + "," + background_G + "," + background_B + ")";
    }
    function init() {
        addALLlistener();
    }
    init();
})();