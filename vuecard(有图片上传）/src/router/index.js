import Vue from 'vue'
import Router from 'vue-router'
import addmp from '@/components/addmp'
import mpdetail from '@/components/mpdetail'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'addmp',
      component: addmp
    },
    {
      path: '/mpdetail',
      name: 'mpdetail',
      component: mpdetail
    }
  ]
})
