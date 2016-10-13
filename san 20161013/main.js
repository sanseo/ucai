/**
 * Created by Administrator on 2016/10/12 0012.
 */
(function () {
    var container=document.querySelector("#container");
    var musicArray={},reader;
    var audio=document.querySelector("#audio");
    container.addEventListener("dragover",function (e) {
        e.preventDefault();
    });
    container.addEventListener("drop",function (e) {
        e.preventDefault();
        var files=e.dataTransfer.files;
        if(files&&files.length){
            for(var i=0;i<files.length;i++){
                var file=files[i];
                if(file.type="audio/mp3"){
                    reader=new FileReader();
                    //一些事件的，延时器的，还有onload的内容
                    //如果要对对他们进行操作
                    //因为他们的延迟发生，发生的时候的内容说不定已经改变
                    //所以最好用闭包来进行
                    (function (name,reader) {
                        reader.onload=function () {
                            musicArray[name]=reader.result;
                            audio.src=reader.result;
                        };
                    })(file.name,reader);
                    console.log(musicArray);
                    reader.readAsDataURL(file);
                    var mp3Div=new CreateMp3Div(file.name);
                }
            }
        }
    });
    function CreateMp3Div(name) {
       this.musicMode=document.createElement("div");
        this.musicMode.className="musicMode";
        container.appendChild(this.musicMode);
        this.musicMode.innerHTML=name;
        this.musicMode.onclick=function (e) {
            audio.src=musicArray[e.target.innerHTML];
        };
        return this.musicMode;
    }
})();