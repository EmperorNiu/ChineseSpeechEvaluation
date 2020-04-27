<template>
  <el-container class="frame">
    <el-header>
      <myheader class="myheader"></myheader>
    </el-header>
    <el-container class="main-frame">
      <el-aside :width="isCollapse ? '50px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import header from './Header.vue'
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    myheader: header
  }
}
</script>

<style lang="less" scoped>
.frame {
  height: 100%;
}
.main-frame {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  // display: flex;
  padding-left: 15%;
  // justify-content: space-between;
  // align-items: center;
  // color: white;
  // font-size: 18px;
}
.myheader {
  width: 100%;
  // margin: 0;
}
.el-aside {
  background-color: rgb(173, 173, 173);
  height: 100%;
}
.el-main {
  background-color: #eaedf1;
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
