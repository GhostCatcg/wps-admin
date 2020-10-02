/**
*
* Author: lvgc
* CreatDate: 2020-07-30 21:03:54
*
* Description: 作品展示
*
*/

<template>
  <div class="slideshow-wapper">
    <!-- <div class="slide-button">
      <el-button type="primary" @click="create">新建</el-button>
    </div>-->
    <el-table
      :data="tableData"
      v-loading="loading"
      class="slideshow-table"
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="img" label="图片" width="400">
        <template slot-scope="scope">
          <el-carousel height="150px" v-if="scope.row.img && scope.row.img.length != 0">
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
          <!-- <el-link
            slot="reference"
            @click="HandleViewReviews(scope, tableData)"
            type="primary"
            >查看评论</el-link
          >
          <el-divider direction="vertical"></el-divider> -->
          <el-popconfirm
            v-if="true"
            @onConfirm="setFeatured(scope, tableData)"
            title="确定设为精选？"
          >
            <el-link slot="reference" type="primary">设为精选</el-link>
          </el-popconfirm>
          <el-popconfirm
            v-else
            @onConfirm="delFeatured(scope, tableData)"
            title="确定取消精选？"
          >
            <el-link slot="reference" type="primary">取消精选</el-link>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            @onConfirm="deleteRow(scope, tableData)"
            title="这一段内容确定删除吗？"
          >
            <el-link slot="reference" type="primary">删除</el-link>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  createBlackList,
  getList,
  delSlideShow,
  bannerTypeList,
  creamDemo,
  delCreamDemo,
  listTopicTree
} from "@/api/demo";
// import { conversionDate } from "@/utils/tools.js";
export default {
  name: "Slideshow",
  components: {},
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
     * 查看评价
     */
    async HandleViewReviews (index, rows) {
      const config = {
        data: {
          opusId: rows[0].opusId
        }
      }
      const res = await listTopicTree(config.data);
      if (res.code === 0) {
        console.log(res)
      }
    },
    /**
     * 取消精选
     */
    async delFeatured (index, rows) {
      const config = {
        data: {
          opusId: rows[0].opusId
        }
      }
      const res = await delCreamDemo(config.data);
      if (res.code === 0) {
        console.log(res)
      }
    },
    /**
     * 设为精选
    */
    async setFeatured (index, rows) {
      console.log(index, rows)
      const config = {
        data: {
          opusId: rows[0].opusId
        }
      }
      const res = await creamDemo(config.data);
      if (res.code === 0) {
        console.log(res)
      }
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
    onSubmit () {
      console.log("submit!");
      this.dialogVisible = false;
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
          opusId: index.row.opusId,
        },
      };
      const res = await delSlideShow(config.data);
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
      let res = await createBlackList();
    },
    /**
     * 获取
     */
    async getSlider () {
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
            opusId: item.opusId,
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
