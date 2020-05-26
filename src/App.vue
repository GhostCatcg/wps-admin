<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
@import './assets/scss/all';

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
// <!--修改 滚动条的 下面 的 样式-->
::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
  border-radius: 20px;
}
// <!--修改 滑块 -->
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 20px;
}
</style>
