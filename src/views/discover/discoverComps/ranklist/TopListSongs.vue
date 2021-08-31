<template>
  <ul class="songs">
    <div class="detail">
      <div class="logo">
        <img :src="topLists.coverImgUrl" alt="" />
      </div>
      <div class="info">
        <h3 class="title">
          {{ topLists.name
          }}<span class="update">({{ topLists.updateFrequency }})</span>
        </h3>

        <p class="desc">{{ topLists.description }}</p>
      </div>
    </div>
    <h3 class="list-title">
      歌曲列表
      <span>({{ currentSongs.length }}首歌)</span>
    </h3>
    <li
      class="song"
      v-for="(item, index) in currentSongs"
      :key="item.id * index"
    >
      <span class="song-name">{{ item.name }}</span>
      <span class="artist-name">{{ item.artistName }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    topLists: {
      type: Object,
      default() {
        return {};
      },
    },
    currentSongs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.songs {
  width: 740px;
  padding: 40px 30px;
  padding-bottom: 0;
}
.detail {
  width: 100%;
  display: flex;
}
.logo {
  border: 1px solid #ccc;
}
.logo img {
  width: 152px;
  padding: 2px;
  vertical-align: middle;
}
.info {
  margin: auto 40px;
}
.title {
  font-size: 16px;
  color: #000;
  height: 100px;
  text-decoration: #000 underline;
}
.update {
  font-size: 12px;
}
.desc {
  font-size: 12px;
  border: 1px solid #ccc;
}
.list-title {
  margin-top: 30px;
  height: 30px;
  border-bottom: 3px solid rgb(185, 24, 15);
}
.list-title span {
  font-size: 12px;
}
.songs > li:nth-child(odd) {
  background-color: #fff;
}
.song {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 20px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.songs .song:hover {
  background-color: #ccc;
}
.song-name {
  display: block;
  width: 40%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgb(185, 24, 15);
}
.artist-name {
  display: block;
  width: 20%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>