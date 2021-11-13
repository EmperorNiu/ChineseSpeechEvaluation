<!-- 注册界面 -->
<template>
  <div class="register-container">
    <div class="register-box">
      <!-- 顶部返回 -->
      <div style="margin-left:20px; margin-top:16px; color:rgb(44, 111, 255);">
        <el-button type="text" @click="back">&lt; 返回</el-button>
      </div>
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
        <el-form-item label="学号" prop="id" class="changeLabel" v-show="registerForm.role === '学生'">
          <el-input v-model="registerForm.id" placeholder="请输入学号，如不知道请询问"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="changeLabel">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="checkPass" class="changeLabel">
          <el-input v-model="registerForm.checkPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="changeLabel" v-show="registerForm.role === '老师'">
          <el-input v-model="registerForm.phone" placeholder="手机号(选填)"></el-input>
        </el-form-item>
        <el-form-item label="管理员邀请码" prop="admin" class="changeLabel" v-show="registerForm.role === '管理员'">
          <el-input v-model="registerForm.admin" placeholder="请输入管理员邀请码"></el-input>
        </el-form-item>
        <el-form-item label="身份" class="changeLabel">
          <el-radio-group v-model="registerForm.role">
            <el-radio label="老师"></el-radio>
            <el-radio label="学生"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="地区编号" prop="area" class="changeLabel">
          <el-input v-model="registerForm.area"></el-input>
        </el-form-item> -->
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
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      role: '',
      registerForm: {
        name: '',
        id: '',
        password: '',
        checkPass: '',
        role: '',
        phone: '',
        admin: ''
        // area: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        id: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }]
      },
      teachers: [],
      checked: true
    }
  },
  mounted() {
    var role = this.$route.query.role
    if (role === '1') {
      this.registerForm.role = '学生'
    } else if (role === '2') {
      this.registerForm.role = '老师'
    }
  },
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
    studentReg() {
      var stuAuth = {
        username: this.registerForm.name,
        password: this.registerForm.password,
        student_id_refer: this.registerForm.id
      }
      this.$http.post('/auth/register', stuAuth)
        .then(res => {
          // console.log(res.data)
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          window.sessionStorage.setItem('name', this.registerForm.name)
          window.sessionStorage.setItem('pwd', this.registerForm.password)
          window.sessionStorage.setItem('role', '1')
          this.$router.push('/student/uploadAudio')
        })
        .catch(() => {
          this.$message({
            message: '注册失败，请检查网络或学号是否有误',
            type: 'warning'
          })
        })
    },
    teacherReg() {
      var teaAuth = {
        name: this.registerForm.name,
        password: this.registerForm.password,
        phone_number: this.registerForm.phone
      }
      this.$http.post('/teacher/register', teaAuth)
        .then(res => {
          // console.log(res.data)
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          window.sessionStorage.setItem('name', this.registerForm.name)
          window.sessionStorage.setItem('pwd', this.registerForm.password)
          // window.sessionStorage.setItem('role', this.registerForm.role)
          this.$router.push('/upload')
        })
        .catch(() => {
          this.$message({
            message: '注册失败',
            type: 'warning'
          })
        })
    },
    adminReg() {
      var adminAuth = {
        name: this.registerForm.name,
        password: this.registerForm.password,
        authority: 2
      }
      var postData = {
        teacher: adminAuth,
        code: this.registerForm.admin
      }
      this.$http.post('/teacher/adminRegister', postData)
        .then(res => {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          window.sessionStorage.setItem('name', this.registerForm.name)
          window.sessionStorage.setItem('pwd', this.registerForm.password)
          // window.sessionStorage.setItem('role', '1')
          this.$router.push('/admin')
        })
        .catch(() => {
          this.$message({
            message: '注册失败，请检查网络或管理员邀请码是否有误',
            type: 'warning'
          })
        })
    },
    register() {
      if (this.registerForm.role === '学生') {
        this.studentReg()
      } else if (this.registerForm.role === '老师') {
        this.teacherReg()
      } else {
        this.adminReg()
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

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
  height: 540px;
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
