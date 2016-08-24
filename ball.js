/**
 * Created by Administrator on 2016/8/23 0023.
 */
window.ball = window.ball || {};
//闭包的问题，每个JS都要声明全局变量，
//然后在头部的js，因为不会立刻执行，所以定义语句要放在函数内部，不然引用不到,或者放在执行函数里，
//需要执行，需要获得的都放在主函数里
(function () {
    function Createball() {
        this._htmlNode = document.createElement("div");
        this._htmlNode.className = "ball";
        this._pageX = Math.random() * 1000;
        this._htmlNode.style.left = this._pageX + "px";
        this._pageY = Math.random() * 1000;
        this._htmlNode.style.top = this._pageY + "px";
        // this._symbolX = (Math.random() * 2) > 1 ? 1 : -1;
        // this._speedX = Math.random() * 10 * this._symbolX;
        // this._symbolY = (Math.random() * 2) > 1 ? 1 : -1;
        // this._speedY = Math.random() * 10 * this._symbolY;
        this._speedX=10-Math.round(Math.random()*20);
        this._speedY=10-Math.round(Math.random()*20);
        this._endX = this._pageX;
        this._endY = this._pageY;
    }

    Createball.prototype.createSetInter = function () {
        var self = this;
        this._id = setInterval(function () {
            self._endX = self._endX + self._speedX;
            self._absEndX = self._absEndX + Math.abs(self._speedX);
            self._endY = self._endY + self._speedY;
            self._absEndY = self._absEndY + Math.abs(self._speedY);
            if (self._absEndX > 1050 || self._absEndY > 1050) {
                clearInterval(self._id);
            }
            self._htmlNode.style.left = parseInt(self._endX) + "px";
            self._htmlNode.style.top = parseInt(self._endY) + "px";
        }, 10);
    };
    ball.Createball=Createball;
})();
