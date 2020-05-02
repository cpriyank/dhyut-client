import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
// consider removing this
import VueCookie from 'vue-cookie';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
// import store from './store';

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:5000'),
}));
Vue.use(BootstrapVue);
Vue.use(VueCookie);
// Vue.use(VueSocketIO);

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: (h) => h(App),
}).$mount('#app');
