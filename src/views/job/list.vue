/**
*
* Author: GhostCat
* CreatDate: 2020-05-25 20:31:51
*
* Description: 职位页面
*
*/
<style lang='scss' scoped type='text/scss'>
.list-wapper {
  height: 100%;
}
</style>
<template>
  <a-card :bordered="false" class="slide-wapper">
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
      <span slot="createTime" slot-scope="text">{{ convertTime(text) }}</span>
      <span slot="action" slot-scope="text, record">
        <!-- <a @click="handleEdit(record.jobId)">编辑</a>
        <a-divider type="vertical" />-->
        <a-popconfirm title="确定要删除吗？" @confirm="() => handleDel(record.jobId)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <create-form ref="createModal" @refresh="getBlackList" />
  </a-card>
</template>

<script>
import CreateForm from './modules/CreateForm'
import { getList, delSlideShow } from '@/api/job'
export default {
  name: 'JobList',
  components: {
    CreateForm
  },
  data () {
    return {
      // 表头
      columns: [
        // {
        //   dataIndex: 'jobId', // 和数据匹配
        //   key: 'id',
        //   title: 'ID',
        //   scopedSlots: { customRender: 'id' }
        // },
        {
          dataIndex: 'title',
          key: 'type',
          title: '标题',
          scopedSlots: { customRender: 'type' }
        },
        // {
        //   dataIndex: 'content',
        //   key: 'name',
        //   title: '内容',
        //   scopedSlots: { customRender: 'name' }
        // },
        {
          dataIndex: 'station',
          key: 'station',
          title: '岗位',
          scopedSlots: { customRender: 'station' }
        },
        {
          dataIndex: 'treatment',
          key: 'treatment',
          title: '薪资',
          scopedSlots: { customRender: 'treatment' }
        },
        {
          dataIndex: 'address',
          key: 'address',
          title: '工作地点',
          scopedSlots: { customRender: 'address' }
        },
        {
          dataIndex: 'company',
          key: 'company',
          title: '公司名称',
          scopedSlots: { customRender: 'company' }
        },
        {
          dataIndex: 'createTime',
          key: 'createTime',
          title: '创建时间',
          width: 200,
          scopedSlots: { customRender: 'createTime' }
        },
        {
          dataIndex: 'phone',
          key: 'phone',
          title: '手机号',
          width: 200,
          scopedSlots: { customRender: 'phone' }
        },
        {
          dataIndex: 'creator',
          key: 'creator',
          title: '创建人',
          width: 100,
          scopedSlots: { customRender: 'creator' }
        },
        {
          dataIndex: 'sort',
          key: 'sort',
          title: '顺序',
          width: 100,
          scopedSlots: { customRender: 'sort' }
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
        pageSize: 10, // 每页中显示10条数据
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
    /**
     * 时间戳转换为时间
     */
    convertTime (time) {
      var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
      return date.toJSON().substr(0, 19).replace('T', ' ')
    },
    /**
     * 输入框搜索
     */
    onSearch () {
      console.log('搜索')
      this.searchLoadFlag = true
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
        'jobId': bannerId
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
