<!-- 学生界面 -->
<!--
    包含三个子页面
    tab1：上传作业界面 -> 查看、下载作业
    tab2：查看我的作业界面
    tab3：个人信息界面
-->
<template>
  <div class="main-contain">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="作业列表" name="1" class="tab-main">
        <!-- 近期作业列表 -->
        <div v-show="isUpload">
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
            <el-table-column label="上传作业音频">
              <template slot-scope="scope">
                <el-button @click="uploadHomework(scope.row)" type="text" size="small">上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 上传学生作业音频 -->
        <div v-show="!isUpload">
          <h3>上传作业音频</h3>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择要提交的作业：</div>
            <div class="upload-audio-student-select">{{selectHomework}}</div>
            <!-- <el-select
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
            </el-select> -->
            <div class="upload-doc-input-text" style="margin-left:30px">
              <el-checkbox v-model="isfree" true-label='1' false-label='0'>是否是命题表达</el-checkbox>
            </div>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">字词训练音频/命题表达音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload1"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:studentInfo.student_id, doc_id:selectHomework, type:1, is_thesis_express:isfree}"
              :auto-upload="false"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload1"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:1, is_thesis_express:isfree}"
              :auto-upload="false"
            >
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
            <div class="upload-doc-input-text">朗读音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:studentInfo.student_id,doc_id:selectHomework, type:2, is_thesis_express:isfree}"
              :auto-upload="false"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:2, is_thesis_express:isfree}"
              :auto-upload="false"
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
          <div style="width:100%;text-align:right;">
            <el-button class="nextBtn" type="primary" @click="nextAddAudio">返回作业列表</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- 上传音频 -->
      <!-- <el-tab-pane label="上传音频" name="2" class="tab-main">
        <h3>上传作业音频</h3>
        <div class="upload-audio-student">
          <div class="upload-doc-input-text">选择要提交的作业：</div>
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
          <div class="upload-doc-input-text" style="margin-left:30px">
            <el-checkbox v-model="isfree" true-label='1' false-label='0'>是否是命题表达</el-checkbox>
          </div>
        </div>
        <div class="upload-audio-contain">
          <div class="upload-doc-input-text">字词训练音频/命题表达音频：</div>
          <el-upload
            class="audio-upload"
            ref="upload1"
            action="http://localhost:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id, doc_id:selectHomework, type:1, is_thesis_express:isfree}"
            :auto-upload="false"
          >
          <el-upload
            class="audio-upload"
            ref="upload1"
            action="http://47.103.83.192:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:1, is_thesis_express:isfree}"
            :auto-upload="false"
          >
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
          <div class="upload-doc-input-text">朗读音频：</div>
          <el-upload
            class="audio-upload"
            ref="upload2"
            action="http://localhost:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework, type:2, is_thesis_express:isfree}"
            :auto-upload="false"
          >
          <el-upload
            class="audio-upload"
            ref="upload2"
            action="http://47.103.83.192:8001/api/student/upload/audio"
            :data="{student_id:studentInfo.student_id,doc_id:selectHomework,type:2, is_thesis_express:isfree}"
            :auto-upload="false"
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
        <div style="width:100%;text-align:right;">
          <el-button class="nextBtn" type="primary" @click="nextAddAudio">下一个音频</el-button>
        </div>
      </el-tab-pane> -->
      <!-- 查看作业 -->
      <el-tab-pane label="查看我提交的作业" name="3" class="tab-main">
        <h3>我的作业列表</h3>
        <el-table
          :data="allHomework"
          style="width: 80%"
        >
          <el-table-column prop="title" label="作业名称"></el-table-column>
          <el-table-column prop="describe" label="作业描述"></el-table-column>
          <el-table-column prop="created_at" label="时间"></el-table-column>
          <el-table-column prop="is_mark" label="作业批改状态"></el-table-column>
          <el-table-column prop="state" label="评分">0</el-table-column>
          <!-- <el-table-column label="修改">
            <template slot-scope="scope">
              <el-button @click="deleteHomework(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button @click="deleteHomework(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="下载">
            <template slot-scope="scope">
              <el-button @click="downloadReport(scope.$index)" type="text" size="small">下载报告</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 个人信息 -->
      <el-tab-pane label="我的资料管理" name="4" class="tab-main">
        <h3>我的信息</h3>
        <div v-show="!alumniInfo.teacher" style="color: brown; margin-left: 10px;">
          <p>您还没有老师，请尽快联系老师将您设定为学生！</p>
        </div>
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
                <el-form-item label="姓名: ">
                  <el-input v-model="alumniForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别: ">
                  <el-input v-model="alumniForm.sex"></el-input>
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
                <el-form-item label="省份: ">
                  <el-input v-model="alumniForm.province" placeholder="和老师确认后统一填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="地区（县）: ">
                  <el-input v-model="alumniForm.county" placeholder="和老师确认后统一填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="民族: ">
                  <el-input v-model="alumniForm.race" placeholder="和老师确认后统一填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="账号: ">
                  <el-input v-model="alumniForm.keTangPai" placeholder="选填"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 底部按钮 -->
          <el-row>
            <el-col :span="6" :offset="18">
              <el-button type="success" @click="isShow=!isShow">返回</el-button>
              <el-button type="primary" @click="updateStudentInfo">提交</el-button>
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
                  <div class="info-title">性别: </div>
                  <div class="info-content">{{alumniInfo.sex}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">学号: </div>
                  <div class="info-content">{{alumniInfo.stuId}}</div>
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
                  <div class="info-title">账号: </div>
                  <div class="info-content">{{alumniInfo.keTangPai}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">民族: </div>
                  <div class="info-content">{{alumniInfo.race}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">省份: </div>
                  <div class="info-content">{{alumniInfo.province}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">地区(县): </div>
                  <div class="info-content">{{alumniInfo.county}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <div class="info-title">老师: </div>
                  <div class="info-content">{{alumniInfo.teacher}}</div>
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
    <div class="loginOut">
      <span style="margin-right: 20px;margin-top:2px">{{"用户名："+studentName}}</span>
      <el-button type="warning" size='mini' @click="loginOut">登出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.studentId = window.sessionStorage.getItem('id')
    this.studentName = window.sessionStorage.getItem('name')
    this.getInfo()
    this.getDocs()
    // if (this.alumniInfo.teacher === '') {
    //   this.warning = 1
    // }
    // this.getAllHomework()
    // this.getStudents()
  },
  data() {
    return {
      isUpload: true,
      studentId: '',
      studentName: '',
      studentInfo: '',
      allHomework: [],
      docListDetail: [],
      docListInPage: [],
      title: '',
      describe: '',
      teachers: [],
      isfree: 0,
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
        name: 'Test Stu',
        sex: '男',
        stuId: 'JC101',
        keTangPai: 'ktp0215702485',
        phone: '13699309139',
        province: '新疆',
        county: '叶城',
        race: '维吾尔族',
        teacher: 'Test Teacher'
      },
      isShow: false,
      alumniForm: {
        name: '',
        sex: '',
        stuId: '',
        keTangPai: '',
        province: '',
        county: '',
        race: '',
        phone: '',
        teacher: ''
      },
      warning: 0
    }
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    uploadHomework(row) {
      this.isUpload = false
      this.selectHomework = row.title
    },
    // 获取我的信息
    getInfo() {
      var url = '/student/getStudentByName?name=' + this.studentId
      this.$http.get(url).then((result) => {
        this.studentInfo = result.data.student
        this.alumniInfo = {
          name: result.data.student.name,
          stuId: result.data.student.student_id,
          teacher: result.data.student.teacher,
          keTangPai: result.data.student.ke_tang_pai_account,
          phone: result.data.student.phone_number,
          province: result.data.student.province,
          county: result.data.student.county,
          race: result.data.student.race,
          sex: result.data.student.sex
        }
        this.getAllHomework()
      })
    },
    // 更新学生信息
    updateStudentInfo() {
      var url = '/student/updateInfo'
      var pushData = {
        student_id: this.alumniInfo.stuId,
        name: this.alumniForm.name,
        teacher: this.alumniInfo.teacher,
        province: this.alumniForm.province,
        county: this.alumniForm.county,
        race: this.alumniForm.race,
        sex: this.alumniForm.sex,
        ke_tang_pai_account: this.alumniForm.keTangPai,
        phone_number: this.alumniForm.phone
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '信息更新成功',
          type: 'success'
        })
        this.isShow = !this.isShow
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
          message: '朗读音频上传成功',
          type: 'success'
        })
      }
    },
    // 上传下一个学生音频，用于清空现有所有输入
    nextAddAudio() {
      this.isUpload = true
      this.$refs.upload1.clearFiles()
      this.$refs.upload2.clearFiles()
      this.selectHomework = ''
    },
    // 退出登录
    loginOut() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    evaluate() {
      this.$router.push('/evaluation')
    },
    // 获取所有作业文档
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then((result) => {
        this.docList = result.data.docs
        var tmp = []
        var allHomework = result.data.docs
        // 显示三个月内作业文档
        var delta = 3 * 30 * 24 * 60 * 60 * 1000
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
    downloadDoc(row) {
      console.log(row)
      var url = '/homework/downloadHomeworkDoc' + '?doc_id=' + row.doc_id
      // url += '?stu_id=PS002&doc_id=1'
      // this.$http.get(url)
      // window.location.href = 'http://localhost:8001/api' + url
      window.location.href = 'http://47.103.83.192:8001/api' + url
    },
    downloadReport(row) {
      if (this.allHomework[row].is_mark === '未批改') {
        this.$message({
          message: '作业尚未批改',
          type: 'warning'
        })
      } else {
        var url = this.allHomework[row].is_thesis_express === 0 ? '/homework/getReport' : '/homework/getReport2'
        url += '?stu_id=' + this.studentInfo.student_id + '&doc_id=' + this.allHomework[row].doc_id
        // url += '?stu_id=PS002&doc_id=1'
        // this.$http.get(url)
        // window.location.href = 'http://localhost:8001/api' + url
        window.location.href = 'http://47.103.83.192:8001/api' + url
      }
    },
    getAllHomework() {
      var url = '/student/getHomework?stu_id=' + this.studentInfo.student_id
      this.$http.get(url).then((result) => {
        var allHomework = result.data.homeworks
        var tmp = []
        if (allHomework != null) {
          for (var i = allHomework.length - 1; i >= 0; i--) {
            var w1 = {
              title: allHomework[i].homework_doc.title,
              describe: allHomework[i].homework_doc.describe,
              created_at: this.formatTimeStr(allHomework[i].student_homework.created_at),
              tone_accuracy: allHomework[i].result.tone_accuracy,
              intonation_accuracy: allHomework[i].result.intonation_accuracy,
              fluency: allHomework[i].result.fluency,
              is_mark: allHomework[i].student_homework.is_mark === 1 ? '已批改' : '未批改',
              is_thesis_express: allHomework[i].result.is_thesis_express,
              doc_id: allHomework[i].homework_doc.homework_doc_id,
              student_homework_id: allHomework[i].student_homework.student_homework_id
            }
            tmp.push(w1)
          }
        }
        this.allHomework = tmp
      })
    },
    formatTimeStr(str) {
      var time = new Date(str)
      var m = time.getMonth() + 1
      return time.getFullYear() + '-' + m + '-' + time.getDate()
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
    deleteHomework(x) {
      if (x.is_mark === '未批改') {
        var url = '/student/deleteStudentHomework?student_homework_id=' + x.student_homework_id
        this.$http.get(url).then((result) => {
          this.getAllHomework()
        })
      } else {
        this.$message({
          message: '已批改作业不能删除',
          type: 'warning'
        })
      }
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
