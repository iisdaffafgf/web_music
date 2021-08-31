<template>
  <ul class="lists">
    <h3 class="title">云音乐特色榜</h3>
    <li
      v-for="(item, index) in topLists"
      :key="item.id * index"
      class="list"
      :class="{ current: currentIndex === index }"
      @click="changeCurrent(index)"
    >
      <div class="list-logo">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="list-info">
        <p class="list-name">{{ item.name }}</p>
        <p class="list-updata">{{ item.updateFrequency }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    topLists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeCurrent(index) {
      this.currentIndex = index;
      this.$emit("changeCurrent", index);
    },
  },
};
</script>

<style scoped>
.lists {
  width: 240px;
  padding-top: 40px;
  border: 1px solid #ccc;
}
.title {
  font-size: 14px;
  padding-left: 20px;
  padding-bottom: 10px;
  color: #000;
}
.list {
  width: 238px;
  padding: 10px 0 10px 20px;
  display: flex;
  cursor: pointer;
}
li:hover {
  background-color: rgb(220, 220, 220);
}
.list-info {
  padding-left: 10px;
  font-size: 12px;
  padding-top: 3px;
}
.list-name {
  color: #000;
}
.list-updata {
  margin-top: 10px;
}
.list-logo img {
  width: 40px;
}
.current {
  background-color: rgb(220, 220, 220);
}
</style>