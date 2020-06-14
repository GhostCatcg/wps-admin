
/**
*
* Author: GhostCat
* CreatDate: 2020-04-20 17:50:40
*
* Description: 编辑轮播图
*
*/
<template>
  <a-modal
    :title="popTitle"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            id="inputNumber"
            :min="1"
            v-decorator="['sort', {rules: [{required: true, message: '请输入轮播图的顺序'}]}]"
          />
        </a-form-item>

        <a-form-item label="所属页面" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            defaultValue="index"
            style="width: 120px"
            v-decorator="['belong', {rules: [{required: true}]}]"
          >
            <a-select-option value="10">首页</a-select-option>
            <a-select-option value="20">社区</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="图片名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', {rules: [{required: true,message: '请输入图片名称'}]}]" />
        </a-form-item>

        <a-form-item label="图片内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            type="textarea"
            v-decorator="['content', {rules: [{required: true,message: '请输入图片内容'}]}]"
          />
        </a-form-item>

        <a-form-item label="选择图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            :customRequest="customUpload"
            v-decorator="['slide', {rules: [{required: true, message: '请上传图片'}]}]"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="slide" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { uploadImg } from '@/api/public'
import { createSlideShow, detailSlideShow } from '@/api/home'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    popTitle: {
      type: String,
      default: () => {
        return '新增轮播图'
      }
    }
  },
  data () {
    return {
      loading: false,
      imageUrl: '',
      file: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    /**
     * 点击新建弹出来的框
     */
    add () {
      this.visible = true
    },
    /**
     * 点击编辑弹出来的框
     */
    edit (bannerId) {
      this.visible = true
      console.log('修改轮播图的id', bannerId)
      this.getBanner(bannerId)
    },
    /**
     * 获取轮播图详情
     */
    async getBanner (id) {
      const config = {
        data: {
          bannerId: id
        }
      }
      const res = await detailSlideShow(config.data)
      if (res.code === 0) {
        console.log(res)
      }
    },
    /**
     * 关闭按钮
     */
    handleCancel () {
      this.visible = false
      this.form.resetFields() // 清空表单
      this.imageUrl = ''
    },
    async handleSubmit (e) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const formdata = new FormData()
          formdata.append('file', this.file.file)
          // formdata.append('file', values.slide.file)
          this.confirmLoading = true
          const res = await uploadImg(formdata)
          if (res.code === 0) {
            // 上传完图片之后需要 需要再次上传拿到的key
            const keyConfig = {
              data: {
                type: values.belong, // 所属类型 10是首页的轮播图
                name: values.name, // 名称
                content: values.content, // 内容
                pic: res.data.data.key, // 图片key
                sort: values.sort // 排序
              }
            }
            const result = await createSlideShow(keyConfig.data)
            if (result.code === 0) {
              this.confirmLoading = false
              this.loading = false
              this.visible = false
              this.$emit('refresh') // 重新获取列表
              this.imageUrl = ''
              this.form.resetFields()
            }
          }
        } else {
          console.log('有些东西没填写')
        }
      })
    },
    // 文件上传被修改
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      }
    },
    // 图片上传的一个检索，大于2M不予上传
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片超过2M，请重新选择')
        return false
      }
      return true
    },
    // 自定义上传
    customUpload (file) {
      this.file = file
      getBase64(file.file, imageUrl => {
        this.imageUrl = imageUrl
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader > .ant-upload {
  width: 200px;
  height: 128px;
  img {
    width: 100%;
    object-fit: contain;
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
