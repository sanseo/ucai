/**
 * Created by Administrator on 2016/8/24 0024.
 */
//用原型返回键，或者返回一些方法，用静态实现对对象的操作，
(function () {
    function Bullet() {
        this.htmlNode = document.createElement("div");
        this.htmlNode.className = "bullet";
        this._speedY = 2;
        this.startY = 350;
    }

    Object.defineProperty(Bullet.prototype,"htmlNode",{
       get :function () {
           return this._htmlNode;
       } ,
        set :function (value) {
          this._htmlNode=value;
        }
    });
    Object.defineProperty(Bullet.prototype,"startY",{
       get:function () {
           return this._startY;
       } ,
        set:function (value) {
            this._startY=value;
            this._htmlNode.style.top=this._startY+"px";
        }
    });
    Bullet._bullets = [];
    Bullet._bullets.removebullet=function (ball) {
       var index= Bullet._bullets.indexOf(ball);
        Bullet._bullets.splice(index ,1);
    };
    Bullet.removebull=function (ball) {
        document.body.removeChild(ball.htmlNode);
        Bullet._bullets.removebullet(ball);
    };
    Bullet.createBall = function () {
        var p = new Bullet();
        document.body.appendChild(p.htmlNode);
        Bullet._bullets.push(p);
    };
    Bullet.prototype.move = function () {
        this.startY=this._startY-this._speedY;
        this.impact();
        if(this.startY<0){
            Bullet.removebull(this);
        }
    };
    Bullet.prototype.impact=function () {
        var score=document.getElementById("score");
        for (var i=0;i<Plane.allplanes.length;i++){
            // console.log("what");
            // console.log(Plane.allplanes[i].x);
            // console.log(this.startY);
            if(this.startY>200&&this.startY<226&&Plane.allplanes[i].x>=206&&Plane.allplanes[i].x<=280){
                Plane.allplanes[i].htmlNode.parentNode.removeChild(Plane.allplanes[i].htmlNode);
                Plane.allplanes.removePlane(Plane.allplanes[i]);
                Bullet.removebull(this);
                Score+=pointer;
                console.log(Score);
                score.innerHTML=Score+"分";
            }
        }
    };
    Bullet.moveAll=function () {
        for (var i = 0; i < Bullet._bullets.length; i++) {
            Bullet._bullets[i].move();
        }
    };
    window.Bullet = Bullet;
})();