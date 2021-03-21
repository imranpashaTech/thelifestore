import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import ToggleButton from 'vue-js-toggle-button'
import store from '@/store/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { currency } from './currency'


import './icons';


// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


Vue.config.productionTip = false
Vue.use(ToggleButton)
Vue.filter('currency', currency)


Vue.prototype.$productWatchList = [];
Vue.prototype.$selected_download = [];
Vue.prototype.$first_status = 1;
Vue.prototype.$store_app_data = {};
Vue.prototype.$store_sel_product = {};
Vue.prototype.$store_sel_product_pos;

library.add(faUserSecret)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
