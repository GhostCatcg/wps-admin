import Vue from 'vue'
import App from './App.vue'

// 引入MuseUI 由于官网插件做的不是那么好看，打入后宫，使用ant
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// 注入MuseUI
// Vue.use(MuseUI);

import router from '@/router' // 引入路由
// import store from '@/store'




// 使用Ant Design框架
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import AntDesign from 'ant-design-vue';
Vue.use(AntDesign);




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
