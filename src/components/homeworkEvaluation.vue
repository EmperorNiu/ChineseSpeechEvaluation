<template>
  <div>
    <el-page-header @back="goBack" content="作业评估"></el-page-header>
    <el-tabs type="border-card" style="margin-top:20px;">
      <el-tab-pane label="字词训练" class="inner-card">
        <aplayer float :music="music1" class="audio-player" />
        <div class="container" style="margin-top:70px;">
          <div class="word-group" v-for="(item, index) in dataInPage[currentPage-1]" :key="index">
            <div class="char-contain">
              <div class="char">
                <el-popover placement="right" width="150" trigger="click">
                  <div class="popover">
                    <el-checkbox-group v-model="item.checkedErrors0">
                      <el-checkbox
                        v-for="err in errType"
                        :key="err.label"
                        class="cb"
                        :label="err"
                        size="medium"
                      >{{err.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-button slot="reference">{{item.character}}</el-button>
                </el-popover>
              </div>
              <div class="hasChosen">
                <div
                  v-for="err in item.checkedErrors0"
                  :key="err"
                  class="hasChosenItem"
                >{{err.label}}</div>
              </div>
            </div>
            <!-- <div class="word-char-contain"></div> -->
            <div class="word-char" v-for="(citem,index) in item.word1Split" :key="index">
              <div class="word">
                <el-popover placement="right" width="150" trigger="click">
                  <div class="popover">
                    <el-checkbox-group v-model="item.checkedErrors1[index]">
                      <el-checkbox
                        v-for="err in errType"
                        :key="err.label"
                        class="cb"
                        :label="err"
                        size="medium"
                      >{{err.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-button slot="reference" size="small">{{citem}}</el-button>
                </el-popover>
              </div>
              <div class="hasChosen">
                <div
                  v-for="err in item.checkedErrors1[index]"
                  :key="err"
                  class="hasChosenItem"
                >{{err.label}}</div>
              </div>
            </div>
            <div class="word-char" v-for="(citem,index) in item.word2Split" :key="index">
              <div class="word">
                <el-popover placement="right" width="150" trigger="click">
                  <div class="popover">
                    <el-checkbox-group v-model="item.checkedErrors2[index]">
                      <el-checkbox
                        v-for="err in errType"
                        :key="err.label"
                        class="cb"
                        :label="err"
                        size="medium"
                      >{{err.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-button slot="reference" size="small">{{citem}}</el-button>
                </el-popover>
              </div>
              <div class="hasChosen">
                <div
                  v-for="err in item.checkedErrors2[index]"
                  :key="err"
                  class="hasChosenItem"
                >{{err.label}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-row> -->
        <!-- <el-col :span="12"> -->

        <!-- </el-col> -->
        <!-- <el-col :span="12">
            <div class="word-group" v-for="item in dataCol2" :key="item.exercise_id">
              <div class="char-contain">
                <div class="char">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group v-model="item.checkedErrors0">
                        <el-checkbox
                          v-for="err in errType"
                          :key="err.label"
                          class="cb"
                          :label="err"
                          size="medium"
                        >{{err.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <el-button slot="reference">{{item.character}}</el-button>
                  </el-popover>
                </div>
                <div class="hasChosen">
                  <div
                    v-for="err in item.checkedErrors0"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
              <div class="word-char" v-for="(citem,index) in item.word1Split" :key="index">
                <div class="word">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group v-model="item.checkedErrors1[index]">
                        <el-checkbox
                          v-for="err in errType"
                          :key="err.label"
                          class="cb"
                          :label="err"
                          size="medium"
                        >{{err.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <el-button slot="reference" size="small">{{citem}}</el-button>
                  </el-popover>
                </div>
                <div class="hasChosen">
                  <div
                    v-for="err in item.checkedErrors1[index]"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
              <div class="word-char" v-for="(citem,index) in item.word2Split" :key="index">
                <div class="word">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group v-model="item.checkedErrors2[index]">
                        <el-checkbox
                          v-for="err in errType"
                          :key="err.label"
                          class="cb"
                          :label="err"
                          size="medium"
                        >{{err.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <el-button slot="reference" size="small">{{citem}}</el-button>
                  </el-popover>
                </div>
                <div class="hasChosen">
                  <div
                    v-for="err in item.checkedErrors2[index]"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
            </div>
        </el-col>-->
        <!-- </el-row> -->
        <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="dataCol1.length"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="文章朗读" class="inner-card">
        <aplayer float :music="music2" />
        <strong>原文</strong>
        <p>{{article}}</p>
        <div class="block">
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
        <div>
          <p>注意：如要生成报告，先点击完成批改！</p>
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
      // r: 'http://localhost:8001/api/homework/getReport?stu_id=0&doc_id=5',
      r: 'http://47.103.83.192:8001/api/homework/getReport?stu_id=0&doc_id=5',
      dataCol1: [],
      dataCol2: [],
      article: '',
      value1: 0,
      value2: 0,
      value3: 0,
      errType: [
        {
          label: 'C',
          name: '声母缺陷'
        },
        {
          label: 'D',
          name: '韵母缺陷'
        },
        {
          label: 'E',
          name: '声调偏误'
        },
        {
          label: 'F',
          name: '变调错误'
        },
        {
          label: 'G',
          name: '儿化错误'
        },
        {
          label: 'H',
          name: '轻音错误'
        },
        {
          label: 'I',
          name: '多音字错误'
        },
        {
          label: 'A',
          name: '错读'
        },
        {
          label: 'B',
          name: '漏读'
        }
      ],
      checked3: false,
      checked4: true,
      doc_id: '',
      stu_id: '',
      comment: '',
      music1: {},
      music2: {},
      currentPage: 1,
      pageSize: 0,
      dataInPage: [],
      finishFlag: 0
    }
  },
  mounted() {
    this.doc_id = this.$route.query.homework_doc_id
    this.stu_id = this.$route.query.student_id
    this.getWordExercise()
    this.getArticle()
    this.getAudios()
  },
  methods: {
    // 获取字词训练
    async getWordExercise() {
      // 从homeworkResults跳转
      if (this.$route.query.special === 1) {
        var result = this.$route.query.result_id
        // 获取文章朗读评分和评语
        var url1 = '/student/getHomeworkResultScore?result_id=' + result
        await this.$http.get(url1).then(result => {
          // console.log(result.data)
          var data = result.data.result
          this.value1 = data.tone_accuracy
          this.value2 = data.intonation_accuracy
          this.value3 = data.fluency
          this.comment = data.comment
        })
        // 获取字词错误
        var url =
          '/homework/getWordExerciseResult?stu_id=' +
          this.stu_id +
          '&result_id=' +
          result
        await this.$http.get(url).then(result => {
          var tmp = result.data.errors
          var i = 0
          // console.log('length: ', tmp.length)
          while (i < tmp.length) {
            var tmp2 = {}
            // 字
            tmp2.character = tmp[i].word
            if (tmp[i].error_types !== '') {
              var l = tmp[i].error_types.split(',')
              var ll = []
              for (var k = 0; k < l.length; k++) {
                ll.push({ label: l[k] })
              }
              tmp2.checkedErrors0 = ll
            } else {
              tmp2.checkedErrors0 = []
            }
            i += 1
            if (tmp[i].whole_word === '') {
              tmp2.word1Split = []
              tmp2.word1 = ''
              tmp2.checkedErrors1 = []
              tmp2.word2Split = []
              tmp2.word2 = ''
              tmp2.checkedErrors2 = []
              this.dataCol1.push(tmp2)
              // console.log(tmp2)
              continue
            }
            // 词1
            tmp2.word1Split = tmp[i].whole_word.split('')
            tmp2.checkedErrors1 = []
            tmp2.word1 = tmp[i].whole_word
            for (var j = 0; j < tmp2.word1Split.length; j++) {
              if (tmp[i].error_types !== '') {
                l = tmp[i].error_types.split(',')
                ll = []
                for (k = 0; k < l.length; k++) {
                  ll.push({ label: l[k] })
                }
                tmp2.checkedErrors1.push(ll)
              } else {
                tmp2.checkedErrors1.push([])
              }
              i += 1
            }
            if (i >= tmp.length) {
              break
            }
            if (tmp[i].whole_word === '') {
              tmp2.word2Split = []
              tmp2.word2 = ''
              tmp2.checkedErrors2 = []
              this.dataCol1.push(tmp2)
              // console.log(tmp2)
              // console.log(i)
              continue
            }
            // 词2
            tmp2.word2Split = tmp[i].whole_word.split('')
            tmp2.word2 = tmp[i].whole_word
            tmp2.checkedErrors2 = []
            for (j = 0; j < tmp2.word2Split.length; j++) {
              if (tmp[i].error_types !== '') {
                l = tmp[i].error_types.split(',')
                ll = []
                for (k = 0; k < l.length; k++) {
                  ll.push({ label: l[k] })
                }
                tmp2.checkedErrors2.push(ll)
              } else {
                tmp2.checkedErrors2.push([])
              }
              i += 1
            }
            // console.log(tmp2)
            this.dataCol1.push(tmp2)
          }
          this.pageSize = Math.ceil(this.dataCol1.length / 4)
          var p1 = this.dataCol1.slice(0, this.pageSize)
          var p2 = this.dataCol1.slice(this.pageSize, 2 * this.pageSize)
          var p3 = this.dataCol1.slice(2 * this.pageSize, 3 * this.pageSize)
          var p4 = this.dataCol1.slice(3 * this.pageSize)
          this.dataInPage.push(p1, p2, p3, p4)
        })
      } else {
        url = '/homework/getWordExercise?id=' + this.doc_id
        await this.$http.get(url).then(result => {
          var tmp = result.data.result
          for (var i = 0; i < tmp.length; i++) {
            tmp[i].checkedErrors0 = []
            tmp[i].checkedErrors1 = []
            tmp[i].word1Split = tmp[i].word1.split('')
            for (var j = 0; j < tmp[i].word1Split.length; j++) {
              tmp[i].checkedErrors1.push([])
            }
            tmp[i].checkedErrors2 = []
            tmp[i].word2Split = tmp[i].word2.split('')
            for (j = 0; j < tmp[i].word2Split.length; j++) {
              tmp[i].checkedErrors2.push([])
            }
            this.dataCol1.push(tmp[i])
          }
          this.pageSize = Math.ceil(this.dataCol1.length / 4)
          var p1 = this.dataCol1.slice(0, this.pageSize)
          var p2 = this.dataCol1.slice(this.pageSize, 2 * this.pageSize)
          var p3 = this.dataCol1.slice(2 * this.pageSize, 3 * this.pageSize)
          var p4 = this.dataCol1.slice(3 * this.pageSize)
          this.dataInPage.push(p1, p2, p3, p4)
        })
      }
    },
    async getArticle() {
      var url = '/homework/getArticle?id=' + this.doc_id
      await this.$http.get(url).then(result => {
        this.article = result.data.result.content
      })
    },
    async getAudios() {
      var url =
        '/student/getAudios?stu_id=' + this.stu_id + '&doc_id=' + this.doc_id
      await this.$http.get(url).then(result => {
        var audiosPos = result.data.students_homework
        // console.log(audiosPos)
        for (var i = 0; i < audiosPos.length; i++) {
          if (audiosPos[i].type === '1') {
            this.music1 = {
              title: '字词训练',
              // url:
              //   'http://localhost:8001/api/resource/audio?pos=' +
              //   audiosPos[i].audio,
              url:
                'http://47.103.83.192:8001/api/resource/audio?pos=' +
                audiosPos[i].audio,
              lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
            }
          } else {
            this.music2 = {
              title: '课文朗读',
              // url:
              //   'http://localhost:8001/api/resource/audio?pos=' +
              //   audiosPos[i].audio,
              url:
                'http://47.103.83.192:8001/api/resource/audio?pos=' +
                audiosPos[i].audio,
              lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
            }
          }
        }
      })
    },
    // 完成并上传批改
    finish() {
      var url = '/student/homeworkResult'
      var wordErr = []
      wordErr = wordErr.concat(
        this.dataInPage[0],
        this.dataInPage[1],
        this.dataInPage[2],
        this.dataInPage[3]
      )
      var data = []
      var j = 0
      var k = 0
      var errNum = 0
      // console.log(wordErr[1].checkedErrors0)
      for (var i = 0; i < wordErr.length; i++) {
        // console.log(wordErr[i])
        var errs = []
        for (j = 0; j < wordErr[i].checkedErrors0.length; j++) {
          errs.push(wordErr[i].checkedErrors0[j].label)
        }
        errNum += errs.length
        var w1 = {
          word: wordErr[i].character,
          studend_id_refer: this.stu_id,
          error_types: errs.join(',')
        }
        data.push(w1)
        for (j = 0; j < wordErr[i].word1Split.length; j++) {
          errs = []
          for (k = 0; k < wordErr[i].checkedErrors1[j].length; k++) {
            errs.push(wordErr[i].checkedErrors1[j][k].label)
          }
          errNum += errs.length
          w1 = {
            word: wordErr[i].word1Split[j],
            studend_id_refer: this.stu_id,
            error_types: errs.join(','),
            whole_word: wordErr[i].word1
          }
          data.push(w1)
        }
        for (j = 0; j < wordErr[i].word2Split.length; j++) {
          errs = []
          for (k = 0; k < wordErr[i].checkedErrors2[j].length; k++) {
            errs.push(wordErr[i].checkedErrors2[j][k].label)
          }
          errNum += errs.length
          w1 = {
            word: wordErr[i].word2Split[j],
            studend_id_refer: this.stu_id,
            error_types: errs.join(','),
            whole_word: wordErr[i].word2
          }
          data.push(w1)
        }
      }
      var pushData = {
        student_id_refer: this.stu_id,
        homework_doc_id_refer: parseInt(this.doc_id),
        tone_accuracy: this.value1,
        intonation_accuracy: this.value2,
        fluency: this.value3,
        word_errors: data,
        comment: this.comment,
        is_thesis_express: 0,
        minus_word_error_score: errNum
      }
      // console.log(errNum)
      this.$http.post(url, pushData).then(result => {
        this.$message({
          message: '批改提交成功',
          type: 'success'
        })
      })

      // this.r =
      //   'http://localhost:8001/api/homework/getReport?stu_id=' +
      //   this.stu_id +
      //   '&doc_id=' +
      //   this.doc_id
      this.r =
        'http://47.103.83.192:8001/api/homework/getReport?stu_id=' +
        this.stu_id +
        '&doc_id=' +
        this.doc_id
    },
    // 弃用
    report() {
      // console.log(this.finishFlag)
      if (this.finishFlag === 0) {
        var url =
          '/homework/getReport?stu_id=' + this.stu_id + '&doc_id=' + this.doc_id
        this.$http.get(url)
      } else {
        this.$message({
          message: '未提交批改，请先提交批改',
          type: 'warning'
        })
      }
    },
    again() {
      this.finishFlag = 0
      this.value1 = 0
      this.value2 = 0
      this.value3 = 0
      this.comment = ''
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < this.dataInPage[i].length; j++) {
          this.dataInPage[i][j].checkedErrors0 = []
          for (
            var k = 0;
            k < this.dataInPage[i][j].checkedErrors1.length;
            k++
          ) {
            this.dataInPage[i][j].checkedErrors1[k] = []
          }
          for (k = 0; k < this.dataInPage[i][j].checkedErrors2.length; k++) {
            this.dataInPage[i][j].checkedErrors2[k] = []
          }
        }
      }
      // for (var i = 0; i < this.dataCol1.length; i++) {
      //   this.dataCol1[i].checkedErrors0 = []
      //   this.dataCol1[i].checkedErrors1 = []
      //   for (var j = 0; j < this.dataCol1[i].checkedErrors1.length; j++) {
      //     this.dataCol1[i].checkedErrors1[j] = []
      //   }
      //   this.dataCol1[i].checkedErrors2 = []
      //   for (j = 0; j < this.dataCol1[i].checkedErrors2.length; j++) {
      //     this.dataCol1[i].checkedErrors2[j] = []
      //   }
      // }
      // for (i = 0; i < this.dataCol2.length; i++) {
      //   this.dataCol2[i].checkedErrors0 = []
      //   this.dataCol2[i].checkedErrors1 = []
      //   for (j = 0; j < this.dataCol2[i].checkedErrors1.length; j++) {
      //     this.dataCol2[i].checkedErrors1[j] = []
      //   }
      //   this.dataCol2[i].checkedErrors2 = []
      //   for (j = 0; j < this.dataCol1[i].checkedErrors2.length; j++) {
      //     this.dataCol2[i].checkedErrors2[j] = []
      //   }
      // }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    // 返回上一个界面
    goBack() {
      this.$router.go(-1)
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
  top: 170px;
}
</style>
