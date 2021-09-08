<template>
  <div class="banners">
    <div ref="filter_blur" class="filter_blur"></div>
    <van-icon name="arrow-left" size="40" class="left common" @click="prev" />
    <div class="container">
      <van-swipe
        class="my-swipe content"
        :autoplay="3000"
        indicator-color="white"
        @change="onChange"
        ref="swipe"
      >
        <van-swipe-item
          v-for="(item, index) in banners"
          :key="item.encodeId + index"
        >
          <img :src="item.imageUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
      <img src="~@/assets/img/banner/banner_download.jpg" alt="" class="img" />
    </div>
    <van-icon name="arrow" size="40" class="right common" @click="next" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      currentImg:
        "http://p1.music.126.net/EYikR0PNeCSf68x-B69HgA==/109951166318058216.jpg",
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    onChange(index) {
      this.currentIndex = index;
      this.currentImg = this.banners[index].imageUrl;
      //   console.log(this.currentIndex);
      this.$refs.filter_blur.style.backgroundImage =
        "url(" + this.currentImg + ")";
    },
    prev() {
      this.$refs.swipe.prev();
    },
    next() {
      this.$refs.swipe.next();
    },
  },
};
</script>

<style scoped>
.banners {
  position: relative;
  height: 270px;
  overflow: hidden;
}
.filter_blur {
  position: absolute;
  width: 100%;
  height: 270px;
  background-image: url("http://p1.music.126.net/VmqHdKTOGtf0MC29E0RK7g==/109951166319959586.jpg");
  background-size: 200% 200%;
  background-position: center;
  filter: blur(10px);
}
.content {
  width: 730px;
  /* margin: 0 auto; */
}
img {
  width: 730px;
}
.img {
  width: 250px;
  height: 270px;
  z-index: 9;
}
.container {
  display: flex;
  width: 980px;
  margin: 0 auto;
}
.common {
  position: absolute;
  height: 270px;
  padding: 115px 0;
  cursor: pointer;
}
.common:hover {
  background-color: #ccc;
  color: #fff;
}
.left {
  left: 230px;
}
.right {
  top: 50%;
  transform: translateY(-50%);

  right: 230px;
}
</style>