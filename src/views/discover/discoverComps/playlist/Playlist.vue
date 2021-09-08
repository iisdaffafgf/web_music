<template>
  <div class="playlist">
    <play-list-top :playliststop="playliststop" />
  </div>
</template>

<script>
import PlayListTop from "./playlisttop/PlayListTop.vue";
import { getplayLists, PlaylistsItem } from "@/network/playlist.js";
export default {
  components: {
    PlayListTop,
  },
  data() {
    return {
      playliststop: [],
    };
  },
  created() {
    getplayLists(16).then((res) => {
      let data = res.data.playlists;
      data.forEach((item, index) => {
        this.playliststop.push(new PlaylistsItem(data, index));
      });
      // console.log(this.playliststop);
    });
  },
};
</script>

<style scoped>
.playlist {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px 40px;
}
</style>