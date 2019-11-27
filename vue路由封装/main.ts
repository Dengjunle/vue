import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';
import api from './request';

Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
