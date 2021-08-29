<template>
  <li class="hot">
    <div class="title">
      <a href="javascript:;">
        <van-icon name="hot" size="15" color="rgb(193, 13, 12)" class="icon" />
        <span class="category">
          <slot name="title"></slot>
        </span>
      </a>
      <a href="javascript:;">
        <span class="more">更多</span>
        <span class="go">...</span>
      </a>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style scoped>
.hot {
}
.title {
  position: relative;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;

  border-bottom: 2px solid rgb(193, 13, 12);
  display: flex;
  justify-content: space-between;
  /* line-height: 20px; */
}
.category {
  display: inline-block;
  font-size: 14px;
  padding-left: 20px;
}
.more {
  font-size: 12px;
}
.go {
  font-size: 12px;
  color: rgb(193, 13, 12);
  font-weight: 800;
}
.icon {
  position: absolute;
  top: 7px;
}
</style>