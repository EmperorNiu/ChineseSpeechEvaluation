<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="字词训练" class="inner-card">
        <el-row>
          <el-col :span="12">
            <div class="word-group" v-for="item in dataCol1" :key="item.index">
              <div class="char-contain">
                <div class="char">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group
                        v-model="item.checkedErrors0"
                        @change="handleCheckedChange"
                      >
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
                      <el-checkbox-group
                        v-model="item.checkedErrors1[index]"
                        @change="handleCheckedChange"
                      >
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
                  >{{err.label}},</div>
                </div>
              </div>
              <div class="word-char" v-for="(citem,index) in item.word2Split" :key="index">
                <div class="word">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group
                        v-model="item.checkedErrors2"
                        @change="handleCheckedChange"
                      >
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
                    v-for="err in item.checkedErrors2"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="word-group" v-for="item in dataCol2" :key="item.index">
              <div class="char-contain">
                <div class="char">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group
                        v-model="item.checkedErrors0"
                        @change="handleCheckedChange"
                      >
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
                      <el-checkbox-group
                        v-model="item.checkedErrors1[index]"
                        @change="handleCheckedChange"
                      >
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
                    v-for="err in item.checkedErrors1"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
              <div class="word-char" v-for="(citem,index) in item.word2Split" :key="index">
                <div class="word">
                  <el-popover placement="right" width="150" trigger="click">
                    <div class="popover">
                      <el-checkbox-group
                        v-model="item.checkedErrors2"
                        @change="handleCheckedChange"
                      >
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
                    v-for="err in item.checkedErrors2"
                    :key="err"
                    class="hasChosenItem"
                  >{{err.label}}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="文章朗读" class="inner-card">
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
            v-model="textarea2"
            style="margin-top:5px;"
          ></el-input>
        </div>
        <div class="finish">
          <el-button type="info" round @click="info">重新批改</el-button>
          <el-button type="primary" round @click="finish">完成批改</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataCol1: [],
      dataCol2: [],
      article:
        // eslint-disable-next-line no-multi-str
        '森林涵养水源，保持水土，防止水旱灾害的作用非常大。据专家测算，一片十万亩面积的森林，相当于一个两百万立方米的水库，这正如农谚所说的：“山上多栽树，等于修水库。雨多它能吞，雨少它能吐。”\
说起森林的功劳，那还多得很。它除了为人类提供木材及许多种生产、生活的原料之外，在维护生态环境方面也是功劳卓著。它用另一种“能吞能吐”的特殊功能孕育了人类。因为地球在形成之初，大气中的二氧化碳含量很高，氧气很少，气温也高，生物是难以生存的。大约在四亿年之前，陆地才产生了森林。森林慢慢将大气中的二氧化碳吸收，同时吐出新鲜氧气，调节气温：这才具备了人类生存的条件，地球上才最终有了人类。\
森林，是地球生态系统的主体，是大自然的总调度室，是地球的绿色之肺。森林维护地球生态环境的这种“能吞能吐”的特殊功能是其他任何物体都不能取代的。然而，由于地球上的燃烧物增多，二氧化碳的排放量急剧增加，使得地球生态环境急剧恶化，主要表现为全球气候变暖，水分蒸发加快，改变了气流的循环，使气候变化加剧，从而引发热浪、飓风、暴雨、洪涝及干旱。\
为了使地球的这个“能吞能吐”的绿色之肺恢复健壮，以改善生态环境，抑制全球变暖，减少水旱等自然灾害，我们应该大力造林、护林，使每一座荒山都绿起来。',
      value1: 0,
      value2: 0,
      value3: 0,
      errType: [
        {
          label: 'A',
          name: '错读'
        },
        {
          label: 'B',
          name: '漏读'
        },
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
        }
      ],
      checked3: false,
      checked4: true,
      doc_id: '',
      stu_id: ''
    }
  },
  mounted() {
    this.doc_id = this.$route.query.homework_doc_id
    this.stu_id = this.$route.query.student_id
    this.getWordExercise()
  },
  methods: {
    handleCheckedChange(val) {
      console.log(this.checkedErrors)
    },
    async getWordExercise() {
      var url = '/homework/getWordExercise?id=' + this.doc_id
      await this.$http.get(url).then(result => {
        var tmp = result.data.result
        for (var i = 0; i < tmp.length; i++) {
          if (i % 2 === 0) {
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
          } else {
            tmp[i].checkedErrors0 = []
            tmp[i].checkedErrors1 = []
            tmp[i].word1Split = tmp[i].word1.split('')
            for (j = 0; j < tmp[i].word1Split.length; j++) {
              tmp[i].checkedErrors1.push([])
            }
            tmp[i].checkedErrors2 = []
            tmp[i].word2Split = tmp[i].word2.split('')
            for (j = 0; j < tmp[i].word2Split.length; j++) {
              tmp[i].checkedErrors2.push([])
            }
            this.dataCol2.push(tmp[i])
          }
        }
      })
    },
    finish() {
      var url = '/student/insertError'
      var wordErr = this.dataCol1.concat(this.dataCol2)
      var data = {
        wordErr: wordErr,
        student_id: this.stu_id,
        homework_doc_id_refer: this.doc_id
      }
      this.$http.post(url, data).then(result => {})
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
  width: 50px;
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
  margin-left: 85%;
}
</style>
