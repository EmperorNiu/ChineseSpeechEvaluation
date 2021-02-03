<template>
  <div>
    <el-page-header @back="goBack" content="作业评估"></el-page-header>
    <el-tabs type="border-card" style="margin-top:20px;">
      <el-tab-pane label="命题表达" class="inner-card">
        <aplayer float :music="music" />
        <div class="block" style="margin-top:50px">
          <span class="demonstration">声调准确率</span>
          <el-slider v-model="value1" show-input></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">语调准确率</span>
          <el-slider v-model="value2" show-input></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">流畅程度</span>
          <el-slider v-model="value3" show-input></el-slider>
        </div>
        <div class="comments">
          教师评语
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="comment"
            style="margin-top:5px;"
          ></el-input>
        </div>
        <div class="finish">
          <el-button type="info" round @click="again">重新批改</el-button>
          <el-button type="primary" round @click="finish">完成批改</el-button>
          <el-link type="success" :href="r" class="download">生成报告</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  },
  data() {
    return {
      r: 'http://localhost:8001/api/homework/getReport?stu_id=0&doc_id=5',
      // r: 'http://47.103.83.192:8001/api/homework/getReport2?stu_id=0&doc_id=5',
      value1: 0,
      value2: 0,
      value3: 0,
      checked3: false,
      checked4: true,
      doc_id: '',
      stu_id: '',
      comment: '',
      music: {}
    }
  },
  mounted() {
    this.doc_id = this.$route.query.homework_doc_id
    this.stu_id = this.$route.query.student_id
    if (this.$route.query.special === 1) {
      this.getHistory()
    }
    this.getAudios()
  },
  methods: {
    async getAudios() {
      var url =
        '/student/getAudios?stu_id=' + this.stu_id + '&doc_id=' + this.doc_id
      await this.$http.get(url).then(result => {
        var audiosPos = result.data.students_homework
        for (var i = 0; i < audiosPos.length; i++) {
          if (audiosPos[i].type === '1') {
            this.music = {
              title: '字词训练',
              url:
                'http://localhost:8001/api/resource/audio?pos=' +
                audiosPos[i].audio,
              // url:
              //   'http://47.103.83.192:8001/api/resource/audio?pos=' +
              //   audiosPos[i].audio,
              lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
            }
          }
        }
      })
    },
    // 完成并上传批改
    finish() {
      var url = '/student/homworkresult'
      var pushData = {
        student_id_refer: this.stu_id,
        homework_doc_id_refer: parseInt(this.doc_id),
        tone_accuracy: this.value1,
        intonation_accuracy: this.value2,
        fluency: this.value3,
        comment: this.comment,
        is_thesis_express: 1
      }
      this.$http.post(url, pushData).then(result => {
        this.$message({
          message: '批改提交成功',
          type: 'success'
        })
      })
      this.r =
        'http://localhost:8001/api/homework/getReport2?stu_id=' +
        this.stu_id +
        '&doc_id=' +
        this.doc_id
      // this.r =
      //   'http://47.103.83.192:8001/api/homework/getReport2?stu_id=' +
      //   this.stu_id +
      //   '&doc_id=' +
      //   this.doc_id
    },
    again() {
      this.value1 = 0
      this.value2 = 0
      this.value3 = 0
      this.comment = ''
    },
    goBack() {
      this.$router.go(-1)
    },
    // 获取历史批改结果
    async getHistory() {
      var result = this.$route.query.result_id
      var url1 = '/student/getHomeworkResultScore?result_id=' + result
      await this.$http.get(url1).then(result => {
        console.log(result.data)
        var data = result.data.result
        this.value1 = data.tone_accuracy
        this.value2 = data.intonation_accuracy
        this.value3 = data.fluency
        this.comment = data.comment
      })
    }
  }
}
</script>

<style lang="less" scoped>
.word-group {
  display: flex;
  flex-direction: row;
  width: 550px;
  height: 50px;
  // border: 2px solid rgba(214, 213, 166, 0.822);
  // border-radius: 10px;
}
.char-contain {
  display: flex;
  flex-direction: row;
  width: 150px;
}
.char {
  line-height: 50px;
  margin-left: 10px;
  margin-right: 10px;
}
.word-char {
  display: flex;
  flex-direction: row;
  line-height: 50px;
}
.word {
  line-height: 50px;
  margin-left: 10px;
  margin-right: 10px;
}
.comments {
  margin-top: 20px;
}
.hasChosen {
  line-height: 50px;
  width: 70px;
  font-size: 12px;
}
.hasChosenItem {
  display: inline;
}
.popover {
  display: flex;
  flex-direction: column;
}
.cb {
  margin-bottom: 10px;
}
.inner-card {
  padding-left: 30px;
  padding-right: 30px;
}
.finish {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  // margin-left: 65%;
}
.download {
  margin-left: 10px;
}
.audio-player {
  position: fixed;
  width: 80%;
  top: 120px;
}
</style>
