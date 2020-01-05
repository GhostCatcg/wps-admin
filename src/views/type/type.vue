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
  .printer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: black;
    align-items: center;
    #window {
      width: 700px;
      height: 1000px;
    }
    tilte-title {
      font-family: "Arial Black", SimHei;
      font-weight: bold;
    }
    #show-board {
      width: 100%;
      height: 100%;
      color: #eee;
      padding: 10px;
      font-family: Consolas, serif;
      line-height: 2;
      font-size: 50px;
    }
  }
}
</style>

<template>
  <div class="index-wapper">
    <div class="printer">
      <div id="window">
        <div id="show-board"></div>
      </div>
    </div>
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
      str: "",
      lock: false
    };
  },
  created() {},
  mounted() {
    this.type();
  },
  methods: {
    type() {
      let str = "";
      str = "我是一面神奇的镜子\n";
      str += "在帮您整体仪容的同时\n";
      str += "还能查询证件办理信息哦！\n";
      str += "\n";
      str += "您可以试着对我说：\n";
      str += "“我要办理护照”\n";
      str += "“我要办理居住证”\n";
      str += "“我要补办身份证”\n";

      Printer.init(str, {
        selector: "show-board",
        lnStr: "",
        hasCur: false, // 是否有光标
        speed: 150, // 文字的速度
        callbackTime: 10000 // 回调时间
      }).print(this.callback);
    },
    callback() {
      this.type();
    }
  },
  watch: {}
};
</script>

