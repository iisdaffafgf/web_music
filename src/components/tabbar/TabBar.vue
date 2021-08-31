<template>
  <div id="tab-bar">
    <div class="content">
      <a href="javascript:;" class="logo" @click="backHome"></a>
      <ul class="item-list">
        <li
          v-for="(item, index) in tabList"
          :key="item"
          @click="jumpRoute(index)"
          class="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
      <div class="others">
        <div class="search">
          <div class="icon"><van-icon name="search" size="20" /></div>
          <input type="text" placeholder="音乐/歌手" @keydown="search" />
        </div>
        <button class="btn">创作者中心</button>
        <a href="javascript:;">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      },
    },
    route: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    jumpRoute(index) {
      this.$router.push(this.route[index]);
      this.currentIndex = index;
    },
    // 搜索框
    search(e) {
      if (e.keyCode == 13) {
        const keywords = e.path[0].value;
        this.$router.push("/search/" + keywords);
      }
    },
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#tab-bar {
  width: 100%;
  height: 80px;
  background-color: rgb(36, 36, 36);
  padding: 0 15%;
  font-size: 14px;
  line-height: 80px;
  overflow: hidden;
}
.content {
  width: 100%;
  justify-content: space-between;
  display: flex;
}
.logo {
  margin: auto 0;
  width: 200px;
  height: 38px;
  background-image: url("~@/assets/img/topbar/logo.png");
  background-size: cover;
  background-position: center;
}
.others {
  display: flex;
  width: 300px;
  justify-content: space-around;
}
.search {
  display: flex;

  width: 180px;
  border-radius: 20px;
  line-height: 30px;
  height: 30px;
  margin: auto 0;
  background-color: #fff;
}
.search input {
  margin-left: 5px;
  width: 140px;
  height: 30px;
  border-radius: 15px;
  border: none;
  outline: none;
}
.item-list {
  display: flex;
  justify-content: space-around;
  color: #ccc;
  width: 50%;
}
.item {
  width: 16.7%;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.current {
  background-color: #000;
  color: #fff;
}
.current::before {
  position: absolute;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom: 6px solid rgb(194, 12, 12);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.item:hover {
  background-color: #000;
  color: #fff;
}
.icon {
  margin: 5px 5px 0;
}
.btn {
  cursor: pointer;
  line-height: 30px;
  height: 30px;
  margin: auto 5px;
  padding: 0 5px;
  border-radius: 15px;
  border: 1px solid #ccc;
  outline: none;
  background-color: rgb(36, 36, 36);
}
.btn:hover {
  color: #fff;
  border: 1px solid #fff;
}
</style>