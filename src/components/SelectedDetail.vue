<template>
  <div>
    <el-table :data="data.chars" border style="width: 100%" max-height="300px">
      <el-table-column prop="word" label="字"></el-table-column>
      <el-table-column prop="select_times" label="字频"></el-table-column>
      <el-table-column prop="kind" label="类别"></el-table-column>
      <el-table-column prop="stock_id" label="库"></el-table-column>
    </el-table>
    <el-table :data="data.words" border style="width: 100%" max-height="300px">
      <el-table-column prop="word" label="词"></el-table-column>
      <el-table-column prop="select_times" label="词频"></el-table-column>
      <el-table-column prop="is_common" label="是否常用"></el-table-column>
      <el-table-column prop="stock_id" label="库"></el-table-column>
    </el-table>
    <el-button type="primary" @click="download(title+'.txt')">导出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      title: '',
      exportText: ''
    }
  },
  mounted() {
    // console.log(this.$route.query.id)
    var id = this.$route.query.id
    this.title = this.$route.query.title
    // console.log(this.title)
    // this.tmp = id
    var url = '/sheet/getSheet?select_sheet_id=' + id
    this.$http.get(url).then(result => {
    //   console.log(result.data)
      this.data = result.data
    })
  },
  methods: {
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
    }
  }
}
</script>
