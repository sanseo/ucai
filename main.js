/**
 * Created by Administrator on 2016/8/23 0023.
 */
//建立小球，首先随机产生小球的数目，然后给小球随机生成一个初始地点，
// 然后给小球在x轴，和y轴上都随机生成一个速度，
window.ball = window.ball || {};
(function () {
    var ball_game = document.getElementById("ball_game");
    var ran_num;
    ran_num = parseInt(Math.random() * 200);
    if (ran_num < 100) {
        ran_num = 100;
    }
    for (var i = 0; i < ran_num; i++) {
        var p = new ball.Createball();
        ball_game.appendChild(p._htmlNode);
        console.log(p);
        p.createSetInter();
    }
})();