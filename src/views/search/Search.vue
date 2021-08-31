<template>
  <ul class="search">
    <hot-title>
      <template #title> 搜索结果 </template>
    </hot-title>
    <ul class="search-list">
      <li
        class="search-item"
        v-for="(item, index) in songs"
        :key="item.id * index"
        :class="{ canotuse: !item.success }"
      >
        <artist-songs-list :song="item" class="songs-list-item" />
      </li>
    </ul>
  </ul>
</template>

<script>
import {
  searchRes,
  // availableSong
} from "@/network/search.js";
import HotTitle from "@/components/content/HotTitle.vue";
import ArtistSongsList from "@/views/artistsongs/artistsongComps/ArtistSongsList.vue";
export default {
  components: {
    HotTitle,
    ArtistSongsList,
  },
  data() {
    return {
      songs: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.params.keywords != from.params.keywords) {
        searchRes(this.$route.params.keywords).then((res) => {
          this.songs = res.data.result.songs;
        });
      }
    },
  },
  created() {
    searchRes(this.$route.params.keywords).then((res) => {
      this.songs = res.data.result.songs;
    });
  },
};
</script>

<style scoped>
.search {
  width: 980px;
  padding: 40px;
  margin: 0 auto;
}
.songs-list-item {
}
.search-list .search-item:nth-child(even) {
  background-color: #eee;
}
.search-list .search-item:nth-child(odd) {
  background-color: rgb(233, 233, 233);
}
.search-list .search-item:hover {
  background-color: #ccc;
}
/* .canotuse {
  color: red;
} */
</style>