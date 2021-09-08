<template>
  <ul class="left_module">
    <hot-title>
      <template #title> 热门歌单 </template>
      <template #content>
        <ul class="play-list">
          <play-list
            v-for="item in recommendList"
            :key="item.id"
            :playItem="item"
          />
        </ul>
      </template>
    </hot-title>

    <hot-title class="mv-title">
      <template #title> 热门MV </template>
      <template #content>
        <ul class="mv-list">
          <mv-list></mv-list>
        </ul>
      </template>
    </hot-title>
  </ul>
</template>

<script>
import HotTitle from "@/components/content/HotTitle.vue";
import PlayList from "./childrenComps/PlayList.vue";
import MvList from "./childrenComps/MvList.vue";
export default {
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    HotTitle,
    PlayList,
    MvList,
  },
};
</script>

<style scoped>
.left_module {
  width: 730px;
  background-color: #fff;
}
.play-list {
  width: 730px;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.mv-title {
  padding-top: 20px;
}
</style>