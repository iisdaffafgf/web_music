<template>
  <li class="play-item" v-if="Object.keys(playItem).length !== 0">
    <div class="img" @click="getDetail">
      <img :src="playItem.picUrl" alt="" />
    </div>
    <p class="desc">{{ playItem.name }}</p>
  </li>
</template>

<script>
import { getPlayList, getSongUrl } from "@/network/recommend.js";

export default {
  data() {
    return {
      currendIndex: 2,
      songsList: [],
      songs: [],
      currentSong: "",
    };
  },
  props: {
    playItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 点击歌单封面请求数据
    getDetail() {
      // 根据歌单id(来自Recommend.vue)  请求歌单歌单中的歌曲列表
      getPlayList(this.playItem.id).then((res) => {
        // 获取到歌曲列表，提交到事件总线
        this.songsList = res.data.playlist.tracks;
        this.$EventBus.$emit("getsongsList", this.songsList);
        // 根据歌曲列表中每首歌的id，请求数据，获取歌曲详细数据(包括url)
        this.songsList.forEach((item) => {
          getSongUrl(item.id).then((res) => {
            this.currentSong = res.data.data[0];
            this.songs.push(res.data.data[0]);
          });
        });
        // 将歌单详情提交到事件总线
        this.$EventBus.$emit("toggSong", this.songs);
      });
    },
  },
};
</script>

<style scoped>
.play-item {
  width: 170px;
  height: 204px;
  padding: 0 15px;
}
.img {
  width: 140px;
  height: 140px;
  cursor: pointer;
}
.img img {
  width: 140px;
  vertical-align: middle;
}
.desc {
  font-size: 14px;
  padding: 5px;
}
</style>