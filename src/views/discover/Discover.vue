<template>
  <div id="discover">
    <children-tab>
      <li
        v-for="(item, index) in tabList"
        :key="item + index"
        @click="jump(index)"
        class="tab-content"
      >
        <span :class="{ current: currentIndex === index }">{{ item }}</span>
      </li>
    </children-tab>
    <router-view />
  </div>
</template>

<script>
import ChildrenTab from "@/components/content/ChildrenTab.vue";
export default {
  name: "Discover",
  data() {
    return {
      currentIndex: 0,
      tabList: ["推荐", "排行榜", "歌单", "主播电台", "歌手", "新碟上架"],
      routes: [
        "/recommend",
        "/ranklist",
        "/playlist",
        "/liveradio",
        "/singer",
        "/newdisc",
      ],
      route: "/discover",

      banners: [],
    };
  },
  components: {
    ChildrenTab,
  },
  methods: {
    jump(index) {
      this.currentIndex = index;
      this.$router.push(this.route + this.routes[index]);
    },
  },
  created() {
    {
      // 初始化currentIndex等于当前路由位置的索引
      for (let i in this.routes) {
        if (this.route + this.routes[i] === this.$route.path) {
          this.currentIndex = parseInt(i);
        }
      }
    }
  },
};
</script>

<style scoped>
.discover {
  width: 100vw;
  overflow: hidden;
}
.tab-content {
  cursor: pointer;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.tab-content span {
  color: #fff;
  font-size: 12px;
  padding: 4px 15px;
  border-radius: 10px;
}
.current {
  background-color: rgb(155, 9, 9);
}
</style>