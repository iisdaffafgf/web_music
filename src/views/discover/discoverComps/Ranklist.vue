<template>
  <div class="ranklist">
    <top-lists :topLists="topLists" @changeCurrent="changeCurrent" />
    <top-list-songs
      :topLists="topLists[currentIndex]"
      :currentSongs="currentSongs"
    />
  </div>
</template>

<script>
import {
  getToplist,
  Toplist,
  getPlaylist,
  SongInfo,
} from "@/network/ranklist.js";

import TopLists from "./ranklist/TopLists.vue";
import TopListSongs from "./ranklist/TopListSongs.vue";
export default {
  components: {
    TopLists,
    TopListSongs,
  },
  data() {
    return {
      currentIndex: 0,
      topLists: [],
      currentSongs: [],
    };
  },
  methods: {
    getListDetail(id) {
      getPlaylist(id).then((res) => {
        let data = res.data.playlist.tracks;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let item = new SongInfo(data, i);
          arr.push(item);
        }
        this.currentSongs = arr;
        // this.currentSongs = new SongInfo(data);
        // console.log(this.currentSongs);
        // data.forEach((item, index) => {
        //   // console.log(item.id);
        //   getSongUrl(item.id).then((res) => {
        //     // console.log(res);
        //   });
        // });
      });
    },
    changeCurrent(index) {
      this.currentIndex = index;
      this.getListDetail(this.topLists[this.currentIndex].id);
    },
  },
  created() {
    getToplist().then((res) => {
      const data = res.data.list;
      // console.log(data);
      for (let i = 0; i < 5; i++) {
        let item = new Toplist(data, i);
        this.topLists.push(item);
      }
      // console.log(this.topLists);
      this.getListDetail(this.topLists[this.currentIndex].id);
    });
  },
};
</script>

<style scoped>
.ranklist {
  width: 980px;
  margin: 0 auto;
  display: flex;
  border-right: 1px solid #ccc;
}
</style>