<template>
  <div class="login">
    <p class="tips">
      登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
    </p>
    <div class="btn">用户登录</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.login {
  width: 250px;
  height: 126px;
  border: 1px solid #ccc;
  background-image: linear-gradient(
    to top,
    rgb(226, 226, 226),
    rgb(253, 253, 253)
  );
}
.tips {
  width: 200px;
  margin: 0 auto;
  padding: 16px 0;
  font-size: 12px;
}
.btn {
  width: 100px;
  height: 31px;
  line-height: 31px;
  margin: 0 auto;
  text-align: center;
  background-color: rgb(211, 17, 23);
  color: #fff;
  border-radius: 5px;
}
</style>