<template>
  <div class="contain">
    <div class="block1">
      <el-button class="b1" type="text" @click="c1">作业评分</el-button>
    </div>
    <div class="block2">
      <el-button class="b2" type="text" @click="c2">筛选字词</el-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.contain {
  background-color: rgb(29, 29, 29);
  height: 100%;
}
.block1 {
  width: 300px;
  height: 200px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.85);
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}
.block2 {
  width: 300px;
  height: 200px;
  position: absolute;
  background-color: rgba(255, 225, 225, 0.85);
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}
.b1 {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(173, 126, 126, 0.911);
  font-size: 23px;
}
.b2 {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(240, 243, 255);
  font-size: 23px;
}
</style>

<script>
export default {
  c1() {
    this.router.push('/upload')
  },
  c2() {
    this.router.push('/select')
  }
}
</script>
