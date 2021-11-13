<!-- 教师上传学生作业，查看作业界面  -->
<template>
  <div>
    <!-- 普通权限界面 -->
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="待评分作业" name="1">
        <div class="tab-main">
          <h3>待评分作业列表</h3>
          <el-table :data="unmarkedList" style="width: 90%;margin-left:5%;">
            <el-table-column prop="student_id_refer" label="学号"></el-table-column>
            <el-table-column prop="homework_name" label="作业名称"></el-table-column>
            <el-table-column prop="created_at" label="上传日期"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="toEvaluatePage(scope.row)" type="text" size="small">评分</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="所有作业" name="2">
        <div class="tab-main">
          <h3>作业列表</h3>
          <el-table :data="studentList" style="width: 94%;margin-left:3%;">
            <el-table-column prop="student_id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的学生" name="3">
        <div class="tab-main">
          <h3>我的学生列表</h3>
          <div style="width:100%;text-align: right">
            <el-button @click="dialogFormVisible = true">添加学生</el-button>
          </div>
          <el-table :data="studentList" style="width: 94%;margin-left:3%;">
            <el-table-column prop="student_id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteStudent(scope.row)" type="text" size="small">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="作业列表" name="6" class="tab-main">
        <!-- 近期作业列表 -->
        <div >
          <h3>作业列表</h3>
          <el-table
            :data="docListDetail"
            style="width: 80%"
          >
            <el-table-column prop="title" label="作业名称"></el-table-column>
            <el-table-column prop="describe" label="作业描述"></el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="下载作业文档">
              <template slot-scope="scope">
                <el-button @click="downloadDoc(scope.row)" type="text" size="small">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传学生音频" name="4">
        <div class="tab-main">
          <h3>上传音频</h3>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择作业：</div>
            <el-select
              v-model="selectHomework"
              placeholder="请选择"
              class="upload-audio-student-select"
              filterable
            >
              <el-option
                v-for="item in docList"
                :key="item.homework_doc_id"
                :label="item.title"
                :value="item.homework_doc_id"
              ></el-option>
            </el-select>
            <div class="upload-doc-input-text" style="margin-left:30px">
              <el-checkbox v-model="isfree" true-label='1' false-label='0'>是否是命题表达</el-checkbox>
            </div>
          </div>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择学生：</div>
            <el-select
              v-model="selectStudent"
              placeholder="请选择"
              class="upload-audio-student-select"
            >
              <el-option
                v-for="item in studentList"
                :key="item.student_id"
                :label="item.student_id"
                :value="item.student_id"
              ></el-option>
            </el-select>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">字词训练音频/命题表达音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1, is_thesis_express:isfree}"
              :auto-upload="false"
              :on-success="successUpload"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1, is_thesis_express:isfree}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload2"
              >上传</el-button>
            </el-upload>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">朗读音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2, is_thesis_express:isfree}"
              :auto-upload="false"
              :on-success="successUpload"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2, is_thesis_express:isfree}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload3"
              >上传</el-button>
            </el-upload>
          </div>
          <el-button class="next" size="small" type="primary" @click="nextAddAudio">下一个</el-button>
          <el-button class="next" size="small" type="warning" @click="pushScore">开始打分</el-button>
        </div>
      </el-tab-pane>
      <!-- 个人信息 -->
      <el-tab-pane label="我的资料管理" name="5" class="tab-main">
        <h3>我的信息</h3>
        <el-card style="width:70%; margin-left:5%;background-color:#F8FFEF;" v-if="isShow">
          <!-- 修改信息表 -->
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="alumniForm"
            size="small"
            style="margin-left: 50px;"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机: ">
                  <el-input v-model="alumniForm.phone" placeholder="选填"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 底部按钮 -->
          <el-row>
            <el-col :span="6" :offset="20">
              <el-button type="success" @click="isShow=!isShow">返回</el-button>
              <el-button type="primary" @click="updateTeacherInfo">提交</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="width:70%; margin-left:5%;background-color:#F8FFEF;" v-if="!isShow">
          <div style="margin-left:35px;">
            <el-row >
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">姓名: </div>
                  <div class="info-content">{{alumniInfo.name}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">手机: </div>
                  <div class="info-content">{{alumniInfo.phone}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="22">
                <el-button type="primary" @click="modification">修改</el-button>
              </el-col>
            </el-row>
          </div>

        </el-card>
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="eval" style="margin-top: 20px;">
      <el-button type="primary" round @click="evaluate">评估作业</el-button>
    </div>-->
    <!-- 注销 -->
    <div class="loginOut">
      <span style="margin-right: 20px;margin-top:2px">{{"用户名：" + name}}</span>
      <el-button type="warning" size='mini' @click="loginOut">登出</el-button>
    </div>
    <!-- 添加学生弹出界面 -->
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <div style="margin-left: 30px;">
        学号：
        <el-autocomplete
          v-model="addStuId"
          :fetch-suggestions="querySearchAsync"
          placeholder="按学号搜索"
          style="width:55%; margin-left:20px;"
          @select="handleDialogSelect"
        ></el-autocomplete>
      </div>
      <el-table
        :data="dialogTable"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="老师">
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button @click="deleteDialogResult(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMyStudent">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.getTeachers()
    var teacher = window.sessionStorage.getItem('name')
    this.name = teacher
    this.getInfo()
    this.getDocs()
    this.getStudentAndUnmarkHomeworkByTeacher(teacher)
    // this.getUnmarkedHomework()
  },
  data() {
    return {
      alumniInfo: {
        name: 'Test Stu',
        phone: '13699309139'
      },
      isShow: false,
      alumniForm: {
        name: '',
        phone: ''
      },
      name: '',
      title: '',
      describe: '',
      isfree: '0',
      teachers: [],
      selectHomework: '',
      selectTeacher: '',
      selectStudent: '',
      unmarkedList: [],
      homeworkDocId: '',
      uploadData: {
        title: this.title,
        describe: this.describe
      },
      addStuId: '',
      docList: [],
      docListDetail: [],
      studentList: [],
      activeTab: '1',
      audioType1: '',
      audioType2: '',
      dialogFormVisible: false,
      audioOptions: [
        {
          value: 1,
          label: '字词训练'
        },
        {
          value: 2,
          label: '常速朗读'
        }
      ],
      search: '',
      exampleTableData: [
        {
          id: 1,
          name: '李晓明',
          stu_id: 'LSZX011',
          ketangpaiid: 'ktp0256699607',
          phone_num: '12658997658',
          group: '第1组',
          teacher: '欧阳婉云',
          ketangpaiid2: 'ktp594699607',
          tphone_num: '18658157658'
        },
        {
          id: 2,
          name: '王小虎',
          stu_id: 'LSZX012',
          ketangpaiid: 'ktp0256699617',
          phone_num: '13898397658',
          group: '第1组',
          teacher: '欧阳婉云',
          ketangpaiid2: 'ktp594699607',
          tphone_num: '18658157658'
        }
      ],
      dialogTable: [],
      formLabelWidth: '80px'
    }
  },
  methods: {
    getInfo() {
      var url = '/teacher/getTeachersByName?name=' + this.name
      this.$http.get(url).then((result) => {
        this.teacherInfo = result.data.teacher
        this.alumniInfo = {
          teacher_id: result.data.teacher.teacher_id,
          name: result.data.teacher.name,
          phone: result.data.teacher.phone_number
        }
      })
    },
    // 上传文档
    submitUpload() {
      this.$refs.upload1.submit()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.getDocs()
    },
    // 上传学生列表
    uploadStudentList() {
      this.$refs.StudentListFile.submit()
      this.$$refs.StudentListFile.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    // 上传音频1
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    // 上传音频2
    submitUpload3() {
      this.$refs.upload3.submit()
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.student_id.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    // 查找学生
    querySearchAsync(queryString, cb) {
      var url = '/student/getAllStudent'
      this.$http.get(url).then((result) => {
        var data = result.data.students
        var results = queryString ? data.filter(this.createStateFilter(queryString)) : data
        // console.log(results.map(a => a.student_id))
        cb(results.map(function(a) { return { value: a.student_id, name: a.name, teacher: a.teacher } }))
      })
    },
    handleDialogSelect(item) {
      this.dialogTable.push(item)
    },
    deleteDialogResult(index) {
      this.dialogTable.splice(index, 1)
    },
    // 添加自己的学生
    addMyStudent() {
      var url = 'teacher/addStudent'
      var ids = this.dialogTable.map(a => a.value)
      var pushData = {
        ids: ids,
        teacher: this.name
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getStudentAndUnmarkHomeworkByTeacher(this.name)
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.$message({
          message: '修改失败，此学生已有老师请核查',
          type: 'warning'
        })
      })
    },
    // 上传成功提示
    successUpload(res, file, files) {
      this.$refs.upload1.clearFiles()
      this.$refs.upload2.clearFiles()
      this.title = ''
      this.describe = ''
      this.homeworkDocId = res.homework_id
      this.getDocs()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    evaluate() {
      this.$router.push('/evaluation')
    },
    // 跳转到评估界面
    toEvaluatePage(row) {
      if (this.isfree === '0') {
        this.$router.push({
          path: '/evaluation',
          query: {
            homework_doc_id: row.homework_doc_id_refer,
            student_id: row.student_id_refer,
            special: 0
          }
        })
      } else {
        this.$router.push({
          path: '/evaluation2',
          query: {
            homework_doc_id: row.homework_doc_id_refer,
            student_id: row.student_id_refer,
            special: 0
          }
        })
      }
    },
    // 获取所有作业文档
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then((result) => {
        this.docList = result.data.docs
        var tmp = []
        var allHomework = result.data.docs
        // 显示三个月内作业文档
        var delta = 14 * 30 * 24 * 60 * 60 * 1000
        for (var i = allHomework.length - 1; i >= 0; i--) {
          var time = new Date(allHomework[i].created_at)
          var now = new Date()
          if (now - time < delta) {
            var w1 = {
              doc_id: allHomework[i].homework_doc_id,
              title: allHomework[i].title,
              describe: allHomework[i].describe,
              created_at: this.formatTimeStr(allHomework[i].created_at)
            }
            tmp.push(w1)
            // break
          }
        }
        this.docListDetail = tmp
      })
    },
    // 获取所有老师列表
    getTeachers() {
      var url = '/student/getTeachers'
      this.$http.get(url).then((result) => {
        this.teachers = result.data.teachers
      })
    },
    // 获取老师的学生列表以及未评作业
    getStudentAndUnmarkHomeworkByTeacher(teacher) {
      var url = '/student/getStudentByTeacher?teacher=' + teacher
      this.$http.get(url).then((result) => {
        this.studentList = result.data.students
        var unmarkedList = result.data.unmark
        var homeworks = result.data.homework
        // console.log(unmarkedList)
        if (unmarkedList != null) {
          for (var i = 0; i < unmarkedList.length; i++) {
            unmarkedList[i].created_at = this.formatTimeStr(unmarkedList[i].created_at)
            unmarkedList[i].homework_name = homeworks[i].title
          }
        }
        this.unmarkedList = unmarkedList
      })
    },
    formatTimeStr(str) {
      var time = new Date(str)
      var m = time.getMonth() + 1
      return time.getFullYear() + '-' + m + '-' + time.getDate()
    },
    // 上传下一个学生音频，用于清空现有所有输入
    nextAddAudio() {
      this.$refs.upload2.clearFiles()
      this.$refs.upload3.clearFiles()
      this.selectHomework = ''
      this.selectStudent = ''
      this.isfree = 0
    },
    // 跳转到评分界面
    pushScore() {
      if (this.selectHomework === '' || this.selectStudent === '') {
        this.$message.error('请填写评分对象')
      } else {
        if (this.isfree === '0') {
          this.$router.push({
            path: '/evaluation',
            query: {
              homework_doc_id: this.selectHomework,
              student_id: this.selectStudent,
              special: 0
            }
          })
        } else {
          this.$router.push({
            path: '/evaluation2',
            query: {
              homework_doc_id: this.selectHomework,
              student_id: this.selectStudent,
              special: 0
            }
          })
        }
      }
    },
    // 上传作业
    secondHomework() {
      var url = 'homework/upload/review'
      var pushData = {
        title: this.title,
        describe: this.describe
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '创建作业成功',
          type: 'success'
        })
      })
    },
    // 查看作业结果
    seeHomework(x) {
      this.$router.push({
        path: '/homeworkresult',
        query: {
          stu_id: x.student_id,
          stu_name: x.name
        }
      })
    },
    // 删除作业
    deleteHomework(id) {
      var url = '/homework/deleteHomework?doc_id=' + id
      this.$http.get(url).then((result) => {
        this.getDocs()
      })
    },
    filterIdHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 登出
    loginOut() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 移除学生
    deleteStudent(x) {
      var url = '/teacher/deleteStudent?stu_id=' + x.student_id + '&teacher=' + this.name
      this.$http.delete(url).then((result) => {
        this.getStudentAndUnmarkHomeworkByTeacher(this.name)
      })
    },
    modification() {
      this.isShow = true
      this.alumniForm = this.alumniInfo
    },
    // 更新教师信息
    updateTeacherInfo() {
      var url = '/teacher/updateInfo'
      var pushData = {
        teacher_id: this.alumniForm.teacher_id,
        name: this.alumniForm.name,
        phone_number: this.alumniForm.phone
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '信息更新成功',
          type: 'success'
        })
        this.name = result.data.name
        this.isShow = !this.isShow
      })
    },
    downloadDoc(row) {
      console.log(row)
      var url = '/homework/downloadHomeworkDoc' + '?doc_id=' + row.doc_id
      // url += '?stu_id=PS002&doc_id=1'
      // this.$http.get(url)
      // window.location.href = 'http://localhost:8001/api' + url
      window.location.href = 'http://47.103.83.192:8001/api' + url
    }
  }
}
</script>

