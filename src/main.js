import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
// consider removing this
import VueCookie from 'vue-cookie';
import App from './App.vue';
import router from './router';
// import store from './store';

Vue.use(BootstrapVue);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: (h) => h(App),
}).$mount('#app');
