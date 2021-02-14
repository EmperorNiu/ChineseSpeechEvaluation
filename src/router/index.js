import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'
import Frame2 from '../views/Frame2.vue'
// Auth
import Login from '../components/Auth/Login.vue'
import ChangePassword from '../components/Auth/ChangePassword.vue'
import Register from '../components/Auth/Register.vue'
// Student
import UploadAudio from '../components/Student/UploadAudio.vue'
// Homework
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
    component: Login,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/password',
    component: ChangePassword
  },
  {
    path: '/student',
    component: Frame,
    redirect: '/student/uploadAudio',
    children: [
      { path: '/student/uploadAudio', component: UploadAudio },
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
