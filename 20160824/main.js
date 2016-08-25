/**
 * Created by Administrator on 2016/8/24 0024.
 */
(function () {
    var Score=0;
    var pointer=100;
    var background = document.getElementById("background");
    document.onkeydown = function (event) {
        var currKey = event.keyCode;
        if (currKey == 32) {
            Bullet.createBall();
        }
    };
    setInterval(function () {
            Bullet.moveAll();
            Plane.moveAllPlane();
        },10
    );
    setInterval(function () {
        Plane.createPlane();
    }, 5000);
    window.Score=Score;
    window.pointer=pointer;
})();