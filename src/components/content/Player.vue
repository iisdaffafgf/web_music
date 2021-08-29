<template>
  <div
    class="player"
    @mouseover="playerMouseenter"
    @mouseout="playerMouseleave"
    ref="allPlayer"
  >
    <div class="handle"></div>
    <div class="main">
      <div class="controls">
        <img
          src="~@/assets/img/player/shangyishou.png"
          class="prev"
          @click="prev"
          alt="上一首"
          title="上一首"
        />
        <div class="state" @click="toggState">
          <!-- 暂停状态 -->
          <img
            src="~@/assets/img/player/bofang.png"
            alt="播放"
            title="播放/暂停(p)"
            v-show="!$store.state.isPlay"
          />
          <!-- 播放状态 -->
          <img
            src="~@/assets/img/player/zanting.png"
            alt="暂停"
            title="播放/暂停(p)"
            v-show="$store.state.isPlay"
          />
        </div>
        <img
          src="~@/assets/img/player/xiayishou.png"
          class="next"
          @click="next"
          alt="下一首"
          title="下一首"
        />
      </div>
      <div class="progress" v-if="songsList.length">
        <div class="pic">
          <img :src="getPicUrl" alt="歌曲封面" />
        </div>
        <div class="name-artist">
          <div class="name">
            <span class="song-name">{{ getName }}</span>
            <span
              class="artist-name"
              v-for="item in getArtist"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
          <div class="time-show" @click="jumpPlay">
            <div
              class="time-go"
              :class="{ playtime: $store.state.isPlay || played }"
              ref="showTime"
            ></div>
          </div>
        </div>
        <div class="time-all">
          {{ getTime }}
        </div>
      </div>
      <div v-else class="no-songs">暂未选择歌单</div>
      <div class="others">
        <div class="online-operation">
          <img
            src="~@/assets/img/player/shoucang.png"
            alt="收藏"
            title="收藏"
          />
          <img
            src="~@/assets/img/player/fenxiang01.png"
            alt="分享"
            title="分享"
          />
        </div>
        <div class="set-play">
          <div class="vol">
            <div class="vol-control" v-show="volOpacity">
              <div class="all-vol" @click="volSet">
                <div class="now-vol" ref="showVol"></div>
              </div>
            </div>
            <img
              src="~@/assets/img/player/V.png"
              alt="音量"
              title="音量"
              @click="openVol"
            />
          </div>
          <img
            src="~@/assets/img/player/suiji.png"
            alt="列表随机播放"
            title="列表随机播放"
          />
          <div class="list">
            <div class="img-tip" @click="openList">
              <img
                src="~@/assets/img/player/bofangliebiao.png"
                alt="播放列表"
                title="播放列表"
              />
              <span class="little-list">{{ songsList.length }}</span>
            </div>
            <ul class="songs-list" v-show="listShow">
              <title>播放列表({{ songsList.length }})</title>
              <li
                v-for="(item, index) in songsList"
                :key="item.id"
                @click="changeSong(index)"
                :class="{ playnow: currentIndex === index }"
              >
                <p class="list-item-name">{{ item.al.name }}</p>
                <p class="list-item-artist">
                  <span
                    class="list-item-artist"
                    v-for="artist in item.ar"
                    :key="artist.name"
                  >
                    {{ artist.name }}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="lock" @click="lockState" title="锁定/解锁(P)">
        <img src="~@/assets/img/player/suoding.png" alt="" v-show="!lock" />
        <img src="~@/assets/img/player/jiesuo.png" alt="" v-show="lock" />
      </div>
    </div>
    <audio
      v-if="songs.length"
      :src="currentIndexSongUrl"
      id="play"
      ref="player"
      controls
      @timeupdate="getCurrentTime"
      @ended="autoNext"
      preload="auto"
      @canplay="canPlay"
      autoplay
    ></audio>
  </div>
</template>

