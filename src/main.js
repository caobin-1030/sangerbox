import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery' ;
import "bootstrap"
import './assets/bootstrap/dist/js/bootstrap.min.js';
import './assets/bootstrap/dist/css/bootstrap.min.css';
import sta from '../public/js/status.js'
import stomp from '../public/js/stomp.js'
import sockjs from '../public/js/sockjs.js'
import formCreate, {maker} from '@form-create/element-ui'
Vue.use(formCreate)
import Echarts from 'echarts'
import VueClipboard from 'vue-clipboard2'
import pako from 'pako'
Vue.use(VueClipboard)
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
var echarts = require('echarts');
require('echarts-wordcloud');
import wxlogin from 'vue-wxlogin';
Vue.component('my-component', {
    components: {
        wxlogin
    }
});
import MetaInfo from 'vue-meta-info' 

Vue.use(MetaInfo)
import { ApmVuePlugin } from '@elastic/apm-rum-vue'

// Vue.use(ApmVuePlugin, {
//   router,
//   config: {
//     serviceName: 'sanger-vue-apm',
//     serverUrl: 'http://calculate.mysci.online:9202/',
//   environment: 'production',
//   breakdownMetrics: true,
//   monitorLongtasks: true,
//   distributedTracingOrigins: ['http://calculate.mysci.online:9000']
//   }
// })
//然后再修改原型链
Vue.prototype.$axios = axios
Vue.prototype.axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI, { zIndex: 10101 });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
