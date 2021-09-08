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
  // SongInfo,
} from "@/network/ranklist.js";

import TopLists from "./childrenComps/TopLists.vue";
import TopListSongs from "./childrenComps/TopListSongs.vue";
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
        this.currentSongs = data;
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
      for (let i = 0; i < 4; i++) {
        let item = new Toplist(data, i);
        this.topLists.push(item);
      }
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