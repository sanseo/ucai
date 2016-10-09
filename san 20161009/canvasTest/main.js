/**
 * Created by Administrator on 2016/10/8 0008.
 */
(function () {
    var myCanvas=document.getElementById("myCanvas");
    var pen=myCanvas.getContext("2d");
    var BLOCK_WIDTH=200,BLOCK_HEIGHT=100;
    var personBlock,pigBlock;
    function CreateBlock(width,height) {
        this._width=width;
        this._height=height;
    }
    var cp=CreateBlock.prototype;
    Object.defineProperties(cp,{
       x:{
           set:function (value) {
               this._x=value;
           },
           get:function () {
               return this._x;
           }
       },
        y:{
            set:function (value) {
                this._y=value;
            },
            get:function () {
                return this._y;
            }
        },
        color:{
            set:function (value) {
                this._color=value;
            },
            get:function () {
                return this._color;
            }
        },
        width:{
            set:function (value) {
                this._width=value;
            },
            get:function () {
                return this._width;
            }
        },
        height:{
            set:function (value) {
                this._height=value;
            },
            get:function () {
                return this._height;
            }
        }
    });
    cp.gender=function (){
        pen.save();
        pen.beginPath();
        pen.fillStyle=this.color;
        pen.fillRect(this.x,this.y,this.width,this.height);
        pen.closePath();
        pen.restore();
    };
     cp.addFont=function(text) {
        pen.save();
        pen.font="40px Arial";
        pen.fillStyle="#fff";
        pen.fillText(text,this.x,this.y+50);
         pen.restore();
    };
    function init() {
        personBlock=new CreateBlock(BLOCK_WIDTH,BLOCK_HEIGHT);
        personBlock.x=100;
        personBlock.y=50;
        personBlock.color="green";
        personBlock.gender();
        personBlock.addFont("你是人");
        pigBlock=new CreateBlock(BLOCK_WIDTH,BLOCK_HEIGHT);
        pigBlock.x=400;
        pigBlock.y=50;
        pigBlock.color="red";
        pigBlock.gender();
        pigBlock.addFont("你是猪");
        addEvent();
    }
    function clearBlock(block) {
        pen.clearRect(block.x-1,block.y-1,block.width+2,block.height+2);
    }
    function blockScape(e) {
        if (e.layerX>personBlock.x&&e.layerY>personBlock.y&&e.layerX<personBlock.x+personBlock.width&&e.layerY<personBlock.y+personBlock.height){
            clearBlock(personBlock);
            do {
                personBlock.x=Math.random()*1000;
                personBlock.y=Math.random()*1000;
            }while ((personBlock.x+personBlock.width)<pigBlock.x&&personBlock.x>(pigBlock.x+pigBlock.width)&&(personBlock.y+personBlock.height)<pigBlock.y&&personBlock.y>(pigBlock.y+pigBlock.height));
            personBlock.gender();
            personBlock.addFont("你是人");
        }
    //    当鼠标移入的时候，先是擦除方块当前的位置，然后随机生成一个新的位置
    }
    function addEvent() {
        myCanvas.addEventListener("mousemove",blockScape);
    }
    init();
})();