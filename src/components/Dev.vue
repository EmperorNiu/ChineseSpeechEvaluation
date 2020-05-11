<template>
  <div>
    <aplayer
      autoplay
      float
      mini
      :music="{
    title: 'Preparation',
    author: 'Hans Zimmer/Richard Harvey',
    url: 'http://47.103.83.192:8001/api/resource/audio?pos=123',
    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
  }"
    />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  }
}
</script>