<style lang="less" scoped>
.tab-main {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.upload-doc-input {
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-bottom: 10px;
}
.upload-doc-input-text {
  line-height: 50px;
  margin-right: 10px;
}
.upload-doc-top-elinput {
  width: 60%;
  line-height: 50px;
}
.upload-doc-main {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
}
.upload-audio-student {
  display: flex;
  flex-direction: row;
  height: 50px;
}
.upload-audio-student-select {
  line-height: 50px;
}
.upload-audio-contain {
  display: flex;
  flex-direction: row;
  height: 170px;
}
.audio-upload-option {
  line-height: 70px;
}
.audio-upload {
  margin-left: 20px;
  width: 200px;
  line-height: 50px;
}
.table-header {
  display: flex;
  flex-direction: row;
  height: 50px;
}
.table-header-title {
  font-size: 20px;
  line-height: 50px;
}
.table-header-button {
  height: 30px;
  margin-top: 10px;
  margin-left: 25px;
}
.table-header-input {
  margin-left: 55%;
  width: 30%;
  line-height: 50px;
}
.loginOut{
  position: absolute;
  right: 20px;
  top: 12px;
  color: #e6a23c;
  font-weight: 600;
  font-size: 16px;
  height: 35px;
  line-height: 35px;
}
.info {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.info-title {
  font-weight: bold;
  margin-right: 10px;
}
</style>
