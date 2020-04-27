import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'

import Homework from '../components/homeworkEvaluation.vue'
import Upload from '../components/uploadHomework.vue'
import Select from '../components/SelectWord.vue'
import SelectedWord from '../components/SelectedWord.vue'
import SelectedDetail from '../components/SelectedDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Frame,
    redirect: '/evaluation',
    children: [
      { path: '/evaluation', component: Homework },
      { path: '/upload', component: Upload },
      { path: '/select', component: Select },
      { path: '/selectedword', component: SelectedWord },
      { path: '/detail', component: SelectedDetail }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
