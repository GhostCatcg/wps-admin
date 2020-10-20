/**
*
* Author: lvgc
* CreatDate: 2020-07-30 20:59:52
*
* Description: 练习生
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
      <el-table-column prop="content" label="内容">
        <template slot-scope="scope">
          <el-link @click="seeContent(scope.row.content)" type="primary"
            >查看内容</el-link
          >
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
          <!-- <el-popconfirm
            @onConfirm="delFeatured(scope, tableData)"
            title="确定取消精选？"
          >
            <el-link slot="reference" type="primary">推荐</el-link>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider> -->

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

    <el-dialog
      title="新建练习生"
      :visible.sync="dialogVisible"
      width="100%"
      height="100%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="el-md-class"
    >
      <div class="el-main">
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <mark-down
            red="md"
            @handleFormContent="handleFormContent"
          ></mark-down>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="createExcecise">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="查看练习生"
      :visible.sync="lookVisible"
      width="100%"
      :before-close="handleLookClose"
      :close-on-click-modal="false"
      custom-class="el-md-look-class"
    >
      <show-md :readmeContent="readmeContent"></show-md>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  createExceciseList,
  getList,
  delSlideShow,
  bannerTypeList,
} from "@/api/trainee";
// import { conversionDate } from "@/utils/tools.js";
import { uploadImg } from "@/api/public";
import markDown from "@/components/public/markDown";
import showMd from "@/components/public/showMd";

export default {
  name: "Slideshow",
  components: {
    markDown,
    showMd,
  },
  data() {
    return {
      currentPage: 1, // 当前页
      total: 10, // 总页数
      loading: true,
      tableData: [],
      dialogVisible: false,
      lookVisible: false,
      readmeContent: "",

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
    /**
     * seeContent 查看md内容
     */
    seeContent(con) {
      this.lookVisible = true;
      this.readmeContent = con;
    },
    handleLookClose() {
      this.lookVisible = false;
      this.readmeContent = "";
    },
    /**
     * 设置 from 的content值
     */
    handleFormContent(val) {
      console.log("from接收到的值", val);
      this.ruleForm.content = val;
    },
    // 删掉图片
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
    /**
     * 新建练习生窗口
     */
    create() {
      this.dialogVisible = true;
    },
    /**
     * 创建练习生
     */
    async createExcecise() {
      const config = {
        data: {
          title: this.ruleForm.title,
          content: this.ruleForm.content,
          pic: this.picList,
        },
      };
      const res = await createExceciseList(config.data);
      if (res.code === 0) {
        console.log(res, "上传之后");
        this.dialogVisible = false;
        this.$refs["ruleForm"].resetFields();
        this.$refs.md.removeContent();
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
     * 重置表单
     */
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    /**
     * 删除列
     */
    async deleteRow(index, rows) {
      this.loading = true;
      const config = {
        data: {
          exceciseId: index.row.exceciseId,
        },
      };
      const res = await delSlideShow(config.data);
      if (res.code === 0) {
        this.getSlider();
      }
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
            exceciseId: item.exceciseId,
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
<style lang="scss">
.el-md-class {
  height: 100%;
  margin-top: 0 !important;
  overflow: auto;
  //   ::v-deep {
  .el-dialog__footer {
    padding: 10px 40px 20px;
  }
  .el-dialog__header {
    padding: 20px 40px 10px;
    .el-dialog__headerbtn {
      right: 40px;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  //   }
}

.el-md-look-class {
  height: 100%;
  margin-top:0 !important;
  overflow: auto;
  .el-dialog__footer {
    padding: 10px 40px 20px;
  }
  .el-dialog__header {
    padding: 20px 40px 10px;
    .el-dialog__headerbtn {
      right: 40px;
    }
  }
  .el-dialog__body {
    padding: 10px 20px 50px;
  }
}
</style>
<style lang="scss" scoped>
@import "./index.scss";
</style>
