/**
*
* Author: lvgc
* CreatDate: 2020-07-30 19:55:49
*
* Description: 新建轮播图
*
*/
<template>
  <div class="create-wapper">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "create",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      defalut() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang='scss' scoped type='text/scss'>
.create-wapper {
  height: 100%;
}
</style>
