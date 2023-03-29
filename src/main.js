import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Form,FormItem } from 'element-ui'
import { Button, Input , Message ,Table,TableColumn,Pagination} from 'element-ui';

Vue.component(Button.name,Button)
Vue.component(Input.name,Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.prototype.$message = Message;
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
