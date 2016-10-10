/**
 * Created by Administrator on 2016/10/10 0010.
 */
(function () {
    function init() {
        navigator.mediaDevices.getUserMedia({
                audio:false,video:true
            }
        ).then(function (result) {
            video.srcObject=result;
        }).catch(function (error) {
            console.log(error);
        })
    }
    init();
})();
