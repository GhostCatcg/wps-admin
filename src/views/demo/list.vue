/**
*
* Author: GhostCat
* CreatDate: 2020-05-25 20:36:52
*
* Description: 练习生
*
*/

<style lang='scss' scoped type='text/scss'>
.list-wapper {
  height: 100%;
}
</style>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
<template>
  <a-card :bordered="false" class="slide-wapper">
    <a-carousel :after-change="onChange">
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </a-carousel>
    <div class="table-operator">
      <a-input-search
        v-show="false"
        placeholder="请输入关键字"
        enter-button
        style="width: 200px;"
        :loading="searchLoadFlag"
        @search="onSearch"
      />
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    </div>
    <a-table
      bordered
      :dataSource="dataList"
      :columns="columns"
      :pagination="pagination"
      :loading="tableLoading"
      @change="tableChange"
    >
      <!-- <div class="slide-photo" slot="url" slot-scope="text">
        <img :src="text" alt />
      </div>-->
      <div slot="content">
        <a-carousel :after-change="onChange">
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </a-carousel>
      </div>
      <span slot="action" slot-scope="text, record">
        <!-- <a @click="handleEdit(record.outerId)">编辑</a>
        <a-divider type="vertical" />-->
        <a-popconfirm title="确定要删除吗？" @confirm="() => handleDel(record.outerId)">
          <a>删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm title="设为精选？" @confirm="() => setFeatured(record.outerId)">
          <a>设为精选</a>
        </a-popconfirm>
      </span>
    </a-table>
    <create-form ref="createModal" @refresh="getBlackList" />
  </a-card>
</template>

<script>
import CreateForm from './modules/CreateForm'
import { createSlideShow, updateSlideShow, getList, delSlideShow } from '@/api/demo'
export default {
  name: 'demoList',
  components: {
    CreateForm
  },
  data () {
    return {
      // 表头
      columns: [
        // {
        //   dataIndex: 'creatorId', // 和数据匹配
        //   key: 'id',
        //   title: 'ID',
        //   scopedSlots: { customRender: 'id' }
        // },
        {
          dataIndex: 'typeName', // 和数据匹配
          key: 'type',
          title: '类型',
          scopedSlots: { customRender: 'type' }
        },
        {
          dataIndex: 'title',
          key: 'type',
          title: '标题',
          width: 100,
          scopedSlots: { customRender: 'type' }
        },
        {
          dataIndex: 'requirement',
          key: 'content',
          title: '内容',
          scopedSlots: { customRender: 'content' }
        },
        {
          dataIndex: 'creator',
          key: 'creator',
          title: '创建人',
          width: 100,
          scopedSlots: { customRender: 'creator' }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataList: [],
      pagination: {
        total: 0,
        pageSize: 10, // 每页中显示5条数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
      },
      pageOption: {
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      searchLoadFlag: false
    }
  },
  created () {
    this.getBlackList()
  },
  methods: {
    onChange (a, b, c) {
      console.log(a, b, c)
    },
    /**
     * 输入框搜索
     */
    onSearch () {
      console.log('搜索')
      this.searchLoadFlag = true
    },
    createSlide () {
      console.log('新建')
      createSlideShow()
    },
    updateSlide () {
      console.log('更新')
      updateSlideShow()
    },
    ok () {
      console.log('点击确定')
    },
    // 编辑元素
    handleEdit (bannerId) {
      console.log(bannerId)
      this.$notification.open({
        message: '正在抓紧开发中...',
        description:
          '先去玩把英雄联盟再来吧！',
        icon: <a-icon type="smile" style="color: #108ee9" />
      })
      // this.$refs.createModal.edit(bannerId)
    },
    /**
     * 设为精选
     */
    setFeatured (id) {
      console.log(id)
    },
    // 删除元素
    async handleDel (bannerId) {
      this.tableLoading = true
      const data = {
        'exceciseId': bannerId
      }
      const res = await delSlideShow(data)
      if (res.code === 0) {
        this.$message.success('删除成功')
        this.getBlackList()
      }
    },
    // 分页、排序、筛选变化时触发
    tableChange (e) {
      this.pageOption.pageNum = e.current
      this.pageOption.pageSize = e.pageSize
      this.getBlackList()
    },
    // 获取黑名单列表
    async getBlackList () {
      // const key = 'updatable'
      // this.$message.loading({ content: '加载中...', key })
      this.tableLoading = true
      const config = {
        data: this.pageOption
      }
      const res = await getList(config.data)
      if (res.code === 0) {
        this.dataList = res.data.data.items
        this.pagination.pageSize = res.data.data.pageSize
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      }
    }
  }
}
</script>
