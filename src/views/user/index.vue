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
    <el-input
      placeholder="请输入姓名搜索"
      v-model.trim="searchContent"
      class="input-with-select"
    >
      <el-button
        @click="searchUser"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
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
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex == 10 ? "女" : "男" }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="拉黑">
        <template slot-scope="scope">
          {{ scope.row.status == 201 ? "黑用户" : "白用户" }}
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format("YYYY-DD-MM h:mm:ss a") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            @onConfirm="pull(scope, scope.row.status)"
            :title="`这是一段内容确定${
              scope.row.status == 201 ? '启用' : '拉黑'
            }吗？`"
          >
            <el-button slot="reference">{{
              scope.row.status == 201 ? "启用" : "拉黑"
            }}</el-button>
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
import { userList, userStart, userStop, startStopList } from "@/api/userBlack";
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

      searchContent: "",

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
    pull(data, val) {
      if (val == 10) {
        this.pullBlack(data);
      } else if (val == 201) {
        this.pullWhite(data);
      }
    },
    /**
     * 拉黑用户
     */
    async pullBlack(data) {
      this.loading = true;
      const config = {
        data: {
          userId: data.row.userId,
        },
      };
      const res = await userStop(config.data);
      if (res.code === 0) {
        this.getUserList();
      }
    },
    /**
     * 拉白用户
     */
    async pullWhite(data) {
      this.loading = true;
      const config = {
        data: {
          userId: data.row.userId,
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
     * 搜索用户
     */
    searchUser() {
      this.currentPage = 1;
      this.getUserList();
    },
    /**
     * 页码发生改变
     */
    pageChange(page) {
      this.currentPage = page;
      this.loading = true;
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
          name: this.searchContent,
        },
      };
      const res = await userList(config.data);
      if (res.code === 0) {
        // console.log(res, "用户列表");
        this.currentPage = res.data.data.pageNum;
        this.total = res.data.data.total;
        this.tableData = res.data.data.items.map((item) => {
          return {
            name: item.name,
            sex: item.sex,
            phone: item.phone,
            content: item.requirement,
            avatar: item.url,
            address: item.address,
            createTime: item.createTime,
            wx: item.wx,
            userId: item.userId,
            status: item.status,
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
