<!-- 登录界面 -->
<template>
  <div class="login-container">
    <!-- 顶部 -->
    <div class="top-area">
      <!-- <img src="../../assets/badge.png" class="logo"> -->
      <p class="title-text">国家通用语言语音学习分析系统</p>
      <div class="skip">
        <el-button type="text" @click="skip2" style="color:white" size="mini">语音语料检索</el-button>
        <el-button type="text" @click="skip" style="color:white" size="mini">作业选词</el-button>
      </div>
    </div>
    <div class="top-number">
      <p class="title-text">语音数据统计</p>

      <p class="title-data">学生数量总计：{{studentNum}}</p>
      <p class="title-data">音频数量总计：{{audioNum}}</p>

    </div>
    <!-- 身份登录按钮组 -->
    <div class="login-box" v-show="role === '0'">
      <!-- 标题 -->
      <div class="title2">选择身份登录</div>
      <!-- 身份登录按钮组 -->
      <el-row class="roleBtns">
        <el-col :span="12" style="text-align:center;">
          <el-button type="warning" round @click="role='1'">我是学生</el-button>
        </el-col>
        <el-col :span="12" style="text-align:center;">
          <el-button type="primary" round @click="role='2'">我是老师</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 学生登录 -->
    <div class="login-box" v-show="role === '1'">
      <!-- 顶部返回 -->
      <div style="margin-left:20px; margin-top:18px; color:rgb(44, 111, 255);">
        <el-button type="text" @click="role='0'">&lt; 返回</el-button>
      </div>
      <!-- 标题 -->
      <div class="title">学生登录</div>
      <!-- 表单区域 -->
      <el-form
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input placeholder="学号" type="text" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-checkbox v-model="checked" style="margin-right:15px">保存密码</el-checkbox>
          <el-button round @click="changePassword">更改密码</el-button>
          <el-button type="warning" round @click="register">注册</el-button>
          <el-button type="primary" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 老师登录 -->
    <div class="login-box" v-show="role === '2'">
      <!-- 顶部返回 -->
      <div style="margin-left:20px; margin-top:18px; color:rgb(44, 111, 255);">
        <el-button type="text" @click="role='0'">&lt; 返回</el-button>
      </div>
      <!-- 标题 -->
      <div class="title">作业评测老师登录</div>
      <!-- 表单区域 -->
      <el-form
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-select
            v-model="loginForm.name"
            placeholder="用户名"
            class="teacher-select"
            filterable
          >
            <el-option
              v-for="item in teachers"
              :key="item.teacher_id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-checkbox v-model="checked" style="margin-right:15px">保存密码</el-checkbox>
          <el-button round @click="changePassword">更改密码</el-button>
          <el-button type="warning" round @click="register">注册</el-button>
          <el-button type="primary" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: '0', // 0是选择，1是学生，2是老师
      loginForm: {
        name: '',
        password: '123456'
      },
      loginFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      teachers: [],
      checked: true,
      studentNum: 0,
      audioNum: 0
    }
  },
  mounted() {
    this.getTeachers()
    this.getlocalStorage()
    this.getStudentNumber()
    this.getAudioNumber()
  },

  methods: {
    getStudentNumber() {
      var url = '/analysis/getStudentNumber'
      this.$http.get(url).then(result => {
        this.studentNum = result.data.count
      })
    },
    getAudioNumber() {
      var url = '/analysis/getAudioNumber'
      this.$http.get(url).then(result => {
        this.audioNum = result.data.count
      })
    },
    // 获取老师列表
    getTeachers() {
      var url = '/teacher/getTeachers'
      this.$http.get(url).then(result => {
        this.teachers = result.data.teachers
      })
    },
    // 设置本地缓存
    setlocalStorage() {
      localStorage.setItem('name', this.loginForm.name)
      localStorage.setItem('pwd', this.loginForm.password)
    },
    // 获取本地缓存
    getlocalStorage() {
      this.loginForm.name = localStorage.getItem('name')
      this.loginForm.password = localStorage.getItem('pwd')
    },
    // 登录请求
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        if (this.role === '1') {
          // 学生登录
          var stu = {
            student_id_refer: this.loginForm.name,
            password: this.loginForm.password
          }
          await this.$http
            .post('/auth/login', stu)
            .then(res => {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              if (this.checked) {
                this.setlocalStorage()
              } else {
                localStorage.clear()
              }
              window.sessionStorage.setItem('id', res.data.user.student_id_refer)
              window.sessionStorage.setItem('name', res.data.user.username)
              window.sessionStorage.setItem('isAuthenticated', 1)
              this.$router.push('/student/uploadAudio')
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              this.$message('登录失败')
            })
        } else if (this.role === '2') {
          // 老师登录
          await this.$http
            .post('/teacher/login', this.loginForm)
            .then(res => {
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              if (this.checked) {
                this.setlocalStorage()
              } else {
                localStorage.clear()
              }
              window.sessionStorage.setItem('name', this.loginForm.name)
              window.sessionStorage.setItem('isAuthenticated', 1)
              window.sessionStorage.setItem('level', res.data.user.authority)
              if (res.data.user.authority === 1) {
                this.$router.push('/upload')
              } else {
                this.$router.push('/admin')
              }
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              this.$message('登录失败')
            })
        }
      })
    },
    // 注册页面跳转
    register() {
      this.$router.push({
        path: '/register',
        query: {
          role: this.role
        }
      })
    },
    // 更改密码跳转
    changePassword() {
      this.$router.push({
        path: '/password',
        query: {
          role: this.role
        }
      })
    },
    // 选择字词页面跳转
    skip() {
      this.$router.push('/select')
    },
    skip2() {
      this.$router.push('/analysis')
    }
  }
}
</script>