<script>
// import { getPlayList, getSongUrl } from "@/network/recommend.js";
// import { nextTick } from "vue/types/umd";
export default {
  name: "Player",
  data() {
    return {
      songsList: [],
      songs: [],
      playTime: 0,
      allTime: 0,
      currentIndex: 0,
      volOpacity: false,
      listShow: false,
      canPlayNow: false,
      player: null,
      lock: true,
    };
  },
  props: {},
  computed: {
    // 获取歌曲封面url地址
    getPicUrl() {
      return this.songsList[this.currentIndex].al.picUrl;
    },
    // 获取歌名
    getName() {
      return this.songsList[this.currentIndex].al.name;
    },
    // 获取歌手
    getArtist() {
      return this.songsList[this.currentIndex].ar;
    },
    // 获取歌曲倒计时
    getTime() {
      const allTime = this.allTime;
      const time = allTime - this.playTime;
      const minTime = (time / 1000 - ((time / 1000) % 60)) / 60;
      let secTime = parseInt((time / 1000) % 60);
      if (secTime < 10) {
        secTime = "0" + secTime;
      }
      if (minTime < 10) {
        return "0" + minTime + ":" + secTime;
      }
      return minTime + ":" + secTime;
    },
    // 当前歌曲是否播放状态
    played() {
      return this.songsList[this.currentIndex].dt > this.playTime;
    },
    // 返回vuex中是否播放的标记,方便watch监听
    isPlay() {
      return this.$store.state.isPlay;
    },
    // 返回当前播放歌曲的url
    currentIndexSongUrl() {
      return this.songs[this.currentIndex].url;
    },
  },
  watch: {
    // watch监听vuex中的isPlay变化,绑定到音乐播放/暂停
    isPlay: function () {
      if (this.isPlay) {
        this.player.play();
        // console.log("播放");
      } else {
        this.player.pause();
        // console.log("暂停");
      }
    },
    // 监听当前播放到了什么时间,控制进度条变化
    getTime: function () {
      this.$refs.showTime.style.width =
        (this.playTime / this.allTime) * 500 + "px";
    },
    canPlayNow: function (val) {
      if (val) {
        this.player = this.$refs.player;
        this.player.play();
        this.$store.commit("playState", true);
        this.allTime = this.player.duration;
        this.playTime = 0;
      }
    },
  },
  methods: {
    // 切换播放/暂停
    toggState() {
      if (!this.$store.state.isPlay) {
        // 播放
        this.$store.commit("playState", true);
      } else {
        // 暂停
        this.$store.commit("playState", false);
      }
      // console.log(this.songsList);
      // songUrl:item.al.name/ songArtist:item.ar[every].name/ songtime:item.dt(毫秒)
    },
    // 上一首按钮被点击
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.$store.commit("playState", true);
      } else {
        this.currentIndex = this.songs.length - 1;
        this.$store.commit("playState", true);
      }
    },
    // 下一曲按钮被点击
    next() {
      if (this.currentIndex < this.songs.length - 1) {
        this.currentIndex++;
        this.$store.commit("playState", true);
      } else {
        this.currentIndex = 0;
        this.$store.commit("playState", true);
      }
    },
    // 当前播放完毕自动下一首
    autoNext() {
      this.next();
    },
    // 获取当前播放到的时间段
    getCurrentTime(e) {
      this.playTime = e.target.currentTime * 1000;
      if (this.$refs.player) {
        this.allTime = this.$refs.player.duration * 1000;
      }
    },
    // 点击进度条,跳转备点位置播放
    jumpPlay(e) {
      this.$refs.showTime.style.width = e.layerX + "px";
      this.player.currentTime = (this.allTime / 1000) * (e.layerX / 500);
      this.$store.commit("playState", true);
    },
    // audio的canplay事件
    canPlay(e) {
      // console.log(e.path[0].duration);
      this.allTime = e.path[0].duration * 1000;
      this.canPlayNow = true;
    },
    // 音量大小控制
    volSet(e) {
      if (e.layerY <= 100 && e.layerY >= 0) {
        this.$refs.showVol.style.height = 100 - e.layerY + "px";
        this.$refs.player.volume = (100 - e.layerY) / 100;
      }
    },
    // 音量调节显示
    openVol() {
      this.volOpacity = !this.volOpacity;
    },
    // 点击播放列表内歌曲切歌
    changeSong(index) {
      this.currentIndex = index;
      this.$store.commit("playState", true);
    },
    // 点击播放列表图标打开播放列表
    openList() {
      this.listShow = !this.listShow;
    },
    // 点击锁定/解锁
    lockState() {
      this.lock = !this.lock;
    },
    playerMouseenter() {
      this.$refs.allPlayer.style.bottom = "0";
    },
    playerMouseleave() {
      if (this.lock) {
        this.$refs.allPlayer.style.bottom = "-40px";
      }
    },
  },
  created() {},
  mounted() {
    // 获取整个歌单的集合
    this.$EventBus.$on("getsongsList", (data) => {
      this.songsList = data;
    });

    //
    // 全局添加事件监听-->p键切换播放与暂停
    window.onkeyup = () => {
      if (window.event.keyCode == 80) {
        this.$store.commit("keyupSpace");
      }
      if (window.event.keyCode == 76) {
        this.lock = !this.lock;
      }
    };
    // 监听事件总线-->鼠标点击某个歌单**播放按钮**
    this.$EventBus.$on("toggSong", (data) => {
      this.songs = data;
      // this.$store.commit("playState", true);
    });
  },
};
</script>

