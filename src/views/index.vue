https://blog.csdn.net/qq_41653151/article/details/112185343
https://blog.csdn.net/weixin_48429986/article/details/120064071
https://blog.csdn.net/m0_46627730/article/details/105755338?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165526121016782395324212%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165526121016782395324212&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-105755338-null-null.142^v16^pc_search_result_control_group,157^v14^control&utm_term=vue-video-player&spm=1018.2226.3001.4187
https://blog.csdn.net/ZYS10000/article/details/121320717?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165527177416782425126106%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165527177416782425126106&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-19-121320717-null-null.142^v16^pc_search_result_control_group,157^v14^control&utm_term=vue-video-player%E6%92%AD%E6%94%BE%E4%BD%8D%E7%BD%AE%E8%AE%BE%E7%BD%AE&spm=1018.2226.3001.4187
播放位置:
(1)https://blog.csdn.net/assgrsryiy12/article/details/108512851?ops_request_misc=&request_id=&biz_id=102&utm_term=vue-video-player%E6%92%AD%E6%94%BE%E4%BD%8D%E7%BD%AE%E8%AE%BE%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-108512851.142^v16^pc_search_result_control_group,157^v14^control&spm=1018.2226.3001.4187
(2)https://www.cnblogs.com/fyjz/p/15523229.html
(3)https://blog.csdn.net/weixin_42269155/article/details/114694694
文档
https://github.surmon.me/vue-video-player/
https://www.npmjs.com/package/vue-video-player
<template>
  <div class="box">
    <div class="course_node_video">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
        @ready="playerReadied" @pause="onPlayerPause($event)" @timeupdate="onPlayerTimeupdate($event)"
        customEventName="customstatechangedeventname" @play="onPlayerPlay" @ended="onPlayerEnded"
        @waiting="onPlayerWaiting" @playing="onPlayerPlaying" @loadeddata="onPlayerLoadeddata"
        @canplay="onPlayerCanplay" @canplaythrough="onPlayerCanplaythrough" @statechanged="playerStateChanged">
      </video-player>
    </div>
  </div>
</template>
 
<script>

export default {
  data () {
    return {
      playerOptions: {
        playbackRates: [0,0.5, 1.0, 1.5, 2.0], // 可选的播放速度
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
      currentTime: 7,         // 秒数设置 单位默认s  进度条位置设置
    }
  },
  methods: {
    /* 获取视频播放进度 进度更新(当前播放位置发生变化时触发)(视频接收到新内容会一直调用)(高频调用)*/
    onPlayerTimeupdate (player) {
      this.currentTime = player.cache_.currentTime
      // console.log(player);
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

/* 底栏控制按钮样式 */

.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: '播放视频';
  font-size: 18px;
  line-height: 3.5;
  letter-spacing: 2px;
  text-align: center;
  overflow: hidden;
  border: 0;
}
.video-js .vjs-fullscreen-control .vjs-icon-placeholder:before,
.vjs-icon-fullscreen-enter:before {
  content: '全屏';
  font-size: 15px;
  line-height: 2.8;
}
.video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before,
.vjs-icon-fullscreen-exit:before {
  content: '退出';
  font-size: 15px;
  line-height: 2.8;
}

.video-js .vjs-play-control .vjs-icon-placeholder:before {
  content: '播放';
  font-size: 15px;
  line-height: 2.8;
}

.video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before {
  content: '暂停';
  font-size: 15px;
  line-height: 2.8;
}

.video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before {
  content: '重播';
  font-size: 15px;
  line-height: 2.8;
}
</style>
