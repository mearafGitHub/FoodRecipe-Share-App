import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import {
  FormFile
} from 'bootstrap-vue/es/components';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import store from './store/store'
import {  sync } from 'vuex-router-sync'

//Vue.prototype.$bus = new Vue({});
Vue.use(VueRouter);
Vue.use(FormFile);

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(Vuetify);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')