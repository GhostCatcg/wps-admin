import Vue from 'vue'
import App from './App.vue'

// 引入MuseUI
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

// 注入MuseUI
Vue.use(MuseUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
