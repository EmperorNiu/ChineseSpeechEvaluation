// 路由导航
import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'
import Frame2 from '../views/Frame2.vue'
// Auth
import Login from '../components/Auth/Login.vue'
import ChangePassword from '../components/Auth/ChangePassword.vue'
import Register from '../components/Auth/Register.vue'
// Student
import UploadAudio from '../components/Student/StudentMain.vue'
// Teacher
import Upload from '../components/Teacher/TeacherMain.vue'
import Admin from '../components/Teacher/AdminMain.vue'
import HomeworkResults from '../components/Teacher/HomeworkResults.vue'
// Homework
import Homework from '../components/homeworkEvaluation.vue'
import Homework2 from '../components/homeworkEvaluation2.vue'

// Analysis
import AnalysisMain from '../components/Analysis/AnalysisMain.vue'
import AnalysisDetail from '../components/Analysis/AnalysisDetail.vue'
import AnalysisHomeworkResult from '../components/Analysis/AnalysisHomeworkResult.vue'
// Select
import Select from '../components/Select/SelectWord.vue'
import SelectedWord from '../components/Select/SelectedWord.vue'
import SelectedDetail from '../components/Select/SelectedDetail.vue'
// Others
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
    name: 'login',
    component: Login,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/register',
    name: 'register',
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
      { path: '/admin', component: Admin },
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
    name: 'select',
    component: Frame2,
    redirect: '/selcet',
    children: [
      { path: '/select', component: Select },
      { path: '/selectedword', component: SelectedWord },
      { path: '/detail', component: SelectedDetail }
      // { path: '/dev', component: Dev }
    ]
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: AnalysisMain
  },
  {
    path: '/analysisDetail',
    name: 'analysisDetail',
    component: AnalysisDetail
  },
  {
    path: '/analysisHomeworkResult',
    name: 'analysisHomeworkResult',
    component: AnalysisHomeworkResult
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  var safePaths = ['register', 'login', 'analysis', 'select', 'password', 'analysisDetail', 'analysisHomeworkResult']
  if ((!safePaths.includes(to.name)) && !window.sessionStorage.getItem('isAuthenticated')) next({ name: 'login' })
  else next()
})

export default router
