import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import { routes } from './routes';
import store from './store/index';

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
