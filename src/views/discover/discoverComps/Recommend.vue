<template>
  <div class="recommend">
    <banner :banners="banners" class="banners" />
    <div class="hot">
      <left-module :recommendList="recommendList"></left-module>
      <right-module></right-module>
    </div>
  </div>
</template>

<script>
// getPlayList
import { getBanners, getCaTlist } from "@/network/recommend.js";

import Banner from "./recommend/Banner.vue";
import LeftModule from "./recommend/LeftModule.vue";
import RightModule from "./recommend/RightModule.vue";
export default {
  data() {
    return {
      banners: [],
      recommendList: [],
      recommendSongs: [],
    };
  },
  components: {
    Banner,
    LeftModule,
    RightModule,
  },
  created() {
    // 轮播图数据
    getBanners().then((res) => {
      this.banners = res.data.banners;
      // console.log(this.banners);
    });
    //推荐歌单
    getCaTlist().then((res) => {
      this.recommendList = res.data.result;
    });
  },
};
</script>

<style scoped>
.hot {
  width: 980px;
  margin: 0 auto;
  display: flex;
}
</style>