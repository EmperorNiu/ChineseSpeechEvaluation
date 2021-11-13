<!-- HomeworkResults.vue 教师查看学生作业结果界面 -->
<template>
  <div>
    <el-page-header @back="goBack" :content="content"></el-page-header>
    <el-table :data="results" height="520" border style="width: 100%;margin-top:20px;">
      <el-table-column prop="homework_name" label="作业"></el-table-column>
      <el-table-column prop="tone_accuracy" label="声调准确率"></el-table-column>
      <el-table-column prop="intonation_accuracy" label="语调准确率"></el-table-column>
      <el-table-column prop="fluency" label="流畅程度"></el-table-column>
      <el-table-column label="查看/重新批改">
        <template slot-scope="scope">
          <el-button @click="changeHomeworkResult(scope.row)" type="text" size="small">查看批改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button @click="deleteResult(scope.row)" type="text" size="small">删除批改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-note">
      注：查看批改和删除批改处理时间较长，请耐心等待。尤其删除批改不要多次点击造成误删。
    </div>
    <!-- <el-link :href="summary_url" class="bottom-btn">
      <el-button type="success">生成学生作业总结</el-button>
    </el-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      stu_id: '',
      stu_name: '',
      doc_id: '',
      result_id: '',
      results: [],
      content: '',
      summary_url: ''
    }
  },
  mounted() {
    this.stu_id = this.$route.query.stu_id
    this.stu_name = this.$route.query.stu_name
    // this.summary_url = 'http://localhost:8001/api/student/getSummary?stu_id=' + this.stu_id + '&stu_name=' + this.stu_name
    this.summary_url = 'http://47.103.83.192:8001/api/student/getSummary?stu_id=' + this.stu_id + '&stu_name=' + this.stu_name
    this.content = this.stu_id + ' 学生作业'
    var url = '/student/getHomeworkResults?stu_id=' + this.stu_id
    this.$http.get(url).then(result => {
      var tmp = result.data
      // console.log(tmp)
      for (var i = 0; i < tmp.results.length; i++) {
        this.results.push({
          doc_id: tmp.homework[i].homework_doc_id,
          result_id: tmp.results[i].student_homework_result_id,
          homework_name: tmp.homework[i].title,
          tone_accuracy: tmp.results[i].tone_accuracy,
          intonation_accuracy: tmp.results[i].intonation_accuracy,
          fluency: tmp.results[i].fluency,
          type: tmp.results[i].is_thesis_express
        })
      }
      // console.log(result.data)
    })
  },
  methods: {
    // 删除此次批改
    deleteResult(x) {
      var url =
        '/student/deleteResult?stu_id=' +
        this.stu_id +
        '&doc_id=' +
        x.doc_id +
        '&result_id=' +
        x.result_id
      this.$http.get(url)
      this.$router.go(0)
    },
    // 返回上一个界面
    goBack() {
      this.$router.go(-1)
    },
    // 更改批改结果
    changeHomeworkResult(x) {
      if (x.type === 1) {
        this.$router.push({
          path: '/evaluation2',
          query: {
            homework_doc_id: x.doc_id,
            student_id: this.stu_id,
            result_id: x.result_id,
            special: 1
          }
        })
      } else {
        this.$router.push({
          path: '/evaluation',
          query: {
            homework_doc_id: x.doc_id,
            student_id: this.stu_id,
            result_id: x.result_id,
            special: 1
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-btn{
  margin-top: 12px;
  margin-left: 88%
}
.bottom-note {
  margin-top: 10px;
  margin-left: 4%;
  color: #696969;
  size: 10px;
}
</style>
