<template>
  <el-menu
    :default-active="activeIndex"
    class="header-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/upload">作业评分</el-menu-item>
    <!-- <el-menu-item index="/evaluation">作业评分</el-menu-item> -->
    <el-menu-item index="/select">教师选词</el-menu-item>
    <el-menu-item index="/selectedword">已选字词</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/select'
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    }
  },
  watch: {
    $route() {
      this.handleSelect('/selectedword')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
