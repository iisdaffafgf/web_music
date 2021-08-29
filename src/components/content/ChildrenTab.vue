<template>
  <ul class="discover-tab">
    <ul class="item-list">
      <slot></slot>
    </ul>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.discover-tab {
  width: 100%;
  /* height: 0; */
  background-color: rgb(194, 12, 12);

  border-top: 2px solid rgb(194, 12, 12);
  border-bottom: 2px solid rgb(194, 12, 12);
}
.item-list {
  margin: 0 auto;
  width: 40%;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
</style>