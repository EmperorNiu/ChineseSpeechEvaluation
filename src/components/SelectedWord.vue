<template>
  <div>
    <el-table
      ref="singleTable"
      :data="sheets"
      highlight-current-row
      @current-change="handleChange"
      style="width: 100%"
    >
      <el-table-column property="select_sheet_id" label="序号"></el-table-column>
      <el-table-column property="title" label="标题"></el-table-column>
      <el-table-column property="description" label="说明"></el-table-column>
      <el-table-column property="created_at" label="创建时间"></el-table-column>
    </el-table>
    <!-- <el-collapse
      accordion
      @change="handleChange"
      class="content"
      v-for="item in sheets"
      :key="item.select_sheet_id"
    >
      <el-collapse-item :name="item.select_sheet_id">
        <span class="collapse-title" slot="title">
          {{item.select_sheet_id}}
          创建时间：
          {{item.created_at}}
        </span>
        <div v-for="x in selectedItems['select'+item.select_sheet_id].chars" :key="x.select_char_id">
          {{x.word_dict_id}}
          {{x.select_times}}
          {{x.stock_id}}
        </div>
      </el-collapse-item>
    </el-collapse>-->
  </div>
</template>

<script>
export default {
  mounted() {
    this.getList()
  },
  data() {
    return {
      activeNames: '18',
      selectedItems: {},
      sheets: null
    }
  },
  methods: {
    handleChange(val) {
      this.$router.push({
        path: '/detail',
        query: { id: val.select_sheet_id, title: val.title }
      })
      // if (!('select' + val in this.selectedItems)) {
      //   var url = '/sheet/getSheet?select_sheet_id=' + val
      //   this.$http.get(url).then(result => {
      //     console.log(result.data)
      //     this.selectedItems['select' + val] = result.data
      //   })
      // }
    },
    getList() {
      var url = '/sheet/getSheetList'
      this.$http.get(url).then(result => {
        this.sheets = result.data.sheets.reverse()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.collapse-title {
  flex: 1 0 90%;
  order: 1;
}
</style>
