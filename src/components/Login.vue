<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">作业评测登录</div>
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
            @change="getStudentByTeacher"
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
          <el-checkbox v-model="checked" style="margin-right:15px">一周内自动登录</el-checkbox>
          <el-button type="primary" round @click="login">登录</el-button>
          <!-- <el-button type="cancel" round @click="resetForm">注册</el-button> -->
          <el-button type="warning" circle @click="changePassword">更改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: '',
        password: '123456'
      },
      loginFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ]
      },
      teachers: [],
      checked: true
    }
  },
  mounted() {
    this.getTeachers()
    this.getlocalStorage()
  },
  methods: {
    getTeachers() {
      var url = '/student/getTeachers'
      this.$http.get(url).then(result => {
        this.teachers = result.data.teachers
      })
    },
    setlocalStorage() {
      localStorage.setItem('name', this.loginForm.name)
      localStorage.setItem('pwd', this.loginForm.password)
    },
    getlocalStorage() {
      this.loginForm.username = localStorage.getItem('name')
      this.loginForm.password = localStorage.getItem('pwd')
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
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
            console.log(res.data)
            window.sessionStorage.setItem('name', this.loginForm.name)
            window.sessionStorage.setItem('level', res.data.user.authority)
            this.$router.push('/upload')
          })
          // eslint-disable-next-line handle-callback-err
          .catch(err => {
            this.$message('登录失败')
          })
      })
    },
    changePassword() {
      this.$router.push('/password')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  //   background-color: rgb(41, 0, 107);
  background: -moz-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #050505),
    color-stop(100%, #e4e4e4)
  );
  background: -webkit-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -o-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -ms-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: linear-gradient(to bottom, #050505 0%, #e4e4e4 100%);
  //   background-color: #2b4b6b;
  height: 100%;
  //   background-image: url("../assets/starry-sky-1654074_1920.jpg");
}
.keep-login {
  margin-right: 20px;
}
.login-box {
  width: 500px;
  height: 360px;
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
  margin-top: 50px;
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
</style>
