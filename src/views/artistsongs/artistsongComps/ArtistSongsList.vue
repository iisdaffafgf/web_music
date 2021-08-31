<template>
  <li class="songs-item" @click="play">
    <p class="song-name">{{ song.name }}</p>
    <p class="song-artist">{{ song.ar[0].name }}</p>
    <p class="song-ablum">{{ song.al.name }}</p>
    <p class="song-time">{{ songTime }}</p>
  </li>
</template>

<script>
// import { getSongUrl } from "@/network/recommend.js";
export default {
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    songTime() {
      const sAll = this.song.dt / 1000;
      let s = sAll % 60;
      let m = (sAll - s) / 60;
      s = parseInt(s);
      m = parseInt(m);
      if (s < 10) {
        s = "0" + s;
      }
      if (m < 10) {
        m = "0" + m;
      }
      return m + ":" + s;
    },
  },
  methods: {
    play() {
      this.$EventBus.$emit("sendSongId", this.song);
      // getSongUrl(this.song.id).then((res) => {
      //   console.log(res.data.data);
      // });
    },
  },
};
</script>

<style scoped>
.songs-item {
  /* margin-left: 40px;
  margin-right: 40px; */
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 12px;
}
.song-name {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.song-artist {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(199, 12, 12);
}
.song-ablum {
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>