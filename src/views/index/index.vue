/**
*
* Author: GhostCat
* CreatDate: 2020-01-03 20:28:14
*
* Description: 首页
*
*/

<style lang='scss' scoped type='text/scss'>
.index-wapper {
  height: 100%;
  .index-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  #components-layout-demo-custom-trigger {
    height: 100%;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
    }
    .index-footer {
      text-align: center;
      padding: 0px 50px 10px;
    }
    .index-content {
      margin: 10px 16px;
      padding: 24px;
      background: #fff;
      min-height: 280px;
    }
  }
}
</style>

<template>
  <div class="index-wapper">
    <a-layout id="components-layout-demo-custom-trigger" v-if="show">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="index-logo logo">CG 顽皮斯</div>
        <a-menu
          v-for="(item,index) in menu"
          :key="index"
          theme="dark"
          mode="inline"
          :defaultSelectedKeys="['1']"
        >
          <a-menu-item class="index-menu-item" :key="item.index" :data-msg="item.index" click>
            <a-icon :type="item.icon" />
            <span>{{item.name}}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content class="index-content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer class="index-footer">CG顽皮斯 ©2019 Created by GhostCat</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Printer from "@/js/printer";
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      collapsed: false,
      show: true,
      menu: [
        {
          name: "公司管理",
          icon: "global"
        },
        {
          name: "人员管理",
          icon: "team"
        },
        {
          name: "系统管理",
          icon: "setting"
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

