/**
*
* Author: GhostCat
* CreatDate: 2020-04-20 17:50:40
*
* Description: 轮播图配置
*
*/
<style lang="scss" scoped>
.slide-wapper {
  th,
  td {
    text-align: center !important;
  }
  .slide-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 60px;
      object-fit: contain;
    }
  }
  .table-operator {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<template>
  <a-card :bordered="false" class="slide-wapper">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
    </div>

    <a-table
      bordered
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="tableLoading"
      @change="tableChange"
    >
      <p slot="type" slot-scope="text">{{ text == 10 ? '首页' : '社区' }}</p>
      <p slot="name" slot-scope="text">{{ text }}</p>
      <div class="slide-photo" slot="url" slot-scope="text">
        <img :src="text" alt />
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record.bannerId)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定要删除吗？" @confirm="() => handleDel(record.bannerId)">
          <a>删除</a>
        </a-popconfirm>
        <!-- <a-divider type="vertical" />
        <a class="ant-dropdown-link">
          更多
          <a-icon type="down" />
        </a>-->
      </span>
    </a-table>
    <create-form ref="createModal" @refresh="slideList" />
  </a-card>
</template>

<script>
import CreateForm from './modules/CreateForm'
import { createSlideShow, updateSlideShow, listSlideShow, delSlideShow } from '@/api/home'
export default {
  name: 'SlideShow',
  components: {
    CreateForm
  },
  data () {
    return {
      // 表头
      columns: [
        {
          dataIndex: 'sort',
          key: 'sort',
          title: '排序',
          scopedSlots: { customRender: 'sort' }
        },
        {
          dataIndex: 'type',
          key: 'type',
          title: '类型',
          scopedSlots: { customRender: 'type' }
        },
        {
          dataIndex: 'name',
          key: 'name',
          title: '名称',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '图片',
          dataIndex: 'url',
          key: 'url',
          scopedSlots: { customRender: 'url' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      pagination: {
        total: 0,
        pageSize: 5, // 每页中显示5条数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
      },
      pageOption: {
        pageNum: 1,
        pageSize: 5
      },
      tableLoading: false
    }
  },
  created () {
    this.slideList()
  },
  methods: {
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
    // 删除元素
    async handleDel (bannerId) {
      this.tableLoading = true
      const data = {
        'bannerId': bannerId
      }
      const res = await delSlideShow(data)
      if (res.code === 0) {
        this.$message.success('删除成功')
        this.slideList()
      }
    },
    // 分页、排序、筛选变化时触发
    tableChange (e) {
      this.pageOption.pageNum = e.current
      this.pageOption.pageSize = e.pageSize
      this.slideList()
    },
    // 获取轮播图列表
    async slideList () {
      // const key = 'updatable'
      // this.$message.loading({ content: '加载中...', key })
      this.tableLoading = true
      const config = {
        data: this.pageOption
      }
      const res = await listSlideShow(config.data)
      if (res.code === 0) {
        // this.$message.success({ content: '加载成功', key, duration: 2 })
        this.data = res.data.data.items
        this.pagination.pageSize = res.data.data.pageSize
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      }
    }
  }
}
</script>
