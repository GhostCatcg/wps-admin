
/**
*
* Author: GhostCat
* CreatDate: 2020-04-20 17:50:40
*
* Description: 添加轮播图
*
*/
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
<template>
  <a-modal
    title="新增轮播图"
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
            v-model="sort"
            v-decorator="['sort', {rules: [{required: true, message: '请输入轮播图的顺序'}]}]"
            @change="onChange"
          />
        </a-form-item>
        <a-form-item label="所属页面" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select defaultValue="index" style="width: 120px" @change="handleChange">
            <a-select-option value="index">首页</a-select-option>
            <a-select-option value="community">社区</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="图片名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['desc', {rules: [{required: true, min: 3, message: '请输入至少三个字符的规则描述！'}]}]"
          />
        </a-form-item>

        <a-form-item label="图片内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-item>

        <a-form-item label="选择图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            :customRequest="customUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
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
import { createSlideShow } from '@/api/home'
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
    add () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    async handleSubmit () {
      const formdata = new FormData()
      formdata.append('file', this.file.file)
      this.confirmLoading = true
      const res = await uploadImg(formdata)
      if (res.code === 0) {
        // 上传完图片之后需要 需要再次上传拿到的key
        const keyConfig = {
          data: {
            type: 10, // 所属类型 10是首页的轮播图
            name: 'name', // 名称
            content: 'content', // 内容
            pic: res.data.data.key, // 图片key
            sort: 1 // 代表
          }
        }
        const result = await createSlideShow(keyConfig.data)
        if (result.code === 0) {
          this.confirmLoading = false
          this.loading = false
          this.visible = false
          this.$emit('refresh')
        }
      }
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      }
    },
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
