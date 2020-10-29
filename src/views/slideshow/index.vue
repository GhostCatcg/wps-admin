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
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <div>
            {{ typeToText(scope.row.type) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <div class="demo-image__placeholder">
            <div class="block">
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
        <el-button type="primary" @click="onSubmit('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createSlideShow, listSlideShow, delSlideShow } from "@/api/slideshow";
import { uploadImg, bannerTypeList } from "@/api/public";
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

      imgSrc: "",
    };
  },
  created() {
    this.getSlider();
  },
  methods: {
    /**
     * 根据type 返回文字
     */
    typeToText(type) {
      var typeList = this.$store.getters.slideshowType;
      var data = typeList.filter((item) => {
        if(type == item.id){
            return true
        }
      });
      return data[0].name
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
     * 覆盖默认上传事件，自定义上传
     */
    async httpRequest(data) {
      var formData = new FormData();
      formData.append("file", data.file);
      const res = await uploadImg(formData);
      if (res.code == 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        // this.imgList.push(res.data.data);
        this.imgSrc = res.data.data.key;
      }
    },
    /**
     * 上传成功
     */
    handleAvatarSuccess(res, file) {
      console.log("上传成功");
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
    onSubmit(formName) {
      console.log("submit!");
      this.createSlider();
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
          bannerId: index.row.bannerId,
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
    async createSlider() {
      const config = {
        data: {
          type: this.ruleForm.region,
          name: this.ruleForm.name,
          content: this.ruleForm.desc,
          pic: this.imgSrc,
        },
      };
      let res = await createSlideShow(config.data);
      if (res.code == 0) {
        this.dialogVisible = false;
      }
    },
    async getSlider() {
      const config = {
        data: {
          pageNum: this.currentPage,
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
            bannerId: item.bannerId,
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
