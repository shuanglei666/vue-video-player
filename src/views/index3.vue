<template>
  <div class="box">
    <div class="course_node_video">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
        @ready="playerReadied" @pause="onPlayerPause($event)" @timeupdate="onPlayerTimeupdate($event)"
        customEventName="customstatechangedeventname" @play="onPlayerPlay" @ended="onPlayerEnded"
        @waiting="onPlayerWaiting" @playing="onPlayerPlaying" @loadeddata="onPlayerLoadeddata"
        @canplay="onPlayerCanplay" @canplaythrough="onPlayerCanplaythrough" @statechanged="playerStateChanged">
      </video-player>
      <div class="footer">
        <div class="list" @click="videoPlay">播放</div>
        <div class="list" @click="videoPause">停止</div>
        <div class="list" @click="videoPosition">播放位置</div>
        <div class="list" @click="videoDoubleSpeed">倍速</div>
        <div class="list" @click="videoMute">静音</div>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  data () {
    return {
      playerOptions: {
        playbackRates: [0, 0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',  // zh-CN  需要main.js全局引入才可以生效
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: 'https://qkodo.playlistmusic.com.cn/transcode_1080/video/2dd0dd6bb83b71d16c6313d0411d26aa.mp4' // url地址https://qkodo.playlistmusic.com.cn/transcode_1080/video/2dd0dd6bb83b71d16c6313d0411d26aa.mp4
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          // 当前时间和持续时间的分隔符
          timeDivider: true,
          // 显示持续时间
          durationDisplay: true,
          // 是否显示剩余时间功能
          remainingTimeDisplay: false,
          // 是否显示全屏按钮
          fullscreenToggle: true,
          //播放暂停按钮
          playToggle: true,
          //音量控制
          volumeMenuButton: false,
          //当前播放时间
          currentTimeDisplay: true,
          //点播流时，播放进度条，seek控制
          progressControl: true,
          //直播流时，显示LIVE
          liveDisplay: true,
          //播放速率，当前只有html5模式下才支持设置播放速率
          playbackRateMenuButton: true,
        }
      },
      // currentTime: 7,         // 秒数设置 单位默认s                                        进度条位置设置 ,  进入页面直接开始位置一一一一一一
      playtimes: 7,             //  通过点击videoPosition事件改变视频位置二二二二二
    }
  },
  mounted () {
  },
  methods: {
    // 视频播放
    videoPlay () {
      // this.player.play();
      // this.playerOptions.controlBar.playToggle = false;
      this.$refs.videoPlayer.player.play();
    },
    // 视频暂停
    videoPause () {
      this.$refs.videoPlayer.player.pause();
    },
    // 视频位置
    videoPosition () {            //  通过点击videoPosition事件改变视频位置二二二二二
      this.$refs.videoPlayer.player.currentTime(this.playtimes)
    },
    // 视频倍速
    videoDoubleSpeed () {
      this.$refs.videoPlayer.player.playbackRate(2);
      // var button = document.getElementsByTagName('vjs-playback-rate')
      // button.addEventListener('change', function () {前端vue项目中使用SVG图标基础模板
      //   this.$refs.videoPlayer.player.playbackRate = this.playerOptions.playbackRates;
      // });

      // this.$refs.videoPlayer.player.ready(function () {
      //   const num = Math.round(Math.random()*5+5);
      //   // 定义一个随机常数倍数
      //   var _this = this
      //   //速率
      //   setTimeout(function () {
      //     // _this.playbackRate(parseFloat(10));
      //     _this.playbackRate(parseFloat(num)); 
      //   }, 20);
      // });

      // if (this.$refs.videoPlayer) {
      //   this.$refs.videoPlayer.player.playbackRate(2);
      // }

      // console.log(this.playerOptions.playbackRates[0], 'eventsevents');

      // if (this.playerOptions.playbackRates[0]) {
      //   this.$refs.videoPlayer.player.playbackRate(0)
      //   console.log('0');
      // } else if (this.playerOptions.playbackRates[1]) {
      //   this.$refs.videoPlayer.player.playbackRate(0.5)
      //   console.log('0.5');
      // } else if (this.playerOptions.playbackRates[2]) {
      //   this.$refs.videoPlayer.player.playbackRate(1.0)
      //   console.log('1');
      // } else if (this.playerOptions.playbackRates[3]) {
      //   this.$refs.videoPlayer.player.playbackRate(1.5)
      //   console.log('1.5');
      // } else {
      //   this.$refs.videoPlayer.player.playbackRate(2.0)
      //   console.log('2');
      // }

      // switch (this.$refs.videoPlayer) {
      //   case this.playerOptions.playbackRates[0]:
      //     this.$refs.videoPlayer.player.playbackRate(0);
      //     console.log('0');
      //     break
      //   case this.playerOptions.playbackRates[1]:
      //     this.$refs.videoPlayer.player.playbackRate(0.5);
      //     console.log('0.5');
      //     break
      //   case this.playerOptions.playbackRates[2]:
      //     this.$refs.videoPlayer.player.playbackRate(1.0);
      //     console.log('1.0');
      //     break
      //   case this.playerOptions.playbackRates[3]:
      //     this.$refs.videoPlayer.player.playbackRate(1.5);
      //     console.log('1.5');
      //     break
      //   default:
      //     this.$refs.videoPlayer.player.playbackRate(2.0);
      //     console.log('2.0');
      //     break
      // }
      // var 
      // for()
    },
    // 视频静音
    videoMute () {
      this.$refs.videoPlayer.player.muted(true);
    },
    //获取视频播放进度 进度更新(当前播放位置发生变化时触发)(视频接收到新内容会一直调用)(高频调用)
    onPlayerTimeupdate (player) {
      //   this.currentTime = player.cache_.currentTime                                           进度条位置设置 ,  进入页面直接开始位置一一一一一一
      console.log(player);
    },
    /* 设置视频开始的进度 准备就绪(预加载前会调用)(初始化调用) */
    playerReadied (player) {
      player.currentTime(this.currentTime)
    },
    // 暂停回调   将视频播放的时间保存  暂停回调(暂停时调用)(用户操作调用)
    onPlayerPause (player) {
      console.log('player pause currentTime!', player.cache_.currentTime);
      // let that = this;
      //   存储player.currentTime 是当前暂停时间    用于下次断续播放
    },

    // 播放回调(播放时会调用)(用户操作调用)
    onPlayerPlay (player) {
      console.log('播放', player)
      this.$emit('onPlayerPlay', player)
    },
    // 播放状态改变回调
    playerStateChanged (playerCurrentState) {
      console.log('数据变化', playerCurrentState)
      this.$emit('playerStateChanged', playerCurrentState)
    },
    //视频播完回调 (结束)(视频播放完毕调用)
    onPlayerEnded (player) {
      console.log('结束', player)
      this.$emit('onPlayerEnded', player)
    },
    // 等待(视频中出现loading就会调用,加载时调用)(高频调用)
    onPlayerWaiting (player) {
      console.log('等待', player)
      this.$emit('onPlayerWaiting', player)
    },
    // 播放中(进入播放状态会调用)(等待onPlayerWaiting和播放onPlayerPlay执行后会调用)(高频调用)
    onPlayerPlaying (player) {
      console.log('播放中', player)
      this.$emit('onPlayerPlaying', player)
    },
    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata (player) {
      console.log('预加载', player)
      this.$emit('onPlayerLoadeddata', player)
    },
    // 媒体的readyState为HAVE_FUTURE_DATA或更高(预加载onPlayerLoadeddata调用后会调用)(初始化调用)
    onPlayerCanplay (player) {
      console.log('是否播放', player)
      this.$emit('onPlayerCanplay', player)
    },
    // 能够从头到尾播放(是否播放onPlayerCanplay调用后会调用)(初始化调用)这意味着可以在不缓冲的情况下播放整个媒体文件
    onPlayerCanplaythrough (player) {
      console.log('能够从头到尾播放', player)
      this.$emit('onPlayerCanplaythrough', player)
    }
  },
  beforeMount () {
    // let id = this.$route.query.id;
    // if (id != undefined && id != null) {
    //   //编辑
    //   localStorage.setItem("videoId", id);
    //   // this.loadCourseNodeVideo(id);
    // } else {
    //   id = localStorage.getItem("videoId");
    //   if (id != undefined && id != null) {
    //     // this.loadCourseNodeVideo(id);
    //   } else {
    //     localStorage.removeItem("videoId");
    //   }
    // }
  }
}
</script>
 
