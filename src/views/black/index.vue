/**
*
* Author: lvgc
* CreatDate: 2020-07-30 20:46:06
*
* Description: 小黑屋
*
*
* 富文本编辑器操作 ： vue mavon-editor
*
*/
<template>
  <div class="slideshow-wapper">
    <div class="slide-button">
      <el-button type="primary" @click="create">新建</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      class="slideshow-table"
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <el-carousel
            height="150px"
            v-if="scope.row.img && scope.row.img.length != 0"
          >
            <el-carousel-item v-for="item in scope.row.img" :key="item">
              <el-image :src="item">
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format("YYYY-DD-MM h:mm:ss a") }}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            @onConfirm="deleteRow(scope, tableData)"
            title="这是一段内容确定删除吗？"
          >
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="slide-button">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="新建小黑屋"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              action="#"
              list-type="picture-card"
              :http-request="httpRequest"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :limit="6"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog data-msg="放大的图片" :visible.sync="imgFlag">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createBlackList, getList, delBlack } from "@/api/black";
// import { conversionDate } from "@/utils/tools.js";
import { bannerTypeList, uploadImg } from "@/api/public";
export default {
  name: "Slideshow",
  components: {},
  data() {
    return {
      currentPage: 1, // 当前页
      total: 10, // 总页数
      loading: true,
      tableData: [],
      dialogVisible: false,

      ruleForm: {
        title: "",
        content: "",
      },
      picList: [],

      dialogImageUrl: "",
      imgFlag: false,
      disabled: false,
    };
  },
  created() {
    this.getSlider();
  },
  methods: {
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
    async create() {
      this.dialogVisible = true;
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
    async onSubmit() {
      const config = {
        data: {
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          pic: this.picList,
        },
      };
      const res = await createBlackList(config.data);
      if (res.code === 0) {
        this.dialogVisible = false;
        this.$refs["ruleForm"].resetFields();
        this.getSlider();
      }
    },

    /**
     * 覆盖默认上传事件，自定义上传
     */
    async httpRequest(data) {
      var formData = new FormData();
      formData.append("file", data.file);
      const res = await uploadImg(formData);
      if (res.code == 0) {
        this.picList.push(res.data.data.key);
      }
    },

    // 删掉图片
    handleRemove(file) {
      console.log(file);
    },
    /**
     * 上传成功
     */
    handleAvatarSuccess(res, file) {
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
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    /**
     * 删除轮播图
     */
    async deleteRow(index, rows) {
      this.loading = true;
      const config = {
        data: {
          blackId: index.row.blackId,
        },
      };
      const res = await delBlack(config.data);
      if (res.code === 0) {
        this.getSlider();
      }
    },
    /**
     * 创建轮播图
     */
    async createSlider() {
      const config = {
        data: {},
      };
      let res = await createBlackList();
    },
    /**
     * 获取
     */
    async getSlider() {
      const config = {
        data: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const res = await getList(config.data);
      if (res.code === 0) {
        this.currentPage = res.data.data.pageNum;
        this.total = res.data.data.total;
        this.tableData = res.data.data.items.map((item) => {
          return {
            title: item.title,
            content: item.content,
            img: item.urlList,
            createTime: item.createTime,
            creator: item.creator,
            blackId: item.blackId,
          };
        });
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
