/**
*
* Author: GhostCat
* CreatDate: 2020-01-06 18:06:54
*
* Description: 侧边栏菜单
*
*/
<style lang='scss' scoped type='text/scss'>
</style>
<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed">
    <div class="index-logo logo">CG 顽皮斯</div>
    <a-menu
      v-for="(item,index) in menu"
      :key="index"
      theme="dark"
      mode="inline"
      :defaultSelectedKeys="['1']"
    >
      <a-menu-item class="index-menu-item" :class="item.index" :key="index" :data-msg="item.index">
        <router-link :to="item.url">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: "sideMenu",
  components: {},
  props: {},
  data() {
    return {
      collapsed: false,
      menu: [
        {
          name: "公司管理",
          icon: "global",
          url: "/company"
        },
        {
          name: "人员管理",
          icon: "team",
          url: "/people"
        },
        {
          name: "系统管理",
          icon: "setting",
          url: ""
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>
