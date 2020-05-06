<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card">
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
                :label="item.name"
                :value="item.student_id"
              ></el-option>
            </el-select>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">字词训练音频：</div>
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
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
            <div class="upload-doc-input-text">课文朗读音频：</div>
            <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
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
          <el-button class="next" size="small" type="warning">开始打分</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="作业打分" name="3">
        <div class="upload-audio-student">
          <div class="upload-doc-input-text">选择作业：</div>
          <el-select v-model="selectHomework" placeholder="请选择" class="upload-audio-student-select">
            <el-option
              v-for="item in docList"
              :key="item.homework_doc_id"
              :label="item.title"
              :value="item.homework_doc_id"
            ></el-option>
          </el-select>
        </div>
        <div class="upload-audio-student">
          <div class="upload-doc-input-text">选择学生：</div>
          <el-select v-model="selectStudent" placeholder="请选择" class="upload-audio-student-select">
            <el-option
              v-for="item in studentList"
              :key="item.student_id"
              :label="item.name"
              :value="item.student_id"
            ></el-option>
          </el-select>
        </div>
        <el-button class="next" size="small" type="warning" @click="pushScore">开始打分</el-button>
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
    this.getDocs()
    this.getStudents()
  },
  data() {
    return {
      title: '',
      describe: '',
      selectHomework: '',
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
      ]
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload1.submit()
    },
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    submitUpload3() {
      this.$refs.upload3.submit()
    },
    successUpload(res, file, files) {
      this.$refs.upload1.clearFiles()
      this.title = ''
      this.describe = ''
      this.homeworkDocId = res.homework_id
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
    getStudents() {
      var url = '/student/getAllStudent'
      this.$http.get(url).then(result => {
        this.studentList = result.data.students
      })
    },
    nextAddAudio() {
      this.$refs.upload2.clearFiles()
      this.$refs.upload3.clearFiles()
      this.selectHomework = ''
      this.selectStudent = ''
    },
    pushScore() {
      this.$router.push({
        path: '/evaluation',
        query: { homework_doc_id: this.selectHomework, student_id: this.selectStudent }
      })
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
</style>
