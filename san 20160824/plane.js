/**
 * Created by Administrator on 2016/8/24 0024.
 */
//整体思路，这个游戏有三个部分组成，一个是炮台，一个是子弹，一个是飞机
//首先在底部画一个炮台
//在plane里写构造函数，然后在main里执行
//首先要实现子弹的射出。每次空格触发事件，产生一个子弹，从炮台
//第二步实现动态生成飞机，按照白天的思路，动态生成，
//然后添加到页面里去，位置在左右随机一个点，以一定的速度移动进来，
(function () {
    function Plane() {
        this.htmlNode = document.createElement("div");
        this.htmlNode.className = "plane";
        this.setImg();
        this._speed=2;
    }

    Object.defineProperty(Plane.prototype, "htmlNode", {
        get: function () {
            return this._htmlNode;
        },
        set: function (value) {
            this._htmlNode = value;
        }
    });
    Plane.prototype.setImg = function () {
        switch (Math.round(Math.random() * 5)) {
            case 1:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0001.png\")";
                break;
            case 2:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0002.png\")";
                break;
            case 3:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0003.png\")";
                break;
            case 4:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0004.png\")";
                break;
            case 5:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0005.png\")";
                break;
            default:
                this.htmlNode.style.backgroundImage = "url( \"shitmaterial/plane0001.png\")";
                break;
        }
    };
    Object.defineProperty(Plane.prototype,"x",{
        get:function () {
            return this._x;
        },
        set:function (value) {
            this._x=value;
            this.htmlNode.style.left=this._x+"px";
        }
    });
    Plane.allplanes=[];
    Plane.createPlane=function () {
        var background=document.getElementById("background");
        var left_p= new Plane();
        left_p.htmlNode.style.transform="rotateY(-180deg)";
        left_p.x=-69-(Math.random()*50);
        left_p._dire="right";
        background.appendChild(left_p.htmlNode);
        Plane.allplanes.push(left_p);
        var right_p=new Plane();
        right_p.x=550+(Math.random()*50);
        right_p._dire="left";
        background.appendChild(right_p.htmlNode);
        Plane.allplanes.push(right_p);
    };
    Plane.prototype.move=function () {
        if (this._dire=="right"){
            this.x=this.x+this._speed;
            if (this.x>550){
                Plane.remove(this);
            }
        }
        if (this._dire=="left"){
             this.x=this.x-this._speed;
            if (this.x<-69){
                Plane.remove(this);
            }
        }
    };
    Plane.remove=function (plane) {
           plane.htmlNode.parentNode.removeChild(plane.htmlNode);
          Plane.allplanes.removePlane(plane);
    };
    Plane.allplanes.removePlane=function (plane) {
          var index =Plane.allplanes.indexOf(plane);
          Plane.allplanes.splice(index,1);
    };
    Plane.moveAllPlane=function () {
        for (var i=0;i<Plane.allplanes.length;i++){
            Plane.allplanes[i].move(i);
        }
    };
    window.Plane = Plane;
})();