<template>
  <div id="app">
    <keep-alive v-if="$route.name == 'GoodSearch' || $route.name == 'Good'">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="$route.name != 'GoodSearch' && $route.name != 'Good'"></router-view>
  </div>
</template>

<script>
  
  export default {
    name: 'App',
  }
</script>

<style lang="less">

</style>
