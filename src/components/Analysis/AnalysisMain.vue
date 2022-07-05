<template>
  <div>
    <div class="title">
      <h2>地域错误统计</h2>
    </div>
    <!-- 属性选择器 + 按钮 -->
    <div class="select-group">
      <el-row :gutter="12">
        <el-col :span="5">
          <el-select v-model="province" filterable placeholder="请选择">
            <el-option
              v-for="item in provinceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="county" filterable placeholder="请选择">
            <el-option
              v-for="item in countyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="race" filterable placeholder="请选择">
            <el-option
              v-for="item in raceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="sex" filterable placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="toDetail" v-show="buttonShow">查看详情</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 数据可视化 + 表格 -->
    <div class="data-show">
      <el-row>
        <el-col :span="12"><div id="pie-chart" style="height:300px; width:65%"></div></el-col>
        <el-col :span="12">
          <el-table
            id="scoreTable"
            :data="scoreTableData"
            style="width: 100%">
            <el-table-column
              prop="studentNumber"
              label="学生总数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="toneAccuracy"
              label="声调准确率"
              width="180">
            </el-table-column>
            <el-table-column
              prop="intonationAccuracy"
              label="语调准确率"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fluency"
              label="流利度">
            </el-table-column>
          </el-table>
          <div class="download-container" v-show="buttonShow">
            <div class="subtitle">批量下载:</div>
            <el-button type="primary" @click="downloadXlsx">下载结果</el-button>
            <el-button type="primary" @click="downloadZip(2)">下载音频zip</el-button>
            <el-button type="primary" @click="downloadZip(1)">下载作业zip</el-button>
            <el-button type="primary" @click="downloadZip(3)">下载作业评估zip</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          id="errCountTable"
          :data="errorTableData"
          style="width: 100%">
          <el-table-column
            prop="a"
            label="错读"
            width="180">
          </el-table-column>
          <el-table-column
            prop="b"
            label="漏读"
            width="180">
          </el-table-column>
          <el-table-column
            prop="c"
            label="声母缺陷">
          </el-table-column>
          <el-table-column
            prop="d"
            label="韵母缺陷"
            width="180">
          </el-table-column>
          <el-table-column
            prop="e"
            label="声调偏误"
            width="180">
          </el-table-column>
          <el-table-column
            prop="f"
            label="变调错误">
          </el-table-column>
          <el-table-column
            prop="g"
            label="儿化错误"
            width="180">
          </el-table-column>
          <el-table-column
            prop="h"
            label="轻音错误"
            width="180">
          </el-table-column>
          <el-table-column
            prop="i"
            label="多音字错误">
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      stuIds: [],
      docIds: [],
      errTypeCount: {},
      provinceOptions: [],
      province: '',
      countyOptions: [],
      county: '',
      raceOptions: [],
      race: '',
      buttonShow: false,
      sexOptions: [{
        value: '男'
      }, {
        value: '女'
      }, {
        value: '',
        label: '空'
      }],
      sex: '',
      scoreTableData: [{
        studentNumber: '暂无数据',
        fluency: '暂无数据',
        toneAccuracy: '暂无数据',
        intonationAccuracy: '暂无数据'
      }],
      errorTableData: [{
        a: '暂无数据',
        b: '暂无数据',
        c: '暂无数据',
        d: '暂无数据',
        e: '暂无数据',
        f: '暂无数据',
        g: '暂无数据',
        h: '暂无数据',
        i: '暂无数据'
      }]
    }
  },
  mounted() {
    this.getOption()
    this.draw()
  },
  methods: {
    getOption() {
      var url = '/analysis/getDistinct'
      this.$http.get(url).then((result) => {
        var provinces = result.data.province
        var countys = result.data.county
        var races = result.data.race
        // this.provinceOptions = []
        for (let i = 0; i < provinces.length; i++) {
          this.provinceOptions.push({ value: provinces[i] })
        }
        for (let i = 0; i < countys.length; i++) {
          this.countyOptions.push({ value: countys[i] })
        }
        for (let i = 0; i < races.length; i++) {
          this.raceOptions.push({ value: races[i] })
        }
        this.provinceOptions.push({ value: '', label: '空' })
        this.countyOptions.push({ value: '', label: '空' })
        this.raceOptions.push({ value: '', label: '空' })
      })
    },
    search() {
      const loading = this.$loading({
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var url = '/analysis/getError?county=' + this.county + '&province=' + this.province +
                '&race=' + this.race + '&sex=' + this.sex
      this.$http.get(url).then((result) => {
        loading.close()
        this.buttonShow = true
        var errTypeCount = result.data
        if (errTypeCount.sum === 0) {
          this.scoreTableData = [{
            studentNumber: '暂无数据',
            fluency: '暂无数据',
            toneAccuracy: '暂无数据',
            intonationAccuracy: '暂无数据'
          }]
          this.errorTableData = [{
            a: '暂无数据',
            b: '暂无数据',
            c: '暂无数据',
            d: '暂无数据',
            e: '暂无数据',
            f: '暂无数据',
            g: '暂无数据',
            h: '暂无数据',
            i: '暂无数据'
          }]
        } else {
          this.stuIds = errTypeCount.stuIds
          this.docIds = errTypeCount.docIds
          var pieData = [
            { value: errTypeCount.A, name: '错读' },
            { value: errTypeCount.B, name: '漏读' },
            { value: errTypeCount.C, name: '声母缺陷' },
            { value: errTypeCount.D, name: '韵母缺陷' },
            { value: errTypeCount.E, name: '声调偏误' },
            { value: errTypeCount.F, name: '变调错误' },
            { value: errTypeCount.G, name: '儿化错误' },
            { value: errTypeCount.H, name: '轻音错误' },
            { value: errTypeCount.I, name: '多音字错误' }
          ]
          this.scoreTableData = [{
            studentNumber: errTypeCount.studentNumber,
            fluency: errTypeCount.fluency,
            toneAccuracy: errTypeCount.toneAccuracy,
            intonationAccuracy: errTypeCount.intonationAccuracy
          }]
          var sum = errTypeCount.sum
          this.errorTableData = [{
            a: errTypeCount.A,
            b: errTypeCount.B,
            c: errTypeCount.C,
            d: errTypeCount.D,
            e: errTypeCount.E,
            f: errTypeCount.F,
            g: errTypeCount.G,
            h: errTypeCount.H,
            i: errTypeCount.I
          }, {
            a: (errTypeCount.A / sum).toFixed(4),
            b: (errTypeCount.B / sum).toFixed(4),
            c: (errTypeCount.C / sum).toFixed(4),
            d: (errTypeCount.D / sum).toFixed(4),
            e: (errTypeCount.E / sum).toFixed(4),
            f: (errTypeCount.F / sum).toFixed(4),
            g: (errTypeCount.G / sum).toFixed(4),
            h: (errTypeCount.H / sum).toFixed(4),
            i: (errTypeCount.I / sum).toFixed(4)
          }]
          this.draw(pieData)
        }
        // console.log(this.errTypeCount)
      })
    },
    draw(pieData) {
      var myChart = this.$echarts.init(document.getElementById('pie-chart'))
      myChart.setOption({
        title: {
          text: '各类错误占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [{
          name: '错误数量',
          type: 'pie',
          radius: '50%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    toDetail() {
      this.$router.push('/analysisDetail')
      this.$router.push({
        path: '/analysisDetail',
        query: {
          province: this.province,
          county: this.county,
          race: this.race,
          sex: this.sex
        }
      })
    },
    downloadZip(x) {
      const loading = this.$loading({
        lock: true,
        text: '数据下载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var url, pushData
      if (x === 1) {
        url = '/analysis/getDocZip'
        pushData = {
          docIds: this.docIds
        }
      } else if (x === 2) {
        url = '/analysis/getAudioZip'
        pushData = {
          stuIds: this.stuIds
        }
      } else {
        url = '/analysis/getReportZip'
        pushData = {
          stuIds: this.stuIds
        }
      }
      this.$http({
        method: 'post',
        url: url,
        data: pushData,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json;application/zip'
        }
      }).then(result => {
      // .post(url, pushData).then(result => {
        loading.close()
        const url = window.URL
          .createObjectURL(new Blob([result.data]), {
            type: 'application/zip'
          })
        // console.log(result.data)
        const link = document.createElement('a')
        link.href = url
        // var fileName = result.headers['content-disposition'].split('=')[1]
        // console.log(result.headers)
        link.setAttribute('download', 'data' + x + '.zip')
        document.body.appendChild(link)
        link.click()
        // this.$message({
        //   message: '批改提交成功',
        //   type: 'success'
        // })
      }).catch(() => {
        loading.close()
        this.$message({
          message: '下载失败',
          type: 'warning'
        })
      })
    },
    // downloadXlsx(x) {
    //   var table1 = document.querySelector('#scoreTable')
    //   var table2 = document.querySelector('#errorCountTable')
    //   var sheetName1 = 'sheet1'
    //   var sheetName2 = 'sheet2'
    //   var sheet1 = XLSX.utils.table_to_sheet(table1)
    //   var sheet2 = XLSX.utils.table_to_sheet(table2)
    //   openDownloadDialog(sheet2blob(sheet1, sheetName1),'下载.xlsx')
    // },
    downloadXlsx() {
      var content = 'a,b,c,d,e,f,g,h,i\n'
      var tmp = Object.keys(this.errorTableData[0])
      for (let i = 0; i < this.errorTableData.length; i++) {
        for (let j = 0; j < 9; j++) {
          content += this.errorTableData[i][tmp[j]]
          content += ','
        }
        content += '\n'
      }
      content += '\nstudentNumber,fluency,toneAccuracy,intonationAccuracy\n'
      tmp = Object.keys(this.scoreTableData[0])
      for (let i = 0; i < this.scoreTableData.length; i++) {
        for (let j = 0; j < 4; j++) {
          content += this.scoreTableData[i][tmp[j]]
          content += ','
        }
        content += '\n'
      }
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + content)
      element.setAttribute('download', 'errorStatistics.csv')
      element.style.display = 'none'
      element.click()
    }
  }
}
</script>

<style lang="less">
.title {
  margin-top: 15px;
  margin-left: 30px;
}
.select-group {
  margin-top: 20px;
  padding-left: 35px;
  margin-bottom: 30px;
}
.data-show {
  padding-left: 35px;
  padding-right: 35px;
}
.download-container {
  margin-top: 15px;
}
.subtitle {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
