
/**
*
* Author: GhostCat
* CreatDate: 2020-04-20 17:50:40
*
* Description: 创建黑名单
*
*/
<template>
  <a-modal
    title="新增黑名单"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            id="inputNumber"
            option.initialValue="1"
            :min="1"
            v-decorator="['sort', {rules: [{required: true, message: '请输入黑名单顺序'}]}]"
          />
        </a-form-item> -->
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title', {rules: [{required: true,message: '请输入标题'}]}]" />
        </a-form-item>

        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            type="textarea"
            v-decorator="['content', {rules: [{required: true,message: '请输入内容'}]}]"
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
import { createBlackList, detailSlideShow } from '@/api/black'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
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
      this.getBanner(bannerId)
    },
    /**
     * 获取轮播图详情
     */
    async getBanner (bannerId) {
      const config = {
        bannerId
      }
      const res = await detailSlideShow(config)
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
      console.log(this.form)
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const formdata = new FormData()
          formdata.append('file', this.file.file)
          this.confirmLoading = true
          const res = await uploadImg(formdata) // 上传图片
          console.log('表单数据', res)
          console.log(values, '\n', res.data)
          if (res.code === 0) {
            // 上传完图片之后需要 需要再次上传拿到的key
            console.log('图片上传成功')
            const keyConfig = {
              data: {
                title: values.title, // 黑名单标题
                content: values.content, // 内容
                pic: [res.data.data.key], // 图片key
                sort: values.sort // 排序
              }
            }
            const result = await createBlackList(keyConfig.data)
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
