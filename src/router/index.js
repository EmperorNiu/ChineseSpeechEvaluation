import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'
import Frame2 from '../views/Frame2.vue'
import Login from '../components/Login.vue'
import ChangePassword from '../components/ChangePassword.vue'
import Homework from '../components/homeworkEvaluation.vue'
import Homework2 from '../components/homeworkEvaluation2.vue'
import HomeworkResults from '../components/HomeworkResults.vue'
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
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/password',
    component: ChangePassword
  },
  {
    path: '/upload',
    component: Frame,
    redirect: '/upload',
    children: [
      { path: '/upload', component: Upload },
      { path: '/evaluation', component: Homework },
      { path: '/evaluation2', component: Homework2 },
      { path: '/homeworkresult', component: HomeworkResults },
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
