<!-- 注册界面 -->
<template>
  <div class="register-container">
    <div class="register-box">
      <!-- 标题 -->
      <div class="title">注册</div>
      <!-- 表单区域 -->
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="130px"
        class="register-form"
      >
        <el-form-item label="姓名" prop="name" class="changeLabel">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="changeLabel">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="checkPass" class="changeLabel">
          <el-input v-model="registerForm.checkPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="身份" class="changeLabel">
          <el-radio-group v-model="registerForm.role">
            <el-radio label="老师"></el-radio>
            <el-radio label="学生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-input v-model="registerForm.region"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="register" class="btn1">注册</el-button>
          <el-button @click="resetForm" class="btn2">重置</el-button>
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
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        password: '',
        checkPass: '',
        role: '',
        region: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }]
      },
      teachers: [],
      checked: true
    }
  },
  mounted() {},
  methods: {
    setlocalStorage() {
      localStorage.setItem('name', this.loginForm.name)
      localStorage.setItem('pwd', this.loginForm.password)
    },
    resetForm() {
      this.registerForm = {
        name: '',
        password: '',
        checkPass: '',
        role: '',
        region: ''
      }
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
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.skip {
  margin-left: 95%;
  color: white;
}
.register-container {
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
.register-box {
  width: 600px;
  height: 520px;
  position: absolute;
  background-color: #d3d3d3;
  opacity: 0.85;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}
.title {
  text-align: center;
  margin-top: 42px;
  font-size: 38px;
  color: rgb(13, 26, 54);
}
.register-form {
  position: absolute;
  bottom: 0;
  width: 92%;
  padding: 0 25px;
  box-sizing: border-box;
  .el-form-item__label {
    color: #fff !important;
  }
  .el-radio__label {
    color: #fff;
  }
}
.keep-login {
  margin-right: 20px;
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
