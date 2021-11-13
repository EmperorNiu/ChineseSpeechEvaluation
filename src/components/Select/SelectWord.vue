<template>
  <div>
    <el-card class="card">
      <!-- 顶层标题 -->
      <div slot="header" class="clearfix">
        <span>教师选词</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="finishAdd">添加作业</el-button>
      </div>
      <!-- 核心内容 -->
      标题：
      <el-input v-model="title" placeholder="请输入内容" class="my-input"></el-input>
      <br />备注：
      <el-input v-model="des" placeholder="请输入内容" class="my-input"></el-input>
      <div class="add-homeword">
        <!-- card：选字 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix subCardHead" style="border-bottom-color:black">
            <span>选字</span>
          </div>
          <div style="margin-bottom: 15px;">
            <el-input
              class="inline-input"
              v-model="charContent"
              placeholder="请输入内容"
              style="width:100%"
              clearable
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px">
                <el-option label="小字库" value="1"></el-option>
                <el-option label="中字库" value="2"></el-option>
                <el-option label="新建库" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="querySearchChar" @keyup.enter="querySearchChar"></el-button>
            </el-input>
          </div>
          <div v-if="polyphoneShow">
            <p>hello world</p>
          </div>
          <el-table :data="selectchars" border style="width: 100%" max-height="300px">
            <el-table-column prop="word" label="字"></el-table-column>
            <el-table-column prop="nf" label="已用"></el-table-column>
            <el-table-column prop="type" label="类别"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, selectchars)"
                  type="text"
                  size="small"
                >移除</el-button>
                <el-button type="text" size="small" @click="detail(scope.row.word)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <!-- card：选词 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix subCardHead" style="border-bottom-color:black">
            <span>选词</span>
          </div>
          <div style="margin-bottom: 15px;">
            <el-input
              class="inline-input"
              v-model="wordContent"
              :fetch-suggestions="querySearchWord"
              placeholder="请输入内容"
              @select="handleSelect1"
              style="width:100%"
              clearable
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px">
                <el-option label="小字库" value="1"></el-option>
                <el-option label="中字库" value="2"></el-option>
                <el-option label="新建库" value="3"></el-option>
              </el-select>
              <el-button slot="append" @click="querySearchWord" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table :data="selectwords" border style="width: 100%" max-height="300px">
            <el-table-column prop="word" label="词"></el-table-column>
            <el-table-column prop="nf" label="已用"></el-table-column>
            <el-table-column prop="is_common" label="类别"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, selectwords)"
                  type="text"
                  size="small"
                >移除</el-button>
                <el-button type="text" size="small" @click="detail2(scope.row.word)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
    <el-drawer title="历史选择情况" :visible.sync="drawer">
      <div v-for="item in historys" :key="item.select_sheet_id">
        <div>
          序号：{{item.select_sheet_id}},
          标题：{{item.title}},
        </div>
      </div>
      <div>共计：{{historys.length}}</div>
    </el-drawer>
  </div>
</template>

<script>
// var pinyin = require('pinyin')
// console.log(pinyin('中心', {
//   heteronym: true// 启用多音字模式
// }))
export default {
  data() {
    return {
      semester: 1,
      charContent: '',
      wordContent: '',
      selectchar: null,
      selectword: null,
      selectchars: [],
      selectwords: [],
      wordFrequents: [],
      input2: '',
      select: '1',
      timeout: null,
      title: '',
      des: '',
      iscommon: true,
      drawer: false,
      historys: [],
      length: 0,
      polyphoneShow: false
    }
  },
  methods: {
    querySearchChar() {
      var url = '/char/query?char=' + this.charContent + '&type=' + this.select
      this.$http.get(url).then(result => {
        var tmp = result.data.result
        url = '/sheet/getCharHistory?word=' + tmp.word
        this.$http.get(url).then(result => {
          if (result.data.sheets != null) {
            tmp.nf = result.data.sheets.length
          } else {
            tmp.nf = 0
          }
          this.selectchars.push(tmp)
        })
        // this.polyphoneShow = true
      })
    },
    handleSelect1(item) {
      this.selectword = item.others
      // console.log(item)
    },
    async querySearchWord() {
      if (this.wordContent === '') {
        return
      }
      var url = '/word/query?word=' + this.wordContent + '&type=' + this.select
      await this.$http.get(url).then(result => {
        var tmp = result.data.result
        // console.log(tmp.length)
        var i
        for (i = 0; i < tmp.length; i++) {
          // console.log(i)
          var t = tmp[i]
          if (t.is_common === '是') {
            t.is_common = '常用'
          }
          this.tmpFun(t)
        }
      })
    },
    tmpFun(t) {
      var url = '/sheet/getWordHistory?word=' + t.word
      this.$http.get(url).then(result => {
        // console.log(t)
        if (result.data.sheets != null) {
          t.nf = result.data.sheets.length
        } else {
          t.nf = 0
        }

        this.selectwords.push(t)
      })
    },
    charDetail() {
      console.log('see')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    detail(word) {
      // console.log(word)
      this.drawer = true
      this.historys = []
      var url = '/sheet/getCharHistory?word=' + word
      this.$http
        .get(url)
        .then(result => {
          if (result.data.sheets != null) {
            this.historys = result.data.sheets
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.drawer = false
        })
    },
    detail2(word) {
      this.drawer = true
      this.historys = []
      var url = '/sheet/getWordHistory?word=' + word
      this.$http
        .get(url)
        .then(result => {
          if (result.data.sheets != null) {
            this.historys = result.data.sheets
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.drawer = false
        })
    },
    // 完成作业字词选择，更新sheet列表
    finishAdd() {
      var url = '/sheet/create'
      var selc = []
      var selw = []
      var c, tmp
      for (c in this.selectchars) {
        tmp = {
          word_dict_id: this.selectchars[c].index,
          stock_times: this.selectchars[c].frequent,
          word: this.selectchars[c].word,
          stock_id: parseInt(this.select),
          type: this.selectchars[c].type
        }
        selc.push(tmp)
      }
      for (c in this.selectwords) {
        tmp = {
          word_dict_id: this.selectwords[c].index,
          stock_times: this.selectwords[c].frequent,
          word: this.selectwords[c].word,
          stock_id: parseInt(this.select),
          is_common: this.selectwords[c].is_common
        }
        selw.push(tmp)
      }
      var newHomework = {
        title: this.title,
        description: this.des,
        semester: this.semester,
        SelectChars: selc,
        SelectWords: selw
      }
      this.$http.post(url, newHomework).then(result => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.$router.push('/selectedword')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-top: 8px;
  height: 650px;
}
.add-homeword {
  display: flex;
  flex-direction: row;
}
.box-card {
  margin-left: 5%;
  margin-right: 5%;
  background-color: rgba(236, 236, 236, 0.849);
  width: 40%;
  height: 420px;
}
.text {
  font-size: 14px;
}
.my-input {
  width: 60%;
  margin-bottom: 8px;
  margin-left: 9px;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>
