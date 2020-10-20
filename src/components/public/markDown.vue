/**
*
* Author: lvgc
* CreatDate: 2020-10-19 16:12:06
*
* Description: MD富文本编辑器
*
*/
<template>
  <div class="md-wapper">
    <mavon-editor
    class="md-main"
      ref="md"
      v-model="form.content"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
      :toolbars="toolbars"
    />
  </div>
</template>

<script>
import { uploadImg } from "@/api/public";

export default {
  name: "md",
  components: {},
  props: [],
  data() {
    return {
      form: {
        content: "",
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 添加图片
     */
    async handleEditorImgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      const res = await uploadImg(formdata);
      if (res.code == 0) {
        //  this.$Message.success("上传成功");
        console.log(res.data.data);
        let url = res.data.data.url;
        let name = $file.name;
        if (name.includes("-")) {
          name = name.replace(/-/g, "");
        }
        let content = this.form.content;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
        if (content.includes(name)) {
          let oStr = `(${pos})`;
          let nStr = `(${url})`;
          let index = content.indexOf(oStr);
          let str = content.replace(oStr, "");
          let insertStr = (soure, start, newStr) => {
            return soure.slice(0, start) + newStr + soure.slice(start);
          };
          this.form.content = insertStr(str, index, nStr);
        }
      } else {
        this.$Message.error(res.data.msg);
      }
    },
    /**
     * 删除图片
     */
    handleEditorImgDel(pos) {
      delete this.imgFile[pos];
    },
    /**
     * 删除内容
     */
    removeContent(){
        this.form.content = ''
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit("handleFormContent", newVal.content);
      },
      deep: true,
    },
  },
};
</script>
<style lang='scss' scoped type='text/scss'>
.md {
  height: 100%;
}
.md-main{
    // max-height: 50vh;
    &>div{
        height:100%;
    }
}
</style>
