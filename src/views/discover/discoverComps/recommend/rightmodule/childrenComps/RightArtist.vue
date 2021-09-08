<template>
  <div class="artist">
    <title class="title"><span>热门歌手</span> <a>查看全部&gt;</a></title>
    <ul>
      <li
        v-for="(item, index) in artists"
        :key="item.accountId + index"
        class="item"
        @click="getArtistSongs(index)"
      >
        <div>
          <img :src="item.picUrl" alt="" />
          <!-- <img src="~@/assets/img/player/bofang.png" alt="" class="play" />
          <img src="~@/assets/img/player/zanting.png" alt="" class="play" /> -->
        </div>
        <div class="artist-name">
          <p class="name">{{ item.name }}</p>
          <p class="alias">{{ item.alias[0] }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getArtist,
  getArtistDetail,
  //   getArtistHot,
} from "@/network/recommend.js";
export default {
  data() {
    return {
      artists: [],
    };
  },
  methods: {
    getArtistSongs(index) {
      this.$router.push("/artistsongs/" + this.artists[index].id);
      this.$EventBus.$emit("sendData", this.artists[index]);
    },
  },
  created() {
    getArtist(10).then((res) => {
      //   console.log(res.data.artists);
      this.artists = res.data.artists;
      this.artists.forEach((item) => {
        getArtistDetail(item.id).then((res) => {
          // console.log(res.data);
          res;
        });
      });
    });
  },
};
</script>

<style scoped>
.artist {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-bottom: none;
}
.title {
  height: 24px;
  line-height: 26px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.item {
  height: 62px;
  display: flex;
  margin: 15px 0;
  width: 210px;
  border: 1px solid #ccc;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
}
.item:hover {
  background-color: rgb(240, 240, 240);
}
.item img {
  padding: 0;
  width: 62px;
  height: 61px;
  vertical-align: middle;
  margin-right: 20px;
}
.artist-name {
  height: 50px;
  margin: auto 0;
}
.name,
.alias {
  height: 25px;
  width: 120px;
  line-height: 25px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.name {
  color: #000;
  font-weight: bold;
  font-size: 14px;
}
.alias {
  font-size: 12px;
}
</style>