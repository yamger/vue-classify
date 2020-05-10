<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {
    // Login: () => import("./views/Login.vue")
  }
};
</script>
<style>
html,
body {
  height: 100%;
  background-color: #f9f9f9;
}
</style>
