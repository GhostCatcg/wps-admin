/**
*
* Author: lvgc
* CreatDate: 2020-07-30 20:56:29
*
* Description: 用户列表
*
*/

<template>
  <div class="slideshow-wapper">
    <el-table
      :data="tableData"
      v-loading="loading"
      class="slideshow-table"
      style="width: 100%"
    >
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <!-- <el-table-column prop="img" label="图片">
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
      </el-table-column> -->
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format("YYYY-DD-MM h:mm:ss a") }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="creator" label="创建人"></el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            @onConfirm="pullBlack(scope, tableData)"
            title="这是一段内容确定拉黑吗？"
          >
            <el-button slot="reference">拉黑</el-button>
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
        @current-change="pageChange"
      ></el-pagination>
    </div>

    <el-dialog
      title="新建轮播图"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
          <el-form-item label="所属页面" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所属页面">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="图片内容" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { userList, userStart, startStopList } from "@/api/userBlack";
// import { conversionDate } from "@/utils/tools.js";
import { bannerTypeList } from "@/api/public";

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

      options: [],
      value: "",
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
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleRemove(file) {
      console.log(file);
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
    async create() {
      this.dialogVisible = true;
      const res = await bannerTypeList();
      if (res.code === 0) {
        this.options = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
      }
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
    onSubmit() {
      console.log("submit!");
      this.dialogVisible = false;
    },
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    /**
     * 拉黑用户
     */
    async pullBlack(index, rows) {
      this.loading = true;
      const config = {
        data: {
          userId: index.row.userId,
        },
      };
      const res = await userStart(config.data);
      if (res.code === 0) {
        this.getUserList();
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
     * 页码发生改变
     */
    pageChange(page) {
      this.currentPage = page;
      this.getUserList();
    },
    /**
     * 获取
     */
    async getUserList() {
      const config = {
        data: {
          pageNum: this.currentPage,
          pageSize: 10,
        },
      };
      const res = await userList(config.data);
      if (res.code === 0) {
        console.log(res, "用户列表");
        this.currentPage = res.data.data.pageNum;
        this.total = res.data.data.total;
        this.tableData = res.data.data.items.map((item) => {
          return {
            name: item.name,
            sex: item.sex,
            phone: item.phone,
            content: item.requirement,
            avatar: item.pic,
            address: item.address,
            createTime: item.createTime,
            wx: item.wx,
            userId: item.userId,
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
