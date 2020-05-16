<template>
  <div>
    <div v-for="item in p[currentPage-1]" :key="item">{{item}}</div>
    <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="dataList.length"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
      ],
      p1: [],
      p2: [],
      p3: [],
      p: [],
      pageSize: 0,
      currentPage: 1
    }
  },
  mounted() {
    this.pageSize = Math.ceil(this.dataList.length / 3)
    this.p1 = this.dataList.slice(0, this.pageSize)
    this.p2 = this.dataList.slice(this.pageSize, 2 * this.pageSize)
    this.p3 = this.dataList.slice(2 * this.pageSize)
    this.p.push(this.p1, this.p2, this.p3)
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
