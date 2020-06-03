<template>
  <div>
    <!-- 管理员权限界面 -->
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card" v-show="level === '2'">
      <el-tab-pane label="上传作业doc文档" name="1">
        <div class="tab-main">
          <h3>上传文档</h3>
          <div class="upload-doc-input">
            <div class="upload-doc-input-text">标题：</div>
            <el-input v-model="title" placeholder="请输入内容" class="upload-doc-top-elinput"></el-input>
          </div>
          <div class="upload-doc-input">
            <div class="upload-doc-input-text">备注：</div>
            <el-input v-model="describe" placeholder="请输入内容" class="upload-doc-top-elinput"></el-input>
          </div>
          <div class="upload-doc-main">
            <div class="upload-doc-input-text">文件：</div>
            <el-upload
              class="upload-part"
              ref="upload1"
              action="http://localhost:8001/api/homework/upload/doc"
              :data="{title:title,describe:describe}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <!-- <el-upload
              class="upload-part"
              ref="upload1"
              action="http://47.103.83.192:8001/api/homework/upload/doc"
              :data="{title:title,describe:describe}"
              :auto-upload="false"
              :on-success="successUpload"
              >-->
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传</el-button>
              <div slot="tip" class="el-upload__tip">只能预先设定好的doc模板文件</div>
            </el-upload>
          </div>
          <div style="margin-top:35px">
            <el-button class="next" size="small" type="warning" @click="secondHomework">命题表达作业</el-button>
          </div>
          <div style="margin-top:15px">注：如果是自由评注作业，无需上传文档，直接点击命题表达作业按钮；如果是平时作业，则无需点击此按钮</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传学生音频" name="2">
        <div class="tab-main">
          <h3>上传音频</h3>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择作业：</div>
            <el-select
              v-model="selectHomework"
              placeholder="请选择"
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
              <el-checkbox v-model="isfree">是否是命题表达</el-checkbox>
            </div>
          </div>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择学生：</div>
            <el-select
              v-model="selectStudent"
              placeholder="请选择"
              class="upload-audio-student-select"
              @change="dubug"
              filterable
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
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <!-- <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
              >-->
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
            <div class="upload-doc-input-text">课文朗读音频：</div>
            <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <!-- <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
              >-->
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
      <el-tab-pane label="查看学生作业" name="3">
        <div class="table-header">
          <div class="table-header-title">学生列表</div>
          <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="table-header-input" />
          <el-button size="small" class="table-header-button">导出Excel</el-button>
        </div>

        <el-table
          :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column prop="student_id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="seeHomework(scope.row.student_id)" type="text" size="small">查看作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 普通权限界面 -->
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card" v-show="level === '1'">
      <el-tab-pane label="上传学生音频" name="1">
        <div class="tab-main">
          <h3>上传音频</h3>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择作业：</div>
            <el-select
              v-model="selectHomework"
              placeholder="请选择"
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
              <el-checkbox v-model="isfree">是否是命题表达</el-checkbox>
            </div>
          </div>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择学生：</div>
            <el-select
              v-model="selectStudent"
              placeholder="请选择"
              class="upload-audio-student-select"
              @change="dubug"
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
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <!-- <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
              >-->
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
            <div class="upload-doc-input-text">课文朗读音频：</div>
            <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <!-- <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
              >-->
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
      <el-tab-pane label="查看学生作业" name="3">
        <h3>我的学生列表</h3>
        <el-table :data="studentList" style="width: 100%">
          <el-table-column prop="student_id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="seeHomework(scope.row.student_id)" type="text" size="small">查看作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="eval" style="margin-top: 20px;">
      <el-button type="primary" round @click="evaluate">评估作业</el-button>
    </div>-->
  </div>
</template>

<script>
export default {
  mounted() {
    // this.getTeachers()
    var teacher = window.sessionStorage.getItem('name')
    this.level = window.sessionStorage.getItem('level')
    this.getDocs()
    if (this.level === '1') {
      this.getStudentByTeacher(teacher)
    } else {
      this.getStudents()
    }
  },
  data() {
    return {
      level: 1,
      title: '',
      describe: '',
      isfree: false,
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
      audioType1: '',
      audioType2: '',
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
      search: ''
    }
  },
  methods: {
    // 上传文档
    submitUpload() {
      this.$refs.upload1.submit()
    },
    // 上传音频1
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    // 上传音频2
    submitUpload3() {
      this.$refs.upload3.submit()
    },
    // 上传成功提示
    successUpload(res, file, files) {
      this.$refs.upload1.clearFiles()
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
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then(result => {
        this.docList = result.data.docs
      })
    },
    // 获取所有学生列表
    getStudents() {
      var url = '/student/getAllStudent'
      this.$http.get(url).then(result => {
        this.studentList = result.data.students
      })
    },
    getTeachers() {
      var url = '/student/getTeachers'
      this.$http.get(url).then(result => {
        this.teachers = result.data.teachers
      })
    },
    getStudentByTeacher(teacher) {
      var url = '/student/getStudentByTeacher?teacher=' + teacher
      this.$http.get(url).then(result => {
        this.studentList = result.data.students
        // console.log(this.studentList)
      })
    },
    // 上传下一个学生音频，用于清空现有所有输入
    nextAddAudio() {
      this.$refs.upload2.clearFiles()
      this.$refs.upload3.clearFiles()
      this.selectHomework = ''
      this.selectStudent = ''
      this.isfree = false
    },
    // 跳转到评分界面
    pushScore() {
      if (this.selectHomework === '' || this.selectStudent === '') {
        this.$message.error('请填写评分对象')
      } else {
        if (!this.isfree) {
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
    debug() {
      console.log(this.selectStudent)
    },
    secondHomework() {
      var url = 'homework/upload/review'
      var pushData = {
        title: this.title,
        describe: this.describe
      }
      this.$http.post(url, pushData).then(result => {
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
          stu_id: x
        }
      })
    },
    filterIdHandler(value, row, column) {
      const property = column.property
      return row[property] === value
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
</style>
