<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">更改密码</div>
      <!-- 表单区域 -->
      <el-form
        label-width="20"
        class="login_form"
        :model="passwordForm"
        :rules="passwordFormRules"
        ref="passwordForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="passwordForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="原密码">
          <el-input placeholder="请输入原密码" type="password" v-model="passwordForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword"  label="新密码">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordAgain"  label="再次输入新密码">
          <el-input type="password" v-model="passwordForm.newPasswordAgain"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="warning" round @click="changePassword">完成更改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      role: '',
      passwordForm: {
        name: '',
        password: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      passwordFormRules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPasswordAgain: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.role = this.$route.query.role
  },
  methods: {
    resetForm() {
      this.$router.push('/register')
    },
    setlocalStorage() {
      localStorage.setItem('name', this.loginForm.username)
      localStorage.setItem('pwd', this.loginForm.password)
    },
    getlocalStorage() {
      this.loginForm.username = localStorage.getItem('name')
      this.loginForm.password = localStorage.getItem('pwd')
    },
    changePassword() {
      if (this.role === '1') {
        this.studentCh()
      } else {
        this.teacherCh()
      }
    },
    studentCh() {
      var data = {
        newPassword: this.passwordForm.newPassword,
        student: {
          username: this.passwordForm.name,
          password: this.passwordForm.password
        }
      }
      this.$http.post('/auth/change', data)
        .then(res => {
          this.$message({
            message: '更改成功',
            type: 'success'
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            message: '更改失败',
            type: 'warning'
          })
        })
    },
    teacherCh() {
      var data = {
        newPassword: this.passwordForm.newPassword,
        teacher: {
          name: this.passwordForm.name,
          password: this.passwordForm.password
        }
      }
      this.$http.post('/teacher/password', data)
        .then(res => {
          this.$message({
            message: '更改成功',
            type: 'success'
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            message: '更改失败',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
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
.login-box {
  width: 500px;
  height: 550px;
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
  margin-top: 32px;
  font-size: 38px;
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
