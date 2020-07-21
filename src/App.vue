<template>
  <div id="app">
    <keep-alive>
            <!--router-view组件是一个 functional 组件，渲染路径匹配到的视图组件-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--不需要缓存组件-->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  activated() {
    window.addEventListener('hashchange', () => {
      let currentPath = window.location.hash.slice(1)
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath)
      }
    }, false)
  },
}
</script>
<style>
</style>
