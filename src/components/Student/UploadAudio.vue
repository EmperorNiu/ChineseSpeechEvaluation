<!-- 学生界面 -->
<template>
  <div class="main-contain">
    <el-tabs v-model="activeTab" type="border-card">
      <!-- 上传音频 -->
      <el-tab-pane label="上传音频" name="1" class="tab-main">
        <h3>上传音频</h3>
        <div class="upload-audio-student">
          <div class="upload-doc-input-text">选择作业：</div>
          <el-select
            v-model="selectHomework"
            placeholder="请选择"
            filterable
            class="upload-audio-student-select"
          >
            <el-option
              v-for="item in docList"
              :key="item.homework_doc_id"
              :label="item.title"
              :value="item.homework_doc_id"
            ></el-option>
          </el-select>
        </div>
        <div class="upload-audio-contain">
          <div class="upload-doc-input-text">字词训练音频/命题表达音频：</div>
          <el-upload
            class="audio-upload"
            ref="upload1"
            action="http://localhost:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id, doc_id:selectHomework, type:1}"
            :auto-upload="false"
          >
          <!-- <el-upload
            class="audio-upload"
            ref="upload1"
            action="http://47.103.83.192:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:1}"
            :auto-upload="false"
          > -->
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload1"
            >上传</el-button>
          </el-upload>
        </div>
        <div class="upload-audio-contain">
          <div class="upload-doc-input-text">课文朗读音频：</div>
          <el-upload
            class="audio-upload"
            ref="upload2"
            action="http://localhost:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework, type:2}"
            :auto-upload="false"
          >
          <!-- <el-upload
            class="audio-upload"
            ref="upload2"
            action="http://47.103.83.192:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:2}"
            :auto-upload="false"
          > -->
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload2"
            >上传</el-button>
          </el-upload>
        </div>
        <div style="width:100%;text-align:right;">
          <el-button class="nextBtn" type="primary" @click="nextAddAudio">下一个音频</el-button>
        </div>
      </el-tab-pane>
      <!-- 查看作业 -->
      <el-tab-pane label="查看我的作业" name="2" class="tab-main">
        <h3>我的作业列表</h3>
        <el-table
          :data="allHomework"
          style="width: 80%"
        >
          <el-table-column prop="title" label="作业名称"></el-table-column>
          <el-table-column prop="describe" label="作业描述"></el-table-column>
          <el-table-column prop="created_at" label="时间"></el-table-column>
          <el-table-column prop="state" label="作业批改状态">未批改</el-table-column>
          <el-table-column prop="state" label="评分">0</el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteHomework(scope.row.homework_doc_id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteHomework(scope.row.homework_doc_id)" type="text" size="small">下载报告</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 个人信息 -->
      <el-tab-pane label="我的资料管理" name="3" class="tab-main">
        <h3>我的信息</h3>
        <el-card style="width:88%; margin-left:5%;" v-if="isShow">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="alumniForm"
            size="small"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名: ">
                  <el-input v-model="alumniForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机: ">
                  <el-input v-model="alumniForm.phone" placeholder="选填"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮箱: ">
                  <el-input v-model="alumniForm.mail" placeholder="选填"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="毕业去向: ">
                  <el-input v-model="alumniForm.city" placeholder="去往哪个城市"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="升学/工作: ">
                  <el-input v-model="alumniForm.type"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司: ">
                  <el-input v-model="alumniForm.company"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="研究生院校: ">
                  <el-input v-model="alumniForm.schoolP"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row>
            <el-col :span="6" :offset="20">
              <el-button type="primary" @click="uploadCareer">提交</el-button>
              <el-button type="success">重置</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="width:88%; margin-left:5%;" v-if="!isShow">
          <el-row>
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
                <div class="info-title">学号: </div>
                <div class="info-content">{{alumniInfo.mail}}</div>
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
            <el-col :span="12">
              <div class="info">
                <div class="info-title">课堂派账号: </div>
                <div class="info-content">{{alumniInfo.city}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="info-title">老师: </div>
                <div class="info-content">{{alumniInfo.type}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="info">
                <div class="info-title">公司: </div>
                <div class="info-content">{{alumniInfo.company}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="22">
              <el-button type="primary" @click="modification">修改</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <div class="loginOut">
      <span style="margin-right: 20px;margin-top:2px">{{"用户名："+studentName}}</span>
      <el-button type="warning" size='mini' @click="loginOut">登出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.studentName = window.sessionStorage.getItem('name')
    this.getInfo()
    this.getDocs()
    // this.getAllHomework()
    // this.getStudents()
  },
  data() {
    return {
      studentName: '',
      studentInfo: '',
      allHomework: [],
      title: '',
      describe: '',
      teachers: [],
      selectHomework: '',
      selectTeacher: '',
      selectStudent: '',
      homeworkDocId: '',
      uploadData: {
        title: this.title,
        describe: this.describe
      },
      docList: [],
      studentList: [],
      activeTab: '1',
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
      alumniInfo: {
        name: '牛悦安',
        mail: 'niuyuean99@sina.com',
        city: 'ktp0215702485',
        phone: '13699309139',
        type: '升学',
        company: '无',
        schoolP: '华东师范大学'
      },
      isShow: false,
      alumniForm: {
        name: '',
        mail: '',
        city: '',
        phone: '',
        type: '',
        company: '',
        schoolP: ''
      }
    }
  },
  methods: {
    // 获取我的信息
    getInfo() {
      var url = '/student/getStudentByName?name=' + this.studentName
      this.$http.get(url).then((result) => {
        this.studentInfo = result.data.student
        this.getAllHomework()
      })
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
    submitUpload1() {
      if (this.selectHomework !== '') {
        this.$refs.upload1.submit()
        this.$message({
          message: '字词训练音频上传成功',
          type: 'success'
        })
      }
    },
    // 上传音频2
    submitUpload2() {
      if (this.selectHomework !== '') {
        this.$refs.upload2.submit()
        this.$message({
          message: '课文朗读音频上传成功',
          type: 'success'
        })
      }
    },
    // 上传下一个学生音频，用于清空现有所有输入
    nextAddAudio() {
      this.$refs.upload1.clearFiles()
      this.$refs.upload2.clearFiles()
      this.selectHomework = ''
    },
    loginOut() {
      this.$router.push('/login')
    },
    evaluate() {
      this.$router.push('/evaluation')
    },
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then((result) => {
        this.docList = result.data.docs
      })
    },
    getAllHomework() {
      var url = '/student/getHomework?stu_id=' + this.studentInfo.student_id
      this.$http.get(url).then((result) => {
        var allHomework = result.data.homeworks
        var tmp = []
        for (var i = 0; i < allHomework.length; i++) {
          var w1 = {
            title: allHomework[i].homework_doc.title,
            describe: allHomework[i].homework_doc.describe,
            created_at: this.formatTimeStr(allHomework[i].student_homework.created_at),
            tone_accuracy: allHomework[i].result.tone_accuracy,
            intonation_accuracy: allHomework[i].result.intonation_accuracy,
            fluency: allHomework[i].result.fluency
          }
          tmp.push(w1)
        }
        this.allHomework = tmp
      })
    },
    formatTimeStr(str) {
      var time = new Date(str)
      return time.getFullYear() + '-' + time.getMonth() + 1 + '-' + time.getDate()
    },
    // 获取所有学生列表
    getStudents() {
      var url = '/student/getHomework?stu_id=' + this.studentInfo.student_id
      this.$http.get(url).then((result) => {
        this.studentList = result.data.homeworks
      })
    },
    modification() {
      this.isShow = true
      this.alumniForm = this.alumniInfo
    },
    getTeachers() {
      var url = '/student/getTeachers'
      this.$http.get(url).then((result) => {
        this.teachers = result.data.teachers
      })
    },
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
    seeHomework(x) {
      this.$router.push({
        path: '/homeworkresult',
        query: {
          stu_id: x.student_id,
          stu_name: x.name
        }
      })
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
.main-contain {
  padding-left: 15px;
  padding-right: 20px;
}
.tab-main {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-left: 20px;
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
.nextBtn {
  margin-right: 40px;
}
.tab-head {
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
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
.info-content {
}
</style>
