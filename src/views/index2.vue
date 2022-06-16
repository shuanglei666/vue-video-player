<template>
  <div class="course_node_video">
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
      @ready="playerReadied" @pause="onPlayerPause($event)" @timeupdate="onPlayerTimeupdate($event)">
    </video-player>
  </div>
</template>
 
<script>

export default {
  data () {
    return {
      playerOptions: {
        // 可选的播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        // 如果为true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 是否视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        // 语言设置
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [{
          // 视频类型
          type: "video/mp4",
          // 视频地址
          src: 'https://qkodo.playlistmusic.com.cn/transcode_1080/video/2dd0dd6bb83b71d16c6313d0411d26aa.mp4'
        }],
        // 视频地址
        poster: '',
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        //底栏控制器
        controlBar: {
          // 当前时间和持续时间的分隔符
          timeDivider: true,
          // 显示持续时间
          durationDisplay: true,
          // 是否显示剩余时间功能
          remainingTimeDisplay: false,
          // 是否显示全屏按钮
          fullscreenToggle: true
        }
      },
      currentTime: 7,         // 秒数设置 单位默认s
    }
  },
  methods: {
    /* 获取视频播放进度 */
    onPlayerTimeupdate (player) {
      this.currentTime = player.cache_.currentTime
    },
    /* 设置视频开始的进度 */
    playerReadied (player) {
      player.currentTime(this.currentTime)
    },
    // 暂停回调   将视频播放的时间保存
    onPlayerPause (player) {
      console.log('player pause currentTime!', player.cache_.currentTime);
      // let that = this;
      //   存储player.currentTime 是当前暂停时间    用于下次断续播放
    },
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
 
<style scoped>
.course_node_video {
  width: 100%;
  height: auto;
  margin: 0 auto;
  text-align: center;
}

/* 是否设置禁止进度条被拖动样式 */
/* .course_node_video >>> .vjs-progress-control {
  pointer-events: none;
} */
</style>
