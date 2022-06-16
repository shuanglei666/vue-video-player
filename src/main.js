import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import VideoPlayer from 'vue-video-player'
// import 'vue-video-player/src/custom-theme.css'
// import 'video.js/dist/video-js.css'
// Vue.use(VideoPlayer)
// window.videojs = VideoPlayer.videojs
// require('video.js/dist/lang/zh-CN.js')// 全局引入中文提示


// import VideoPlayer from 'vue-video-player'
// window.videojs = VideoPlayer.videojs
// require('vue-video-player/src/custom-theme.css')
// require('video.js/dist/video-js.min.css')
// require('video.js/dist/lang/zh-CN.js')// 全局引入中文提示
// Vue.use(VideoPlayer)


// 下面引入
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)
window.videojs = VideoPlayer.videojs
// 全局引入中文提示
require('video.js/dist/lang/zh-CN.js')
//引入 hls,视频直播(m3u8)必须引入的
import 'videojs-contrib-hls'
//播放rtmp视频
import 'videojs-flash'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
