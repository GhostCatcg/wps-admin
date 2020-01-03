
<style lang="scss" socped type='text/scss'>

#app {
  height: 100%;
}

</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted() {
    console.log(
      "\n" + " %c GhostCat GitHub %c http://gcat.me " + "\n",
      "color: #fadfa3; background: #030307; padding:5px 0;",
      "background: #fadfa3; padding:5px 0;"
    );
    console.log(
      "\n" + " %c GhostCat GitHub %c https://github.com/GhostCatCG " + "\n",
      "color: #fadfa3; background: #030307; padding:5px 0;",
      "background: #fadfa3; padding:5px 0;"
    );
  }
};
</script>

