<!-- 教师上传学生作业，查看作业界面  -->
<template>
  <div>
    <!-- 管理员权限界面 -->
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="添加培训人员" name="1">
        <h3>批量添加学员及老师：通过上传学生教师xlsx表格向数据库中添加学生老师</h3>
        <div class="upload-doc-main">
          <div class="upload-doc-input-text">文件：</div>
          <!-- <el-upload
            class="upload-part"
            ref="StudentListFile"
            action="http://localhost:8001/api/student/upload/StudentList"
            :auto-upload="false"
            :on-success="successUpload"
          > -->
          <el-upload
            class="upload-part"
            ref="StudentListFile"
            action="http://47.103.83.192:8001/api/student/upload/StudentList"
            :auto-upload="false"
            :on-success="successUpload"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="uploadStudentList"
            >上传</el-button>
            <div slot="tip" class="el-upload__tip">请参照模板xlsx文件上传</div>
          </el-upload>
        </div>
        <h3>标准模板</h3>
        <el-table
          :data="exampleTableData"
          style="width: 100%"
          :span-method="objectSpanMethod">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="stu_id"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="ketangpaiid"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="phone_num"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份">
          </el-table-column>
          <el-table-column
            prop="county"
            label="地区">
          </el-table-column>
          <el-table-column
            prop="race"
            label="民族">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="培训教师">
          </el-table-column>
          <el-table-column
            prop="tphone_num"
            label="教师电话">
          </el-table-column>
        </el-table>
        <div>
          <el-link href="http://47.103.83.192:8001/api/resource/studentListTemplate">
            <el-button type="success" size="small" style="margin-left:35px; margin-top:30px">下载模板样例</el-button>
          </el-link>
          <!-- <el-link href="http://localhost:8001/api/resource/studentListTemplate">
            <el-button type="success" size="small" style="margin-left:35px; margin-top:30px">下载模板样例</el-button>
          </el-link> -->
        </div>
        <p>注：上传文件格式为xlsx，列名必须完全一致，且顺序相同，其他格式无要求</p>
      </el-tab-pane>
      <el-tab-pane label="作业管理" name="2">
        <div class="tab-main">
          <h3>作业列表</h3>
          <div style="margin-left:10px;">
            <el-table
              :data="docList"
              style="width: 50%"
            >
              <el-table-column prop="title" label="作业名称"></el-table-column>
              <el-table-column prop="describe" label="作业描述"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="deleteHomework(scope.row.homework_doc_id)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <div class="table-header">
          <div class="table-header-title">作业列表</div>
        </div> -->
      </el-tab-pane>
      <!-- <el-tab-pane label="成绩管理" name="3">
        <div class="table-header">
          <div class="table-header-title">作业列表</div>
        </div>
        <el-table
          :data="docList"
          style="width: 50%"
        >
          <el-table-column prop="title" label="作业名称"></el-table-column>
          <el-table-column prop="describe" label="作业描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteHomework(scope.row.homework_doc_id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
      <el-tab-pane label="上传作业doc文档" name="4">
        <div class="tab-main">
          <h3>上传文档</h3>
          <div class="upload-doc-input">
            <div class="upload-doc-input-text">标题：</div>
            <el-input v-model="title" placeholder="请输入内容" class="upload-doc-top-elinput"></el-input>
          </div>
          <div class="upload-doc-input">
            <div class="upload-doc-input-text">备注：</div>
            <el-input v-model="describe" placeholder="请输入内容" class="upload-doc-top-elinput"></el-input>
          </div>
          <div class="upload-doc-main">
            <div class="upload-doc-input-text">文件：</div>
            <!-- <el-upload
              class="upload-part"
              ref="upload1"
              action="http://localhost:8001/api/homework/upload/doc"
              :data="{title:title,describe:describe}"
              :auto-upload="false"
              :on-success="successUpload"
            > -->
            <el-upload
              class="upload-part"
              ref="upload1"
              action="http://47.103.83.192:8001/api/homework/upload/doc"
              :data="{title:title,describe:describe}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传</el-button>
              <div slot="tip" class="el-upload__tip">只能预先设定好的doc模板文件</div>
            </el-upload>
          </div>
          <div style="margin-top:35px">
            <el-button class="next" size="small" type="warning" @click="secondHomework">命题表达作业</el-button>
          </div>
          <div style="margin-top:15px">注：如果是自由评注作业，无需上传文档，直接点击命题表达作业按钮；如果是平时作业，则无需点击此按钮</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传学生音频" name="5">
        <div class="tab-main">
          <h3>上传音频</h3>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择作业：</div>
            <el-select
              v-model="selectHomework"
              placeholder="请选择"
              class="upload-audio-student-select"
              filterable
            >
              <el-option
                v-for="item in docList"
                :key="item.homework_doc_id"
                :label="item.title"
                :value="item.homework_doc_id"
              ></el-option>
            </el-select>
            <div class="upload-doc-input-text" style="margin-left:30px">
              <el-checkbox v-model="isfree">是否是命题表达</el-checkbox>
            </div>
          </div>
          <div class="upload-audio-student">
            <div class="upload-doc-input-text">选择学生：</div>
            <el-select
              v-model="selectStudent"
              placeholder="请选择"
              class="upload-audio-student-select"
              filterable
            >
              <el-option
                v-for="item in studentList"
                :key="item.student_id"
                :label="item.student_id"
                :value="item.student_id"
              ></el-option>
            </el-select>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">字词训练音频/命题表达音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload2"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:1}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload2"
              >上传</el-button>
            </el-upload>
          </div>
          <div class="upload-audio-contain">
            <div class="upload-doc-input-text">朗读音频：</div>
            <!-- <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://localhost:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
            > -->
            <el-upload
              class="audio-upload"
              ref="upload3"
              action="http://47.103.83.192:8001/api/student/upload/audio"
              :data="{student_id:selectStudent,doc_id:selectHomework,type:2}"
              :auto-upload="false"
              :on-success="successUpload"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload3"
              >上传</el-button>
            </el-upload>
          </div>
          <el-button class="next" size="small" type="primary" @click="nextAddAudio">下一个</el-button>
          <el-button class="next" size="small" type="warning" @click="pushScore">开始打分</el-button>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="查看学生作业" name="6">
        <div class="table-header">
          <div class="table-header-title">学生列表</div>
          <el-input v-model="search" size="small" placeholder="输入关键字搜索" class="table-header-input" />
          <el-button size="small" class="table-header-button">导出Excel</el-button>
        </div>
        <el-table
          :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column prop="student_id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
      <el-tab-pane label="管理学生列表" name="6">
        <h3>学生列表</h3>
        <div class="table-header">
          <div class="table-header-title">学生列表</div>
          <el-input v-model="search" size="small" placeholder="输入学号搜索学生" class="table-header-input" />
        </div>
        <el-table
          :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column prop="student_id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="ke_tang_pai_account" label="账号"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="county" label="地区"></el-table-column>
          <el-table-column prop="race" label="民族"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="phone_number" label="手机"></el-table-column>
          <el-table-column prop="teacher" label="老师"></el-table-column>
          <el-table-column label="删除账号">
            <template slot-scope="scope">
              <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="管理教师列表" name="8">
        <div class="table-header">
          <div class="table-header-title">教师列表</div>
          <el-input v-model="search" size="small" placeholder="输入教师姓名搜索" class="table-header-input" />
          <!-- <el-button size="small" class="table-header-button">导出Excel</el-button> -->
        </div>
        <el-table
          :data="teachers.filter(data => !search || data.name.toLowerCase().includes(search))"
          style="width: 100%"
        >
          <el-table-column prop="teacher_id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="phone_number" label="手机"></el-table-column>
          <!-- <el-table-column prop="password" label="密码"></el-table-column> -->
          <el-table-column label="删除账号">
            <template slot-scope="scope">
              <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="管理员邀请码管理" name="7">
        <div class="tab-main">
          <h3>邀请码(用于创建新的管理员账号)</h3>
        </div>
        <div>
          <el-table
            :data="codeList"
            style="width: 40%"
          >
            <el-table-column prop="code" label="邀请码"></el-table-column>
          </el-table>
          <el-button type="success" style="margin-top:10px;" @click="generateNewCode">新的随机邀请码</el-button>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="教师-学生管理" name="6">
        <el-row>
          <el-col :span="12">
            <h3>老师列表</h3>
            <el-table
              :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%" lazy
            >
              <el-table-column prop="student_id" label="学号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <h3>学生列表</h3>
            <el-table
              :data="studentList.filter(data => !search || data.student_id.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
            >
              <el-table-column prop="student_id" label="学号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="ke_tang_pai_account" label="课堂派账号"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="seeHomework(scope.row)" type="text" size="small">查看作业</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane> -->
    </el-tabs>
    <!-- <div class="eval" style="margin-top: 20px;">
      <el-button type="primary" round @click="evaluate">评估作业</el-button>
    </div>-->
    <!-- 注销 -->
    <div class="loginOut">
      <span style="margin-right: 20px;margin-top:2px">{{"用户名：" + name}}</span>
      <el-button type="warning" size='mini' @click="loginOut">登出</el-button>
    </div>
    <!-- 添加学生弹出界面 -->
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <div style="margin-left: 30px;">
        学号：
        <el-autocomplete
          v-model="addStuId"
          :fetch-suggestions="querySearchAsync"
          placeholder="按学号搜索"
          style="width:55%; margin-left:20px;"
          @select="handleDialogSelect"
        ></el-autocomplete>
      </div>
      <el-table
        :data="dialogTable"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="老师">
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button @click="deleteDialogResult(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMyStudent">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    var teacher = window.sessionStorage.getItem('name')
    this.name = teacher
    this.getDocs()
    this.getStudents()
    this.getTeachers()
    this.getAdminCode()
    // this.getUnmarkedHomework()
  },
  data() {
    return {
      name: '',
      title: '',
      describe: '',
      isfree: '0',
      teachers: [],
      selectHomework: '',
      selectTeacher: '',
      selectStudent: '',
      unmarkedList: [],
      homeworkDocId: '',
      uploadData: {
        title: this.title,
        describe: this.describe
      },
      addStuId: '',
      docList: [],
      codeList: [],
      studentList: [],
      activeTab: '1',
      audioType1: '',
      audioType2: '',
      dialogFormVisible: false,
      audioOptions: [
        {
          value: 1,
          label: '字词训练'
        },
        {
          value: 2,
          label: '常速朗读'
        }
      ],
      search: '',
      exampleTableData: [
        {
          name: '李晓明',
          stu_id: 'LSZX011',
          ketangpaiid: 'ktp0256699607',
          phone_num: '12658997658',
          province: '新疆',
          county: '叶城',
          sex: '男',
          race: '维吾尔族',
          teacher: '欧阳婉云',
          tphone_num: '18658157658'
        },
        {
          name: '王小虎',
          stu_id: 'LSZX012',
          ketangpaiid: 'ktp0256699617',
          phone_num: '13898397658',
          province: '新疆',
          county: '叶城',
          sex: '女',
          race: '维吾尔族',
          teacher: '欧阳婉云',
          tphone_num: '18658157658'
        }
      ],
      dialogTable: [],
      formLabelWidth: '80px'
    }
  },
  methods: {
    deleteStudent() {
      console.log('功能暂不开放')
    },
    // 上传文档
    submitUpload() {
      this.$refs.upload1.submit()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.getDocs()
    },
    // 上传学生列表
    uploadStudentList() {
      this.$refs.StudentListFile.submit()
      this.$$refs.StudentListFile.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    // 上传音频1
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    // 上传音频2
    submitUpload3() {
      this.$refs.upload3.submit()
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.student_id.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    // 查找学生
    querySearchAsync(queryString, cb) {
      var url = '/student/getAllStudent'
      this.$http.get(url).then((result) => {
        var data = result.data.students
        var results = queryString ? data.filter(this.createStateFilter(queryString)) : data
        // console.log(results.map(a => a.student_id))
        cb(results.map(function(a) { return { value: a.student_id, name: a.name, teacher: a.teacher } }))
      })
    },
    handleDialogSelect(item) {
      this.dialogTable.push(item)
    },
    deleteDialogResult(index) {
      this.dialogTable.splice(index, 1)
    },
    // 添加自己的学生
    addMyStudent() {
      var url = 'teacher/addStudent'
      var ids = this.dialogTable.map(a => a.value)
      var pushData = {
        ids: ids,
        teacher: this.name
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getStudentAndUnmarkHomeworkByTeacher(this.name)
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        this.$message({
          message: '修改失败，此学生已有老师请核查',
          type: 'warning'
        })
      })
    },
    // 上传成功提示
    successUpload(res, file, files) {
      this.$refs.upload1.clearFiles()
      this.$refs.upload2.clearFiles()
      this.title = ''
      this.describe = ''
      this.homeworkDocId = res.homework_id
      this.getDocs()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    evaluate() {
      this.$router.push('/evaluation')
    },
    // 跳转到评估界面
    toEvaluatePage(row) {
      if (this.isfree === '0') {
        this.$router.push({
          path: '/evaluation',
          query: {
            homework_doc_id: row.homework_doc_id_refer,
            student_id: row.student_id_refer,
            special: 0
          }
        })
      } else {
        this.$router.push({
          path: '/evaluation2',
          query: {
            homework_doc_id: row.homework_doc_id_refer,
            student_id: row.student_id_refer,
            special: 0
          }
        })
      }
    },
    getDocs() {
      var url = '/homework/getDoc'
      this.$http.get(url).then((result) => {
        this.docList = result.data.docs
      })
    },
    // 获取所有学生列表
    getStudents() {
      var url = '/student/getAllStudent'
      this.$http.get(url).then((result) => {
        this.studentList = result.data.students
      })
    },
    // 获取所有老师列表
    getTeachers() {
      var url = '/teacher/getTeachers'
      this.$http.get(url).then((result) => {
        this.teachers = result.data.teachers
      })
    },
    // 获取老师的学生列表以及未评作业
    getStudentAndUnmarkHomeworkByTeacher(teacher) {
      var url = '/student/getStudentByTeacher?teacher=' + teacher
      this.$http.get(url).then((result) => {
        this.studentList = result.data.students
        var unmarkedList = result.data.unmark
        var homeworks = result.data.homework
        // console.log(unmarkedList)
        for (var i = 0; i < unmarkedList.length; i++) {
          unmarkedList[i].created_at = this.formatTimeStr(unmarkedList[i].created_at)
          unmarkedList[i].homework_name = homeworks[i].title
        }
        this.unmarkedList = unmarkedList
      })
    },
    formatTimeStr(str) {
      var time = new Date(str)
      var m = time.getMonth() + 1
      return time.getFullYear() + '-' + m + '-' + time.getDate()
    },
    // 上传下一个学生音频，用于清空现有所有输入
    nextAddAudio() {
      this.$refs.upload2.clearFiles()
      this.$refs.upload3.clearFiles()
      this.selectHomework = ''
      this.selectStudent = ''
      this.isfree = 0
    },
    // 跳转到评分界面
    pushScore() {
      if (this.selectHomework === '' || this.selectStudent === '') {
        this.$message.error('请填写评分对象')
      } else {
        if (this.isfree === '0') {
          this.$router.push({
            path: '/evaluation',
            query: {
              homework_doc_id: this.selectHomework,
              student_id: this.selectStudent,
              special: 0
            }
          })
        } else {
          this.$router.push({
            path: '/evaluation2',
            query: {
              homework_doc_id: this.selectHomework,
              student_id: this.selectStudent,
              special: 0
            }
          })
        }
      }
    },
    // 上传作业
    secondHomework() {
      var url = 'homework/upload/review'
      var pushData = {
        title: this.title,
        describe: this.describe
      }
      this.$http.post(url, pushData).then((result) => {
        this.$message({
          message: '创建作业成功',
          type: 'success'
        })
      })
    },
    // 查看作业结果
    seeHomework(x) {
      this.$router.push({
        path: '/homeworkresult',
        query: {
          stu_id: x.student_id,
          stu_name: x.name
        }
      })
    },
    // 获取邀请码
    getAdminCode() {
      var url = '/teacher/getCode'
      this.$http.get(url).then((result) => {
        this.codeList = [{ code: result.data.code }]
      })
    },
    // 生成新的邀请码
    generateNewCode() {
      var url = '/teacher/generateCode'
      this.$http.get(url).then((result) => {
        this.codeList = [{ code: result.data.code }]
      })
    },
    // 删除作业
    deleteHomework(id) {
      var url = '/homework/deleteHomework?doc_id=' + id
      this.$http.get(url).then((result) => {
        this.getDocs()
      })
    },
    filterIdHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 登出
    loginOut() {
      this.$router.push('/login')
      sessionStorage.clear()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8 || columnIndex === 9) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tab-main {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.upload-doc-input {
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-bottom: 10px;
}
.upload-doc-input-text {
  line-height: 50px;
  margin-right: 10px;
}
.upload-doc-top-elinput {
  width: 60%;
  line-height: 50px;
}
.upload-doc-main {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
}
.upload-audio-student {
  display: flex;
  flex-direction: row;
  height: 50px;
}
.upload-audio-student-select {
  line-height: 50px;
}
.upload-audio-contain {
  display: flex;
  flex-direction: row;
  height: 170px;
}
.audio-upload-option {
  line-height: 70px;
}
.audio-upload {
  margin-left: 20px;
  width: 200px;
  line-height: 50px;
}
.table-header {
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-bottom: 10px;
}
.table-header-title {
  font-size: 20px;
  line-height: 50px;
}
.table-header-button {
  height: 30px;
  margin-top: 10px;
  margin-left: 25px;
}
.table-header-input {
  margin-left: 55%;
  width: 30%;
  line-height: 50px;
}
.loginOut{
  position: absolute;
  right: 20px;
  top: 12px;
  color: #e6a23c;
  font-weight: 600;
  font-size: 16px;
  height: 35px;
  line-height: 35px;
}
</style>
