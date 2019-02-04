import Vue from 'vue';
import App from '@/App';
import router from './router';
import store from './store';
import './permission';
import './styles/base.scss';
import './theme';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