<style scoped>
.player {
  width: 100%;
  height: 40px;
  background-color: rgb(46, 46, 46);
  position: fixed;
  bottom: -39px;
  left: 0;
  right: 0;
  z-index: 9;
  box-shadow: 0 1px 1px 3px #000;
  transition: all 0.5s;
}
.handle {
  position: absolute;
  top: -20px;
  height: 20px;
  width: 100%;
}
.player:hover {
  bottom: 0;
}
.main {
  position: relative;
  width: 980px;
  height: 40px;
  margin: 0 278px;
  background-color: rgb(46, 46, 46);
  display: flex;
}
.controls {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
  /* cursor: pointer; */
}
img {
  width: 30px;
}
.prev,
.next {
  width: 28px;
  height: 28px;
  padding-top: 1px;
  cursor: pointer;
}
.state {
  cursor: pointer;
}
.progress {
  display: flex;
  width: 630px;
  justify-content: space-around;
}

.pic {
  padding-top: 5px;
}
.time-show {
  position: relative;
  width: 500px;
  height: 7px;
  border-radius: 5px;
  background-color: rgb(23, 23, 24);
  margin-top: 5px;
  position: relative;
}
.name {
  font-size: 12px;
  margin-top: 7px;
}
.song-name {
  color: #ccc;
  padding-right: 20px;
}
.time-all {
  margin-top: 22px;
  margin-left: 10px;
  font-size: 12px;
}
.no-songs {
  color: #666;
  line-height: 40px;
  padding-left: 50px;
  width: 630px;
}
.time-go {
  position: relative;
  width: 0;
  height: 7px;
  border-radius: 5px;
  background-color: rgb(199, 12, 12);
}
.time-go::before {
  content: "";
  position: absolute;
  right: 0;
  top: -3px;
  bottom: -3px;
  box-sizing: content-box;
  width: 6px;
  height: 6px;
  background-color: #fff;
  border: 4px solid rgb(199, 12, 12);
  border-radius: 50%;
}
.others {
  width: 250px;
  height: 40px;
  /* background-color: #fff; */
  display: flex;
  justify-content: space-between;
}
.others > div {
  width: 50%;
  display: flex;
  padding-top: 10px;
}
.others img {
  width: 20px;
  height: 20px;
  border-radius: 10px;

  margin: 0 5px;
  cursor: pointer;
}
.vol {
  position: relative;
  z-index: 99;
}
.vol-control {
  position: absolute;
  bottom: 40px;
  width: 30px;
  height: 120px;
  border: 1px solid #000;
  background-color: rgb(41, 41, 41);
}
.all-vol {
  width: 5px;
  height: 100px;
  margin: 10px auto;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
}
.now-vol {
  width: 5px;
  height: 100px;
  background-color: rgb(199, 12, 12);
  position: absolute;
  top: 10px;
  border-radius: 3px;
  transform-origin: 0 50px;
  transform: rotateX(0.5turn);
}
.now-vol::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  box-sizing: content-box;
  border-radius: 50%;
  background-color: #fff;
  bottom: -2px;
  left: -3px;
  border: 3px solid rgb(199, 12, 12);
}
.list {
  position: relative;
}
.songs-list {
  position: absolute;
  top: -310px;
  left: -186px;
  width: 250px;
  height: 300px;
  background-color: rgb(41, 41, 41);
  /* color: rgb(109, 109, 109); */
  color: #eee;
  /* overflow: scroll; */
}
.songs-list title {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  border-bottom: 2px solid rgb(66, 66, 66);
}
.songs-list li {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed rgb(66, 66, 66);
  position: relative;
  cursor: pointer;
}
.list-item-name {
  padding-left: 20px;
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list-item-artist {
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.songs-list li:hover {
  background-color: #000;
  color: #fff;
}
.playnow {
  background-color: #000;
  color: #fff;
}
.playnow::before {
  position: absolute;
  left: 5px;
  top: 3px;
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: none;
  border-left: 8px solid #f00;
}
.img-tip {
  position: relative;
  cursor: pointer;
}
.little-list {
  font-size: 12px;
  height: 21px;
  line-height: 20px;
  width: 40px;
  text-align: center;
  margin-bottom: 5px;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 25px;
  border-radius: 0 10px 10px 0;
}
.lock {
  position: absolute;
  top: -15px;
  right: -240px;
  width: 40px;
  height: 15px;
  background-color: rgb(41, 41, 41);
  padding: 0 14px 0 14px;
  border-radius: 10px 10px 0 0;
  z-index: 99;
  cursor: pointer;
}
.lock img {
  width: 12px;
}
</style>