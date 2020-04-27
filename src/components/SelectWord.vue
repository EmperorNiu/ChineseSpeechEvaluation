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
            <el-autocomplete
              class="inline-input"
              v-model="charContent"
              :fetch-suggestions="querySearch1"
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
              <el-button slot="append" @click="addChar">添加</el-button>
            </el-autocomplete>
          </div>
          <el-table :data="selectchars" border style="width: 100%" max-height="300px">
            <el-table-column prop="word" label="字"></el-table-column>
            <el-table-column prop="frequent" label="字频"></el-table-column>
            <el-table-column prop="type" label="类别"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, selectchars)"
                  type="text"
                  size="small"
                >移除</el-button>
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
            <el-autocomplete
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
              <el-button slot="append" @click="addWord">添加</el-button>
            </el-autocomplete>
          </div>
          <el-table :data="selectwords" border style="width: 100%" max-height="300px">
            <el-table-column prop="word" label="字"></el-table-column>
            <el-table-column prop="frequent" label="字频"></el-table-column>
            <el-table-column prop="is_common" label="是否常用"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, selectwords)"
                  type="text"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <p>注：字type：0:'常用',1:'通用',2:'非通用'</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      charContent: '',
      wordContent: '',
      selectchar: null,
      selectword: null,
      selectchars: [],
      selectwords: [],
      input2: '',
      select: '1',
      timeout: null,
      title: '',
      des: '',
      iscommon: true
    }
  },
  methods: {
    querySearch1(queryString, cb) {
      var url = '/char/query?char=' + queryString + '&type=' + this.select
      var r
      this.$http.get(url).then(result => {
        this.selectchar = result.data.result
        r =
          result.data.result.word +
          ' ( 字频: ' +
          result.data.result.frequent +
          ' )'
      })
      // 调用 callback 返回建议列表的数据
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        var list = [{ value: r }]
        cb(list)
      }, 1000 * Math.random())
    },
    handleSelect1(item) {
      this.selectword = item.others
      console.log(item)
    },
    // 用户确认添加
    addChar() {
      this.selectchars.push(this.selectchar)
    },
    querySearchWord(queryString, cb) {
      if (queryString === '') {
        return
      }
      var url = '/word/query?word=' + queryString
      var r
      var list = []
      var i
      this.$http.get(url).then(result => {
        this.selectword = result.data.result
        var tmp = result.data.result
        console.log(result.data.result)
        for (i in tmp) {
          console.log(i)
          r = tmp[i].word + '(词频:' + tmp[i].frequent + ')'
          list.push({ value: r, others: tmp[i] })
        }
      })
      // 调用 callback 返回建议列表的数据
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        console.log(list)
        cb(list)
      }, 1000 * Math.random())
    },
    addWord() {
      this.is_common = this.selectword.is_common
      if (this.selectword.is_common === true) {
        this.selectword.is_common = '是'
      } else {
        this.selectword.is_common = '否'
      }
      this.selectwords.push(this.selectword)
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    finishAdd() {
      var url = '/sheet/create'
      var selc = []
      var selw = []
      var c, tmp
      for (c in this.selectchars) {
        tmp = {
          word_dict_id: this.selectchars[c].index,
          select_times: this.selectchars[c].frequent + 1,
          word: this.selectchars[c].word,
          stock_id: parseInt(this.select),
          kind: this.selectchars[c].type
        }
        // console.log(tmp)
        selc.push(tmp)
      }
      for (c in this.selectwords) {
        tmp = {
          word_dict_id: this.selectwords[c].index,
          select_times: this.selectwords[c].frequent + 1,
          word: this.selectwords[c].word,
          stock_id: parseInt(this.select),
          is_common: this.is_common
        }
        selw.push(tmp)
      }
      var newHomework = {
        title: this.title,
        description: this.des,
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
