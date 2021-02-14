<template>
  <!-- <el-menu
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
    <el-menu-item index="/select">教师选词</el-menu-item>
    <el-menu-item index="/selectedword">已选字词</el-menu-item>
  </el-menu>-->
  <div>
    <div class="title">
      <img src="../assets/badge.png" class="logo">
      <p class="title-text">国家通用语言语音学习分析系统</p>
    </div>
  </div>
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
.title{
  color: whitesmoke;
  display: flex;
  flex-direction: row;
}
.logo {
  width: 42px;
  height: 42px;
  margin: 8px 12px 8px 5px;
}
.title-text {
  margin-top: 20px;
  margin-left: 15px;
}
</style>
