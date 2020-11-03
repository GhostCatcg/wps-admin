/**
*
* Author: lvgc
* CreatDate: 2020-11-02 19:27:49
*
* Description: 修改头像
*
*/
<template>
  <div class="index-wapper">
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="上传头像">
          <el-upload
            action="#"
            list-type="picture-card"
            :http-request="httpRequest"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }" v-if="false">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="imgFlag">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="resetForm('ruleForm')">取 消</el-button> -->
      <el-button
        :disabled="disabledFlag"
        type="primary"
        @click="onSubmit('ruleForm')"
        >确 定</el-button
      >
    </span>
  </div>
</template>

<script>
import { uploadImg, bannerTypeList } from "@/api/public";
import { updataAvatar } from "@/api/user";

export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogImageUrl: "",
      imgFlag: false,
      disabled: false,

      imgSrc: "",

      disabledFlag: true,
      url:''
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 覆盖默认上传事件，自定义上传
     */
    async httpRequest(data) {
      var formData = new FormData();
      formData.append("file", data.file);
      const res = await uploadImg(formData);
      if (res.code == 0) {
        this.imgSrc = res.data.data.key;
        this.url = res.data.data.url
        this.disabledFlag = false;
      }
    },
    /**
     * 修改头像
     */
    async updata() {
      const config = {
        data: {
          pic: this.imgSrc,
        },
      };
      const res = await updataAvatar(config.data);
      if (res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.$store.commit("user/SET_AVATAR", this.url);
        this.$router.push('/')
      }
    },
    /**
     * 上传成功
     */
    handleAvatarSuccess(res, file) {
    //   console.log("上传成功");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 上传头像之前
     */
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    /**
     * 删除文件
     */
    handleRemove(file) {
      console.log(file);
      return false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgFlag = true;
    },
    /**
     * 下载
     */
    handleDownload(file) {
      console.log(file);
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    /**
     * 提交表单
     */
    onSubmit(formName) {
    //   console.log("submit!");
      this.updata();
    },
  },
  watch: {},
};
</script>
<style lang="scss">
.el-upload-list--picture-card:not(:empty) + .el-upload--picture-card {
  display: none;
}
</style>
<style lang='scss' scoped type='text/scss'>
.index-wapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
