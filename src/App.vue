<template>
  <div id="app">
    <tab-bar :tabList="tabList" :route="route" />
    <router-view />
    <player />
  </div>
</template>
<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import Player from "@/components/content/Player.vue";
export default {
  data() {
    return {
      tabList: ["发现音乐", "我的音乐", "朋友", "商城", "音乐人", "下载客户端"],
      route: ["/discover", "/mine", "/friend", "shop", "/artist", "/download"],
    };
  },
  components: {
    TabBar,
    Player,
  },
  computed: {},
  methods: {},
};
</script>
<style >
@import "./assets/css/base.css";
#app {
  width: 100%;
  background-color: rgb(245, 245, 245);
  overflow: hidden;
}
</style>
