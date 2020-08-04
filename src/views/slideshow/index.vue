<template>
  <div class="slideshow-wapper">
    <el-button type="primary">主要按钮</el-button>
    <el-table :data="tableData" v-loading="loading" class="slideshow-table" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <div class="demo-image__placeholder">
            <div class="block">
              <!-- :preview-src-list="scope.row.img" -->
              <el-image :src="scope.row.img">
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期"></el-table-column>
      <el-table-column prop="creator" label="创建人"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="deleteRow(scope, tableData)" type="text" size="small">移除</el-button> -->

          <el-popover placement="top" width="160" v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click.native.prevent="deleteRow(scope, tableData)"
              >确定</el-button>
            </div>
            <el-button slot="reference" @click="visible = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :current-page="currentPage" :total="total"></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createSlideShow, listSlideShow } from "@/api/slideshow";
export default {
  name: "Slideshow",
  data() {
    return {
      currentPage: 1, // 当前页
      total: 10, // 总页数
      visible: false,
      loading: true,
      tableData: [],
    };
  },
  created() {
    this.getSlider();
  },
  methods: {
    /**
     * 删除轮播图
     */
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      console.log(index, rows);
    },
    /**
     * 创建轮播图
     */
    async createSlider() {
      const config = {
        data: {},
      };
      let res = await createSlideShow();
    },
    async getSlider() {
      const config = {
        data: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const res = await listSlideShow(config.data);
      if (res.code === 0) {
        this.currentPage = res.data.data.pageNum;
        this.total = res.data.data.total;
        this.tableData = res.data.data.items.map((item) => {
          return {
            name: item.name,
            type: item.type,
            img: item.url,
            createTime: item.createTime,
            creator: item.creator,
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
@import "./index";
</style>
