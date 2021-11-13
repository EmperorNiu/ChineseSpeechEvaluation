<template>
  <div>
    <el-page-header @back="goBack" content="学生列表"></el-page-header>
    <!-- <div class="table-header">
      <div class="table-header-title">学生列表</div>
      <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="table-header-input" />
    </div> -->
    <el-table
      :data="studentList"
      style="width: 70%"
    >
    <!-- <el-table
      :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    > -->
      <el-table-column prop="student_id" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.county = this.$route.query.county
    this.province = this.$route.query.province
    this.race = this.$route.query.race
    this.sex = this.$route.query.sex
    this.getDocs()
    this.getStudents()
    // this.getAdminCode()
    // this.getUnmarkedHomework()
  },
  data() {
    return {
      province: '',
      county: '',
      race: '',
      sex: '',
      selectHomework: '',
      selectTeacher: '',
      selectStudent: '',
      homeworkDocId: '',
      addStuId: '',
      docList: [],
      codeList: [],
      studentList: [],
      search: '',
      dialogTable: [],
      formLabelWidth: '80px'
    }
  },
  methods: {
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
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then((result) => {
        this.docList = result.data.docs
      })
    },
    // 获取所有学生列表
    getStudents() {
      var url = '/analysis/filterStudents?county=' + this.county + '&province=' + this.province +
                '&race=' + this.race + '&sex=' + this.sex
      this.$http.get(url).then((result) => {
        this.studentList = result.data.students
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    formatTimeStr(str) {
      var time = new Date(str)
      var m = time.getMonth() + 1
      return time.getFullYear() + '-' + m + '-' + time.getDate()
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
    // 查看作业结果
    seeHomework(x) {
      this.$router.push({
        path: '/analysisHomeworkResult',
        query: {
          stu_id: x.student_id,
          stu_name: x.name
        }
      })
    },
    filterIdHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8 || columnIndex === 9) {
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
  margin-bottom: 10px;
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
</style>
