<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="switch">
      <el-button @click="switchReview">切换审核状态</el-button>
    </div>
    <div class="search" v-if="false">
      <el-input
        placeholder="请输入要搜索的内容"
        v-model="searchContent"
        class="input-with-select"
        @keyup.enter.native="search"
      >
        <el-button
          @click="search"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <!-- 路径显示 -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="user.avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <router-link to="/avatar">
            <el-dropdown-item> 修改头像 </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      :title="`${this.searchContent} 的搜索结果`"
      :visible.sync="searchFlag"
      width="100%"
      :before-close="handleClose"
      custom-class="el-search"
    >
      <div>
        <el-table :data="gridData">
          <el-table-column
            property="invitTypeName"
            label="类型"
            width="150"
          ></el-table-column>
          <el-table-column
            property="title"
            label="标题"
            width="200"
          ></el-table-column>
          <el-table-column property="content" label="内容"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleComment(scope)" slot="reference"
                >查看评论</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                @onConfirm="deleteRow(scope)"
                title="这是一段内容确定删除吗？"
              >
                <el-button slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 50px"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="pageNum"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeSearch">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="`查看评价`"
      :visible.sync="evaluationFlag"
      width="100%"
      :before-close="handleCloseEva"
      custom-class="el-search"
    >
      <div>
        <el-table :data="evaluationData">
          <el-table-column
            property="creator"
            label="发表人"
            width="150"
          ></el-table-column>
          <el-table-column
            property="topicContent"
            label="内容"
          ></el-table-column>
          <el-table-column prop="createTime" label="时间">
            <template slot-scope="scope">
              {{ $moment(scope.row.createTime).format("YYYY-DD-MM h:mm:ss a") }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                @onConfirm="deleteEvaRow(scope)"
                title="这是一段内容确定删除吗？"
              >
                <el-button slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="false"
          style="margin-top: 50px"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="pageNum"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeSearchEva">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import {
  updateHour,
  searchKeyWord,
  listTopicTree,
  delTopic,
  deleteArticle,
} from "@/api/public";
import { getAvatar } from "@/api/user";
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      searchContent: "", // 搜索内容
      searchResults: "", // 搜索结果
      searchFlag: false, // 搜索弹窗

      pageNum: 1,
      pageSize: 10,
      total: 1,

      eduPageNum: 1,
      eduPageSize: 10,
      eduTotal: 1,

      gridData: [],

      evaluationFlag: false, // 查看评价弹窗
      evaluationData: [], // 评价数据
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    ...mapState(["user"]),
  },
  created() {
  },
  methods: {
    /**
     * 查看评论
     */
    async handleComment(scope) {
      console.log(scope);
      const config = {
        data: {
          invitId: scope.row.id,
        },
      };
      let res = await listTopicTree(config.data);
      if (res.code == 0) {
        this.evaluationData = res.data.data;
        this.evaluationFlag = true;
      }
    },
    /**
     * 删除文章
     */
    async deleteRow(scope) {
      console.log(scope);
      const config = {
        data: {
          invitId: scope.row.id,
        },
      };
      let res = await deleteArticle(config.data);
      if (res.code == 0) {
        this.search();
      }
    },
    /**
     * 删除评价
     */
    async deleteEvaRow(scope) {
      console.log(scope);
      const config = {
        data: {
          invitTopicId: scope.row.invitTopicId,
        },
      };
      let res = await delTopic(config.data);
      if (res.code == 0) {
        this.evaluationFlag = false;
        this.search();
      }
    },
    /**
     * 关闭弹窗
     */
    closeSearch() {
      this.searchFlag = false;
      this.pageNum = 1;
    },
    /**
     * 关闭评价弹窗
     */
    closeSearchEva() {
      this.evaluationFlag = false;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    changePage(val) {
      //   console.log(this.pageNum, val);
      this.pageNum = val;
      this.search();
    },
    /**
     * 切换审核状态
     */
    async switchReview() {
      const res = await updateHour();
      if (res.code === 0) {
        this.$message({
          message: res.data.data == 24 ? "当前为审核模式" : "当前为不审核模式",
          type: "success",
        });
      }
    },
    /**
     * search
     */
    async search() {
      if (this.searchContent == "") {
        this.$message({
          message: "请输入内容",
          type: "warning",
        });
        return false;
      }
      const config = {
        data: {
          keyWord: this.searchContent,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      };
      const res = await searchKeyWord(config.data);
      if (res.code == 0) {
        if (res.data.data[0].pageVo.total == 0) {
          this.$message("没有搜索到内容");
        } else {
          this.searchResults = res.data.data[0].pageVo;
          this.total = this.searchResults.total;
          this.pageNum = this.searchResults.pageNum;
          this.pageSize = this.searchResults.pageSize;
          this.gridData = this.searchResults.items;
          this.searchFlag = true;
        }
      }
    },
    /**
     * 关闭评价弹窗
     */
    handleCloseEva() {
      this.evaluationFlag = false;
    },
    /**
     * 关闭搜索弹窗
     */
    handleClose() {
      console.log("close");
      this.pageNum = 1;
      this.searchFlag = false;
    },
  },
};
</script>
<style lang="scss">
.el-search {
  height: 100%;
  margin-top: 0 !important;
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .search,
  .switch {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    margin-left: 20px;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
