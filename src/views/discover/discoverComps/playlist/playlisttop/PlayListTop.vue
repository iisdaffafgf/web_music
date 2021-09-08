<template>
  <ul class="play-lists-top">
    <hot-title>
      <template #title> 网友精选碟 </template>
    </hot-title>
    <div class="contents">
      <li
        v-for="(item, index) in playliststop"
        :key="item.id + item.name + index"
        class="item"
      >
        <div class="img" :title="item.description">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="tags">
          <span>tags: </span>
          <p v-for="(tag, i) in item.tags" :key="i" :title="tag">{{ tag }}</p>
        </div>
        <p class="name">{{ item.name }}</p>
        <div class="play-btn">
          <p title="播放次数">{{ playCount(item.playCount) }}次播放</p>
          <img
            src="~@/assets/img/player/bofang.png"
            alt="播放"
            title="播放"
            @click="play(item.id)"
          />
        </div>
      </li>
    </div>
  </ul>
</template>

<script>
import { getPlayList, getSongUrl } from "@/network/recommend.js";

import HotTitle from "@/components/content/HotTitle.vue";

export default {
  components: {
    HotTitle,
  },
  props: {
    playliststop: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      songsList: [],
      songs: [],
      currentSong: "",
    };
  },
  computed: {
    playCount() {
      return (count) => {
        return count >= 100000 ? (count / 10000).toFixed(2) + "万" : count;
      };
    },
  },
  methods: {
    play(id) {
      getPlayList(id).then((res) => {
        // console.log(res.data.playlist.tracks);
        this.songsList = res.data.playlist.tracks;
        this.$EventBus.$emit("getsongsList", this.songsList);
        getSongUrl(this.songsList[0].id).then((res) => {
          this.currentSong = res.data.data[0];
          this.songs.push(this.currentSong);
          this.songs.length = this.songsList.length;
          this.$EventBus.$emit("toggSong", this.songs);
        });
      });
    },
  },
};
</script>

<style scoped>
.contents {
  width: 100%;
  padding: 20px;
  border: 1px dashed #ddd;
  border-top: none;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  width: 200px;
  cursor: pointer;
  position: relative;
}
.img {
  width: 200px;
}
.item img {
  width: 200px;
  vertical-align: middle;
  padding: 10px;
}
.name {
  width: 200px;
  padding: 5px 10px;
  font-size: 14px;
  height: 40px;
}
.tags {
  display: flex;
  padding-left: 20px;
  font-size: 12px;
}
.tags > span {
  display: block;
  width: 30px;
  line-height: 20px;
  border-radius: 5px;
  background-color: rgba(30, 30, 250, 0.6);
  text-align: center;
  color: #fff;
}
.tags > p {
  background-color: rgb(194, 12, 12);
  padding: 2px 4px;
  border-radius: 5px;
  color: #fff;
  margin: 0 5px;
  width: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play-btn {
  width: 180px;
  position: absolute;
  top: 130px;
  right: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.play-btn img {
  width: 60px;
  opacity: 0.5;

  padding: 0;
}
.play-btn p {
  color: red;
  font-size: 12px;
  opacity: 0.7;
  padding: 0 0 5px 5px;
}
</style>