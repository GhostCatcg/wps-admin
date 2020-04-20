/**
*
* Author: GhostCat
* CreatDate: 2020-04-20 17:50:40
*
* Description: 轮播图配置
*
*/
<style lang="scss">
.slide-wapper{

  th ,
  td {
  text-align: center !important;
}
.slide-photo{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 60px;
    object-fit: contain;
  }
}
.table-operator{
  margin-bottom:20px;
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

    <a-table bordered :columns="columns" :dataSource="data">
      <div class="slide-photo" slot="photo" slot-scope="text">
        {{text}}
        <img :src="text" alt="">
      </div>
      <span slot="action">
        <a>编辑</a>
        <a-divider type="vertical" />
        <a>删除</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">
          更多
          <a-icon type="down" />
        </a>
      </span>
    </a-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import CreateForm from './modules/CreateForm'
import { createSlideShow, updateSlideShow, listSlideShow } from '@/api/home'
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
          dataIndex: 'key',
          key: 'key',
          title: '序号',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '图片',
          dataIndex: 'photo',
          key: 'photo',
          scopedSlots: { customRender: 'photo' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
            key: '1',
            photo: '@/assets/logo.png',
            address: 'New York No. 1 Lake Park'
          },
          {
            key: '2',
            photo: '@/assets/logo.png',
            address: 'London No. 1 Lake Park'
          },
          {
            key: '3',
            photo: '@/assets/logo.png',
            address: 'Sidney No. 1 Lake Park'
          }
      ]
    }
  },
  created () {
    this.detailSlide()
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
    async detailSlide () {
      const config = {
        data: {
          pageNum: 1,
          pageSize: 10
        }
      }
      console.log(config.data)
      const res = await listSlideShow(config.data)
      console.log(res)
      console.log(res.data.data)
      // res.data.data.items
      console.log(res)
    }
  }
}
</script>
