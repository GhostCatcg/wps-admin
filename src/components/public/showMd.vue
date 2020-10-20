/**
*
* Author: lvgc
* CreatDate: 2020-10-20 18:33:37
*
* Description: 解析md文件
*
*/
<template>
  <div class="showMd-wapper">
    <mavon-editor
      v-model="readmeContent"
      :toolbarsFlag="false"
      :subfield="false"
      :boxShadow="false"
      defaultOpen="preview"
      previewBackground="#fff"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: "showMd",
  components: {},
  props: {
    readmeContent: {
      defalut: () => {
        return "";
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang='scss' scoped type='text/scss'>
.showMd-wapper {
  height: 100%;
}
</style>