<style>
.box {
  width: 50%;
  margin: 100px auto;
}
/* 重置样式也需要全局挂载 */
* {
  margin: 0;
  padding: 0;
}
.course_node_video {
  width: 100%;
  height: auto;
  margin: 0 auto;
  text-align: center;
  /* object-fit:fill; */
}

/* 是否禁止拖动进度条 */
/* .course_node_video >>> .vjs-progress-control {
  pointer-events: none;
} */

/* 这里深度选择器这种生效,需要去掉style标签里面的scoped才可以生效使用,才可以铺满屏幕 */
::v-deep video {
  width: 100% !important;
  /* 我的容器高度设置的是100vh-95px，你们根据你们容器高度设置视频高度即可 */
  height: calc(100vh - 95px) !important;
  /* 消除两边留白 */
  object-fit: fill;
}

.footer {
  width: 100%;
  height: 50px;
  /* border: 1px solid red; */
  /* background-color: rgb(67,77,71); */
  flex-direction: row;
  display: flex;
  justify-content: space-between;
}
.footer .list {
  width: 15%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.1); */
  border-radius: 5px;
  background-color: rgb(67, 77, 71);
  border: 1px solid rgb(224, 208, 208);
  color: #fff;
  line-height: 2.8;
}

/* .list:active {
  width: 15%;
  height: 100%;
  color: white;
  border-radius: 5px;
  background: #4a9bfa;
  opacity: 0.5;
} */
</style>
