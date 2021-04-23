// 天气查询
var weather = new Vue({
    el:"#weather",
    data:{
        result:[],
        cityList:["北京","上海","广州","深圳"]
    },
    methods: {
        enterGet:function(){
            var that = this;
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+that.city).then(
                function(response){
                    console.log(response)
                    that.result=response.data.data
                },function(error){
                    console.log(error)
                }
            )
        },
        clickGet:function(city){
            this.city=city;
            this.enterGet();
        }

    }
});

/**
 * 歌曲搜索接口
 * 请求地址：https://autumnfish.cn/search
 * 请求方式：get
 * 请求参数：keywords（查询关键字）
 * 相应内容：歌曲搜索结果
 */
/**
 * 播放音乐
 * 请求地址：https://autumnfish.cn/song/url
 * 请求方式：get
 * 请求参赛：id(查询关键字)
 * 响应内容：歌曲url地址
 */
/**
 * 歌曲详情获取
 * 请求地址：https://autumnfish.cn/song/detail
 * 请求方式：get
 * 请求参数：ids
 * 相应内容：
 */
var music = new Vue({
    el:"#music",
    data:{
        keywords : "",
        musicUrl:"",
        imageUrl:"",
        resultList:[],
        commentList:[],
        mvUrl:"",
        isShow:false
    },
    methods: {
        serachMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+that.keywords).then(
                function(response){
                    console.log(response)
                    that.resultList = response.data.result.songs
                },function(error){
                    console.log(error)
                }
            )
        },
        playSong:function(songId){
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+songId).then(
                function(response){
                    console.log(response)
                    that.musicUrl=response.data.data[0].url;
                },function(error){
                    console.log(error)
                }
            ),
            axios.get("https://autumnfish.cn/song/detail?ids="+songId).then(
                function(response){
                    console.log(response)
                    that.imageUrl=response.data.songs[0].al.picUrl;
                },function(error){
                    console.log(error)
                }
            ),
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+songId).then(
                function(response){
                    console.log(response)
                    that.commentList=response.data.hotComments;
                },function(error){
                    console.log(error)
                }
            )
            
        },
        play:function(){
            console.log("play");
        },
        pause:function(){
            console.log("pause");
        },
        playMV:function(mvId){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId).then(
                function(response){
                    console.log(response)
                    that.mvUrl=response.data.data.url;
                    that.isShow=true;
                },function(error){
                    console.log(error)
                }
            )
        },
        hide:function(){
            isShow=false
        }
    }
})
