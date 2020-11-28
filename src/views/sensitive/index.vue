/**
*
* Author: GhostCat
* CreatDate: 2020-11-28 13:31:03
*
* Description: 敏感词 
*
*/
/**
*
* Author: lvgc
* CreatDate: 2020-07-30 20:56:29
*
* Description: 外包消息
*
*/

<template>
  <div class="slideshow-wapper">
    <div class="slide-button1">
      <el-input
        placeholder="请输入敏感词搜索"
        v-model.trim="searchContent"
        class="input-with-select"
        @keyup.enter.native="searchVocabulary"
      >
        <el-button
          @click="searchVocabulary"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="create">新建</el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      class="slideshow-table"
      style="width: 100%"
    >
      <el-table-column prop="name" label="敏感词"></el-table-column>
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
        @current-change="pageChange"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="新建敏感词"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
          <el-form-item label="敏感词汇" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
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
import {
  wordCreate,
  wordList,
  wordDelete,
} from "@/api/sensitive";
// import { conversionDate } from "@/utils/tools.js";
import { bannerTypeList } from "@/api/public";

export default {
  name: "Slideshow",
  components: {
  },
  data () {
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
      },

      searchContent: '', // 敏感词搜索

      dialogImageUrl: "",
      imgFlag: false,
      disabled: false,
    };
  },
  created () {
    this.getSlider();
  },
  methods: {
    handleRemove (file) {
      console.log(file);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.imgFlag = true;
    },
    /**
     * 下载
     */
    handleDownload (file) {
      console.log(file);
    },
    async create () {
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
    resetForm (formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    /**
     * 提交表单
     */
    async onSubmit () {
      const config = {
        data: {
          name: this.ruleForm.name
        }
      }
      let res = await wordCreate(config.data)
      if (res.code === 0) {
      this.$refs['ruleForm'].resetFields();

          this.searchContent = ''
          this.getSlider()
        this.dialogVisible = false;

      }
    },
    /**
     * 关闭弹窗
     */
    handleClose (done) {
      done();
    },
    /**
     * 删除轮播图
     */
    async deleteRow (index, rows) {
      this.loading = true;
      const config = {
        data: {
          wrongWordId: index.row.wrongWordId,
        },
      };
      const res = await wordDelete(config.data);
      if (res.code === 0) {
        this.getSlider();
      }
    },
    /**
     * 创建轮播图
     */
    async createSlider () {
      const config = {
        data: {},
      };
      let res = await wordCreate();
    },
    /**
     * 页码发生改变
     */
    pageChange (page) {
      this.currentPage = page;
      this.loading = true;
      this.getSlider();
    },
    /**
     * 搜索词汇
     */
    searchVocabulary () {
      this.currentPage = 1;
      this.getSlider();
    },
    /**
     * 获取
     */
    async getSlider () {
      const config = {
        data: {
          pageNum: this.currentPage,
          pageSize: 10,
          name: this.searchContent
        },
      };
      const res = await wordList(config.data);
      if (res.code === 0) {
        this.currentPage = res.data.data.pageNum;
        this.total = res.data.data.total;
        this.tableData = res.data.data.items.map((item) => {
          return {
            name: item.name,
            createTime: item.createTime,
            creator: item.creator,
            wrongWordId: item.wrongWordId,
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
