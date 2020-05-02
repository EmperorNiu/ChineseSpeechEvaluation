<template>
  <div>
    <h2>{{title}}</h2>
    <el-table :data="data.chars" border style="width: 100%" max-height="300px" class="detail-table">
      <el-table-column prop="word" label="字"></el-table-column>
      <el-table-column label="其他作业中出现">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.word)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="stock_times" label="文章中出现次数"></el-table-column>
      <el-table-column prop="type" label="类别"></el-table-column>
    </el-table>
    <el-table :data="data.words" border style="width: 100%" max-height="300px" class="detail-table">
      <el-table-column prop="word" label="词"></el-table-column>
      <el-table-column label="其他作业中出现">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail2(scope.row.word)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="stock_times" label="文章中出现次数"></el-table-column>
      <el-table-column prop="is_common" label="是否常用"></el-table-column>
    </el-table>
    <el-button type="primary" @click="download(title+'.txt')">导出</el-button>
    <el-drawer title="历史选择情况" :visible.sync="drawer">
      <div v-for="item in historys" :key="item.select_sheet_id">
        <div>
          标题：{{item.title}}
          </div>
      </div>
      <div>共计：{{historys.length}}</div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      title: '',
      exportText: '',
      drawer: false,
      historys: [],
      length: 0
    }
  },
  mounted() {
    var id = this.$route.query.id
    this.title = this.$route.query.title
    var url = '/sheet/getSheet?select_sheet_id=' + id
    this.$http.get(url).then(result => {
      //   console.log(result.data)
      this.data = result.data
    })
  },
  methods: {
    // 生成作业txt文档
    download(filename) {
      this.exportText += '字\n'
      for (var i = 0; i < this.data.chars.length; i++) {
        this.exportText += this.data.chars[i].word
        this.exportText += '\t'
      }
      this.exportText += '\n词\n'
      for (i = 0; i < this.data.words.length; i++) {
        this.exportText += this.data.words[i].word
        this.exportText += '\t'
      }
      var element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(this.exportText)
      )
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    },
    detail(word) {
      this.drawer = true
      this.historys = []
      var url = '/sheet/getCharHistory?word=' + word
      this.$http.get(url).then(result => {
        //   console.log(result.data)
        this.historys = result.data.sheets
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.drawer = false
      })
    },
    detail2(word) {
      this.drawer = true
      this.historys = []
      var url = '/sheet/getWordHistory?word=' + word
      this.$http.get(url).then(result => {
        //   console.log(result.data)
        this.historys = result.data.sheets
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-table {
  margin-bottom: 15px;
}
</style>
