<template>
  <div class="right_module">
    <right-login></right-login>
    <right-artist></right-artist>
  </div>
</template>

<script>
import RightLogin from "./RightLogin.vue";
import RightArtist from "./RightArtist.vue";
export default {
  components: {
    RightLogin,
    RightArtist,
  },
};
</script>

<style>
</style>