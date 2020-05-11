import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'
import Frame2 from '../views/Frame2.vue'
import Homework from '../components/homeworkEvaluation.vue'
import Upload from '../components/uploadHomework.vue'
import Select from '../components/SelectWord.vue'
import SelectedWord from '../components/SelectedWord.vue'
import SelectedDetail from '../components/SelectedDetail.vue'
import Dev from '../components/Dev.vue'
import Entry from '../views/entry.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/entry',
    component: Entry
  },
  {
    path: '/upload',
    component: Frame,
    redirect: '/upload',
    children: [
      { path: '/upload', component: Upload },
      { path: '/evaluation', component: Homework },
      // { path: '/select', component: Select },
      // { path: '/selectedword', component: SelectedWord },
      // { path: '/detail', component: SelectedDetail },
      { path: '/dev', component: Dev }
    ]
  },
  {
    path: '/select',
    component: Frame2,
    redirect: '/selcet',
    children: [
      { path: '/select', component: Select },
      { path: '/selectedword', component: SelectedWord },
      { path: '/detail', component: SelectedDetail }
      // { path: '/dev', component: Dev }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
