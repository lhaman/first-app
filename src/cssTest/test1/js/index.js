var app = new Vue({
    el:"#app",
    data:{
        phoneNum:"",
        content:"获取验证码",
        verifyNum:"",
        isShow:true,
        MAX_TIME:10
    },
    methods: {
        loginAction:function(){
            alert(this.phoneNum+"----登陆");
            var that=this;
            axios.get("http://localhost:8080/login/userLogin?phoneNum="+that.phoneNum+"&verify="+that.verifyNum).then(
                function(response){
                    console.log(response)
                },function(error){
                    console.log(error)
                }
            )
        },
        getVerify:function(){
            var that=this;
            axios.get("http://localhost:8080/login/sendVerify?phoneNum="+this.phoneNum).then(
                function(response){
                    var count_time=that.MAX_TIME;
                    var timers = window.setInterval(()=>{
                        that.isShow=false;
                        if(count_time>=0 && count_time<=that.MAX_TIME){
                            that.content="已发送("+count_time+"s)";
                            count_time--;
                        }else{
                            that.isShow=true;
                            count_time=that.MAX_TIME;
                            that.content="重新发送";
                            window.clearInterval(timers);
                        }
                    },1000);
                },function(error){
                    console.log(error)
                }
            )
            
        }
    }
})