<template>
  <el-menu
    :default-active="activeIndex"
    class="header-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/upload">上传作业</el-menu-item>
    <el-menu-item index="/evaluation">作业评分</el-menu-item>
    <el-menu-item index="/select">教师选词</el-menu-item>
    <el-menu-item index="/selectedword">已选字词</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/select'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
