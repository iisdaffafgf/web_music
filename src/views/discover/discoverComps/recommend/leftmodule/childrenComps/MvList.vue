<template>
  <div class="mv-list">
    <li class="mv-item" v-for="(item, index) in mvList" :key="item.id * index">
      <div class="img">
        <img :src="item.picUrl" alt="" />
        <div class="play" @click="play(index)">
          <img
            src="~@/assets/img/player/bofang.png"
            alt=""
            v-show="!(currentIndex === index)"
          />
          <img
            src="~@/assets/img/player/zanting.png"
            alt=""
            v-show="currentIndex === index"
          />
        </div>
      </div>
      <p class="mv-name">{{ item.name }}</p>
    </li>
    <div class="player" v-show="!isClose">
      <div class="close">
        <img
          src="~@/assets/img/player/close_light.png"
          alt=""
          @click="closeVideo"
        />
      </div>
      <video
        :src="getUrl"
        class="video-player-box"
        controls
        ref="videoPlayer"
        @play="mvPlay"
      ></video>
    </div>
  </div>
</template>

<script>
import { getRecommendMv, getMvUrl } from "@/network/recommend.js";
export default {
  data() {
    return {
      mvList: [],
      mvUrlList: [],
      currentIndex: -1,
      isClose: true,
    };
  },
  computed: {
    getUrl() {
      if (!this.mvUrlList[this.currentIndex]) {
        return "";
      }
      return this.mvUrlList[this.currentIndex].url;
    },
  },
  methods: {
    play(index) {
      this.currentIndex = index;
      this.isClose = false;
    },
    closeVideo() {
      this.$refs.videoPlayer.pause();
      this.isClose = true;
      this.currentIndex = -1;
    },
    mvPlay() {
      this.$store.commit("playState", false);
    },
  },
  created() {
    getRecommendMv().then((res) => {
      //   console.log(res.data.result);
      this.mvList = res.data.result;
      this.mvList.forEach((item) => {
        getMvUrl(item.id).then((res) => {
          //   console.log(res.data.data);
          this.mvUrlList.push(res.data.data);
        });
      });
    });
  },
};
</script>

<style scoped>
.mv-list {
  display: flex;
  justify-content: space-around;
  padding: 40px 0;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 225px;
  /* border: ; */
}
.img {
  position: relative;
}
.img img {
  width: 140px;
}
.mv-name {
  font-size: 14px;
  width: 140px;
}
.play {
  position: absolute;
  left: 35px;
  top: 4px;
  width: 70px;
  opacity: 0.5;
  cursor: pointer;
}
.play img {
  width: 70px;
}
.player {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.video-player-box {
  width: 600px;
  height: 400px;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
}
.close img {
  width: 30px;
  opacity: 0;
  cursor: pointer;
}
.close img:hover {
  opacity: 1;
}
</style>