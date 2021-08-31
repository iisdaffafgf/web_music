<template>
  <div class="artist-detail" v-if="Object.keys(artist).length">
    <div class="pic">
      <img :src="picUrl" alt="" />
    </div>
    <p class="name">{{ artist.briefDesc }}</p>
  </div>
</template>

<script>
import { getArtistDetail } from "@/network/recommend.js";
export default {
  data() {
    return {
      artist: {},
    };
  },
  computed: {
    picUrl() {
      if (this.artist.topicData) {
        return this.artist.topicData[0].coverUrl;
      }
      return "";
    },
  },
  created() {
    getArtistDetail(this.$route.params.id).then((res) => {
      // console.log(res.data);
      this.artist = res.data;
    });
  },
  mounted() {},
};
</script>

<style scoped>
.artist-detail {
  display: flex;
  width: 900px;
  margin: 20px auto;
  background-color: #fff;
}
.pic {
  border: 1px solid #ccc;
  width: 188px;
  height: 188px;
}
.pic img {
  width: 188px;
  vertical-align: middle;
  padding: 2px;
}
.name {
  text-indent: 2em;
  font-size: 12px;
  height: 190px;
  padding: 10px 5px;
}
</style>