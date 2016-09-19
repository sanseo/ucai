/**
 * Created by Administrator on 2016/9/18 0018.
 */
(function () {
    var game = {
        data: null,
        RN: 4,
        CN: 4,
        state: 0,
        RUNNING: 1,
        GAMEOVER: 0,
        score: 0,
        start: function () {
            this.state = this.RUNNING;//设置游戏状态
            //初始化
            this.data = [];
            for (var row = 0; row < this.RN; row++) {
                this.data[row] = [];
                for (var col = 0; col < this.CN; col++) {
                    this.data[row][col] = 0;
                }
            }
            //产生一个随机数
            this.randomNum();
            //刷新页面
            this.updataView();
            this.score = 0;
            //    产生一个随机数
            window.onkeydown=function (e) {
                //在建立事件的时候，特别要考虑作用域的问题，
                //函数的作用域，变量的作用域，还有当时具体的变量到底是哪个
                if(e.code=="ArrowLeft"){
                    game.moveLeft();
                }
                if (e.code=="ArrowRight"){
                    game.moveRight();
                }
                if (e.code=="ArrowUp"){
                    game.moveTop();
                }
                if (e.code=="ArrowDown"){
                    game.moveBottom();
                }
            }
        },
        randomNum: function () {
            if (!this.isfull()) {
                while (true) {
                    var row = parseInt(Math.random() * (this.RN));
                    var col = parseInt(Math.random() * (this.CN));
                    if (this.data[row][col] == 0) {
                        this.data[row][col] = Math.random() > 0.9 ? 4 : 2;
                        break;
                    }
                }
            }
        },
        //这个考虑的是，是否有空位存在
        isfull: function () {
            for (var row = 0; row < this.RN; row++) {
                for (var col = 0; col < this.CN; col++) {
                    if (this.data[row][col] == 0) {
                        return false;
                    }
                }
            }
            return true;
        },
        updataView: function () {
            for (var row = 0; row < this.RN; row++) {
                for (var col = 0; col < this.CN; col++) {
                    var num = document.getElementById("c" + row + col);
                    if (this.data[row][col] != 0) {
                        num.innerHTML = this.data[row][col];
                        num.className = "cell n" + this.data[row][col];
                    }
                    else {
                        num.className="cell";
                        num.innerHTML = "";
                    }
                }
            }
        },
        isGAMEOVER: function () {
            if (this.isfull()) {
                for (var row = 0; row < this.RN; row++) {
                    for (var col = 0; col < this.CN; col++) {
                        if (this.data[row][col] == this.data[row][col + 1]) {
                            return false;
                        } else if (this.data[row][col] == this.data[row + 1][col]) {
                            return false;
                        }
                    }
                }
                this.state = this.GAMEOVER;
                return true;
            } else {
                return false;
            }
        },
        //向左移动的函数，当我触发向向左移动的事件的时候
        //触发这个函数，
        moveLeft: function () {
            var beforeString = this.data.toString();
            for (var row = 0; row < this.RN; row++) {
                for (var col = 0; col < this.CN; col++) {
                    this.nextRightNum(row, col);
                }
            }
            var afterString = this.data.toString();
            if (beforeString != afterString) {
                this.randomNum();
                this.isGAMEOVER();
                this.updataView();
            }
        },
        moveRight:function () {
            var beforeString=this.data.toString();
            for(var row=0;row<this.RN;row++){
                for (var col=3;col>=0;col--){
                    this.nextLeftNum(row,col);
                }
            }
            var afterString=this.data.toString();
            if(beforeString!=afterString){
                this.randomNum();
                this.isGAMEOVER();
                this.updataView();
            }
        },
        moveBottom:function () {
            var beforeString=this.data.toString();
            for(var col=0;col<this.CN;col++){
                for (var row=3;row>=0;row--){
                    this.nextTopNum(row,col);
                }
            }
            var afterString=this.data.toString();
            if(beforeString!=afterString){
                this.randomNum();
                this.isGAMEOVER();
                this.updataView();
            }
        },
        moveTop:function () {
            var beforeString=this.data.toString();
            for(var col=0;col<this.CN;col++){
                for (var row=0;row<this.RN;row++){
                    this.nextBottomNum(row,col);
                    console.log("111");
                }
            }
            var afterString=this.data.toString();
            if(beforeString!=afterString){
                this.randomNum();
                this.isGAMEOVER();
                this.updataView();
            }
        },
        nextRightNum: function (r, c) {
            for (var next = c + 1; next < this.RN; next++) {
                //这里有个基准块，就是我moveleft循环里的
                //我确定以这个为基准，然后向右循环
                //找到不为空的位置，跟我这个比较，如果我这个为空，
                //那么让他们俩换位置，
                //先进行合并再进行移动
                if (this.data[r][next] != 0) {
                    if (this.data[r][c] == this.data[r][next]) {
                        this.data[r][c] *= 2;
                        this.data[r][next] = 0;
                        this.score += this.data[r][c];
                    } else if (this.data[r][c] == 0) {
                        this.data[r][c]=this.data[r][next];
                        this.data[r][next]=0;
                    }else {
                        break;
                    }
                }
            }
        },
        nextLeftNum: function (r, c) {
            for (var next = c -1; next >=0; next--) {
                if (this.data[r][next] != 0) {
                    if (this.data[r][c] == this.data[r][next]) {
                        this.data[r][c] *= 2;
                        this.data[r][next] = 0;
                        this.score += this.data[r][c];
                    } else if (this.data[r][c] == 0) {
                        this.data[r][c]=this.data[r][next];
                        this.data[r][next]=0;
                    }else {
                        break;
                    }
                }
            }
        },
        nextBottomNum: function (r, c) {
            for (var next = r+1; next <this.RN; next++) {
                if (this.data[next][c] != 0) {
                    if (this.data[r][c] == this.data[next][c]) {
                        this.data[r][c] *= 2;
                        this.data[next][c] = 0;
                        this.score += this.data[r][c];
                    } else if (this.data[r][c] == 0) {
                        this.data[r][c]=this.data[next][c];
                        this.data[next][c]=0;
                    }else {
                        break;
                    }
                }
            }
        },
        nextTopNum: function (r, c) {
            for (var next = r -1; next >=0; next--) {
                if (this.data[next][c] != 0) {
                    if (this.data[r][c] == this.data[next][c]) {
                        this.data[r][c] *= 2;
                        this.data[next][c] = 0;
                        this.score += this.data[r][c];
                    } else if (this.data[r][c] == 0) {
                        this.data[r][c]=this.data[next][c];
                        this.data[next][c]=0;
                    }else {
                        break;
                    }
                }
            }
        }
    };
    game.start();
})();