<style lang="less" scoped>
.top-area {
  color: whitesmoke;
  display: flex;
  flex-direction: row;
}
.top-number {
  margin-left: 2%;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  border: 2px dashed;
  width: 15%;
}
.logo {
  width: 42px;
  height: 42px;
  margin: 10px 10px 10px 15px;
}
.title-text {
  margin-top: 20px;
  margin-left: 15px;
}
.title-data {
  margin-top: 10px;
  margin-left: 24px;
  font-size: 14px;
}
.skip {
  margin-top: 10px;
  margin-left: 70%;
  color: white;
}
.login-container {
  background: -moz-linear-gradient(top, #000f41 0%, #c7d8ff 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #000f41),
    color-stop(100%, #c7d8ff)
  );
  background: -webkit-linear-gradient(top, #000f41 0%, #dddddd 100%);
  background: -o-linear-gradient(top, #000f41 0%, #c7d8ff 100%);
  background: -ms-linear-gradient(top, #000f41 0%, #c7d8ff 100%);
  background: linear-gradient(to bottom, #000f41 0%, #c7d8ff 100%);
  height: 100%;
}
.keep-login {
  margin-right: 20px;
}
.login-box {
  width: 500px;
  height: 380px;
  position: absolute;
  background-color: #d3d3d3;
  opacity: 0.85;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;

  .avatar-box {
    height: 160px;
    width: 160px;
    // border: 1px solid #ccc;
    // border-radius: 50%;
    padding: 10px;
    // box-shadow: 0 0 10px #ddd;
    position: absolute;
    // left: 50%;
    // background-color: #fff;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
      // background-color: #eee;
    }
  }
}
.title {
  text-align: center;
  margin-top: 25px;
  font-size: 40px;
  color: rgb(44, 111, 255);
}
.title2 {
  text-align: center;
  margin-top: 70px;
  font-size: 40px;
  color: rgb(44, 111, 255);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.teacher-select {
  width: 100%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.roleBtns {
  display: flex;
  width: 100%;
  margin-top: 95px;
}
</style>
