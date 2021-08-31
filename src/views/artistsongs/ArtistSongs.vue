<template>
  <ul class="artist-songs">
    <artist-detail />
    <hot-title class="title">
      <template #title>热门歌曲</template>
    </hot-title>
    <artist-songs-list
      v-for="(item, index) in artistSongs"
      :key="item.id + item.name + index"
      :song="item"
      class="songs-item"
    />
  </ul>
</template>

<script>
import { getArtistHot } from "@/network/recommend.js";

import ArtistDetail from "./artistsongComps/ArtistDetail.vue";
import ArtistSongsList from "./artistsongComps/ArtistSongsList.vue";
import HotTitle from "@/components/content/HotTitle.vue";
export default {
  components: {
    ArtistDetail,
    ArtistSongsList,
    HotTitle,
  },
  data() {
    return {
      artistSongs: [],
    };
  },
  created() {
    getArtistHot(this.$route.params.id).then((res) => {
      this.artistSongs = res.data.songs;
      // console.log(res.data.songs);
    });
  },
};
</script>

<style scoped>
.artist-songs {
  width: 900px;
  /* background-color: red; */
  margin: 0 auto;
}
.artist-songs li:nth-child(even) {
  background-color: #eee;
}
.artist-songs li:nth-child(odd) {
  background-color: rgb(233, 233, 233);
}
.artist-songs .songs-item:hover {
  background-color: #ccc;
}
.title {
  width: 900px;
  margin: 0 auto;
}
</style>